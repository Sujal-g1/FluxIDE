import redis from "../../../shared/redis/redis.js"
import Project from "../models/project.model.js"

export const createProject = async(req , res)=>{
    try {  
    const userId = req.headers["x-user-id"]
    if(!userId){
        return res.status(401).json({message: "userid is required"})
    }
 
    const { name, description } = req.body
    const project = await Project.create({
        owner:userId,
        name,
        description 
    })

     const key= `projects-${userId}`
     await redis.del(key)

    return res.status(201).json(project)
    } catch (error) {
        return res.status(500).json({message: `create project error, ${error}`})
    } 
}

// get all projects
export const getProjects = async(req , res)=>{
    try {  
    const userId = req.headers["x-user-id"]
    if(!userId){
        return res.status(401).json({message: "userid is required"})
    }

    const key= `projects-${userId}`
    let result = await redis.get(key)
    if(result){
        return res.status(200).json(JSON.parse(result)) 
    }
 
    const project = await Project.find({
        owner:userId,
    }).sort({updatedAt: -1})

    await redis.set(key, JSON.stringify(project), "EX", 3600);

    return res.status(200).json(project)
    } catch (error) {
        return res.status(500).json({message: `get all projects error, ${error}`})
    } 
}

// get particular proj
export const getProjectById = async(req , res)=>{
    try {  
    const { id }= req.params
 
    const project = await Project.findById(id);

    if(!project){
        res.status(404).json({message: "project not found"})
    }

     project.lastOpenedAt = new Date()
     await project.save()

    return res.status(201).json(project)
    } catch (error) {
        return res.status(500).json({message: `get project by id error, ${error}`})
    } 
}

// get starred projects
export const getStarredProjects = async(req, res)=>{
    try {  
    const userId = req.headers["x-user-id"]
    if(!userId){
        return res.status(401).json({message: "userid is required"})
    }

     const key=`starred-projects-${userId}`
 
    const project = await Project.find({
        owner:userId,
        starred:true
    }).sort({updatedAt: -1})

    await redis.set(key, JSON.stringify(project), "EX", 3600);

    return res.status(200).json(project)
    } catch (error) {
        return res.status(500).json({message: `get starred projects error, ${error}`})
    } 
}

// star toggle

export const toggleStar = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.headers["x-user-id"];
  
      if (!userId) {
        return res.status(401).json({
          message: "User ID is required",
        });
      }
  
      const project = await Project.findOne({
        _id: id,
        owner: userId,
      });
  
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
  
      project.starred = !project.starred;
      await project.save();
  
      // Invalidate both caches
      await redis.del(`projects-${userId}`);
      await redis.del(`starred-projects-${userId}`);
  
      return res.status(200).json(project);
    } catch (error) {
      console.error("TOGGLE STAR ERROR:", error);
  
      return res.status(500).json({
        message: `Toggle star error: ${error.message}`,
      });
    }
  };
  

// delete project

export const deleteProject = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.headers["x-user-id"];
  
      if (!userId) {
        return res.status(401).json({
          message: "User ID is required",
        });
      }
  
      const project = await Project.findOneAndDelete({
        _id: id,
        owner: userId,
      });
  
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
  
      await redis.del(`projects-${userId}`);
      await redis.del(`starred-projects-${userId}`);
  
      return res.status(200).json({
        message: "Project deleted successfully",
        project,
      });
    } catch (error) {
      console.error("DELETE PROJECT ERROR:", error);
  
      return res.status(500).json({
        message: `Delete project error: ${error.message}`,
      });
    }
  };
  
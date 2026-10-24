import File from "../models/file.model.js"
import { buildTree } from "../utils/buildTree.js";

const getFileExtension = (filename = "") => {
    const baseName = filename.split(/[\\/]/).pop();

    if (!baseName) return "";
  
    if (!baseName || baseName.startsWith(".") && !baseName.slice(1).includes(".")) {
      return "";
    }
  
    const lastDotIndex = baseName.lastIndexOf(".");
  
    if (lastDotIndex <= 0 || lastDotIndex === baseName.length - 1) {
      return "";
    }
  
    return baseName.slice(lastDotIndex + 1).toLowerCase();
  };

export const createRootFolder = async(req, res)=>{
    try {
        const { projectId, projectName } = req.body
        const userId = req.headers["x-user-id"]

        if(!projectId || !projectName){
            return res.status(400).json({message:"projectid & name are req!"})
        }
        
        const existingRootFolder = await File.findOne({
            projectId,
            parentId:null,
            isDeleted:false
        })
        
        if(existingRootFolder){
             return res.status(400).json({message:"root folder already exist"}) }

        const rootFolder = await File.create({
            owner:userId,
            name:projectName,
            projectId,
            type:"folder",
            parentId:null
        })

        return res.status(201).json({ 
            message: "root folder created", 
            rootFolder 
          });

    } catch (error) {
        return res.status(500).json({ 
            message: "root folder not created", 
            error
          });
    }
}


export const createFolder = async(req, res)=>{
    try {
        const { projectId, name, parentId } = req.body
        const userId = req.headers["x-user-id"]

        if(!projectId || !name || !parentId){
            return res.status(400).json({message:"projectid, parentId & name are req!"})
        }
        
        const existingFolder = await File.findOne({
            name,
            projectId,
            parentId,
            isDeleted:false
        })
        
        if(existingFolder){
             return res.status(400).json({message:"folder already exist"}) }

        const folder = await File.create({
            owner:userId,
            name,
            projectId,
            type:"folder",
            parentId
        })

        return res.status(201).json({ 
            message: "folder created", 
            folder 
          });

    } catch (error) {
        return res.status(500).json({ 
            message: "folder not created", 
            error
          });
    }
}


export const createFile = async(req, res)=>{
    try {
        const { projectId, name, parentId, content="", language="plaintext"} = req.body
        const userId = req.headers["x-user-id"]

        if(!projectId || !name?.trim()){
            return res.status(400).json({message:"projectid & name are req!"})
        }
        
        const existingFile = await File.findOne({
            name,
            projectId,
            parentId,
            isDeleted:false
        })
        
        if(existingFile){
             return res.status(400).json({message:"file already exist"}) }

        const extension = getFileExtension(name);

        const file = await File.create({
            owner:userId,
            name,
            projectId,
            type:"file",
            language,
            content,
            extension,
            size: content.length,
            parentId: parentId || null
        })

        return res.status(201).json({ 
            message: "file created", 
            file 
          });

    } catch (error) {
        return res.status(500).json({ 
            message: "file not created", 
            error
          });
    }
}


export const updateFile = async(req, res)=>{ 
    try {
        const { name, content} = req.body
        const userId = req.headers["x-user-id"]

        if (!userId) {
            return res.status(401).json({
              message: "User ID is required",
            });
          }

          if (name !== undefined && !name.trim()) {
            return res.status(400).json({
              message: "File name cannot be empty",
            });
          }
        
        const existingFile = await File.findOne({
            _id: req.params.id,
            owner:userId,
            type:"file",
            isDeleted:false
        })

        
        if (!existingFile) {
            return res.status(404).json({
              message: "File not found",
            });
          }      

          if (name !== undefined) {
            existingFile.name = name.trim();
            existingFile.extension = getFileExtension(name.trim());
          }
      
          if (content !== undefined) {
            if (typeof content !== "string") {
              return res.status(400).json({
                message: "File content must be a string",
              });
            }

            existingFile.content = content;
            existingFile.size = Buffer.byteLength(content, "utf8");
          }

        await existingFile.save()


        return res.status(201).json({ 
            message: "file updated successfully", 
            file : existingFile
          });

    } catch (error) {
        return res.status(500).json({ 
            message: "file update failed", 
            error
          });
    }
}


export const renameFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        message: "User ID is required",
      });
    }

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Folder name cannot be empty",
      });
    }

    const trimmedName = name.trim();

    const existingFolder = await File.findOne({
      _id: req.params.id,
      owner: userId,
      type: "folder",
      isDeleted: false,
    });

    if (!existingFolder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    const duplicateFolder = await File.findOne({
      _id: { $ne: existingFolder._id },
      owner: userId,
      projectId: existingFolder.projectId,
      parentId: existingFolder.parentId,
      name: trimmedName,
      type: "folder",
      isDeleted: false,
    });

    if (duplicateFolder) {
      return res.status(409).json({
        message: "A folder with this name already exists",
      });
    }

    existingFolder.name = trimmedName;

    await existingFolder.save();

    return res.status(200).json({
      message: "Folder renamed successfully",
      folder: existingFolder,
    });
  } catch (error) {
    console.error("Folder rename failed:", error);

    return res.status(500).json({
      message: "Folder rename failed",
    });
  }
};

export const deleteFile = async(req, res)=>{
    try {
        const userId = req.headers["x-user-id"]
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
              message: "User ID is required",
            });
          }

          const file = await File.findOneAndUpdate(
            {
              _id: id,
              owner: userId,
              type: "file",
              isDeleted: false,
            },
            {
              $set: { isDeleted: true },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          if (!file) {
            return res.status(404).json({
              message: "File not found",
            });
          }
      
        return res.status(201).json({ 
            message: "file deleted successfully", 
            file
          });

    } catch (error) {
        return res.status(500).json({ 
            message: "file delete failed", 
            error
          });
    }
}

export const deleteFolder = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "User ID is required",
      });
    }

    const folder = await File.findOne({
      _id: id,
      owner: userId,
      type: "folder",
      isDeleted: false,
    });

    if (!folder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    // Find all descendants recursively
    const folderIds = [folder._id];
    let parentIds = [folder._id];

    while (parentIds.length > 0) {
      const children = await File.find({
        parentId: { $in: parentIds },
        owner: userId,
        isDeleted: false,
      }).select("_id type");

      parentIds = children
        .filter((child) => child.type === "folder")
        .map((child) => child._id);

      folderIds.push(...parentIds);
    }

    await File.updateMany(
      {
        $or: [
          { _id: { $in: folderIds } },
          { parentId: { $in: folderIds } },
        ],
        owner: userId,
        isDeleted: false,
      },
      {
        $set: { isDeleted: true },
      }
    );

    return res.status(200).json({
      message: "Folder and its contents deleted successfully",
    });
  } catch (error) {
    console.error("Folder deletion failed:", error);

    return res.status(500).json({
      message: "Folder deletion failed",
    });
  }
};

export const getFile = async( req, res) =>{
    try {
        const userId = req.headers["x-user-id"]

        if (!userId) {
            return res.status(401).json({
              message: "User ID is required",
            });
          }
        
        const existingFile = await File.findOne({
            _id: req.params.id,
            owner:userId,
            type:"file",
            isDeleted:false
        })

        if (!existingFile) {
            return res.status(404).json({
              message: "File not found",
            });
          }       

        return res.status(200).json({ 
            message: "file got successfully", 
            file : existingFile
          });

    } catch (error) {
        return res.status(500).json({ 
            message: "file get failed", 
            error
          });
    }
}



export const getTree = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { projectId } = req.params;

    console.log("Project ID:", projectId);
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(401).json({
        message: "User ID is required",
      });
    }

    const files = await File.find({
      projectId,
      owner: userId,
      isDeleted: false,
    }).sort({
      name: 1,
      type: -1,
    });

    console.log("Files found:", files.length);
    console.log(
      "Matched files:",
      files.map((file) => ({
        id: file._id,
        name: file.name,
        projectId: file.projectId,
        owner: file.owner,
        type: file.type,
        parentId: file.parentId,
      }))
    );

    const tree = buildTree(files);

    console.log("Generated tree:", JSON.stringify(tree, null, 2));

    return res.status(200).json({
      message: "File tree retrieved successfully",
      tree,
    });
  } catch (error) {
    console.error("getTree failed:", error);

    return res.status(500).json({
      message: "Failed to retrieve file tree",
    });
  }
};

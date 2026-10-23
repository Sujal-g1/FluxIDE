
import { api } from "../utils/axios"


export const createProject = async( name, description )=>{
 try {
    const {data} = await api.post("/api/project",{name, description})
    return data
 } catch (error) {
  console.error(
    "create project failed:",
    error.response?.data || error.message
  );
   return data;
 }
}

export const getProjects = async( )=>{
 try {
    const {data} = await api.get("/api/project")
    return data
 } catch (error) {
   console.error("HTTP status:", error.response?.status);
   console.error("GET PROJECTS ERROR:", error.response?.data || error.message);
    throw error;
 }
}

export const getProjectsById = async (id) => {
   try {
     const { data } = await api.get(`/api/project/${id}`);
     return data;
   } catch (error) {
     console.error(
       "Get project by ID failed:",
       error.response?.data || error.message
     );
 
     throw error;
   }
 };

export const getStarredProjects = async () => {
   try {
     const { data } = await api.get("/api/project/starred");
     return data;
   } catch (error) {
     console.error(
       "Get starred projects failed:",
       error.response?.data || error.message
     );
 
     throw error;
   }
 };

export const toggleStar = async(id)=>{
    try {
       const {data} = await api.patch(`/api/project/${id}`)
       return data
    } catch (error) {
      console.error("Toggle star failed:", error.response?.data);
    throw error;
    }
 }

export const deleteProject = async(id)=>{
    try {
       const {data} = await api.delete(`/api/project/${id}`)
       return data
    } catch (error) {
      console.error("Delete project failed:", error.response?.data);
    throw error;
    }
 }
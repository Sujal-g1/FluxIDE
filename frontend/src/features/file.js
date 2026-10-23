
import { api } from "../utils/axios"


export const createRootFolder = async({ projectId, projectName })=>{
 try {
    const {data} = await api.post("/api/file/create-root-folder",{projectId, projectName })
    return data
 } catch (error) {
    console.log("root folder creation failed", error );
   return data;
 }
} 

export const createFolder = async({projectId, name, parentId})=>{
 try {
    const {data} = await api.post("/api/file/create-folder", {projectId, name, parentId})
    return data
 } catch (error) {
    console.log("folder creation failed", error );
    return data;
 }
 
}


export const createFile = async ({projectId, name, parentId, content="", language="plaintext"}) => {
   try {
     const { data } = await api.post("/api/file/create-file", {projectId, name, parentId, content, language});
     return data;
   } catch (error) {
    console.log("file creation failed", error );
    return data;
   }
 };


export const updateFile = async({ id, name, content })=>{
    try {
       const {data} = await api.post(`/api/file/update/${id}`, {name, content })
       return data
    } catch (error) {
       console.log("file updation failed", error );
       return data;
    }
   }


export const getFile = async(id)=>{
    try {
       const {data} = await api.get(`/api/file/${id}`)
       return data
    } catch (error) {
       console.log("get file error", error );
       return data;
    }
   }
   

export const deleteFile = async(id)=>{
    try {
       const {data} = await api.delete(`/api/file/${id}`)
       return data
    } catch (error) {
       console.log("file deletion failed", error );
       return data;
    }
   }
   

export const getTree = async({projectId})=>{
    try {
       const {data} = await api.get(`/api/file/tree/${projectId}`)
       return data
    } catch (error) {
        console.error("Get tree error:", error.response?.data || error.message);
    throw error;
    }
   }
 



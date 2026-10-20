import { api } from "../utils/axios"


export const me = async()=>{
 try {
    const {data} = await api.get("/api/me")
    return data
 } catch (error) {
   console.error("Login request failed:", error.response?.data);
   console.error("HTTP status:", error.response?.status);
   return null;
 }
}
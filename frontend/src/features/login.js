import { api } from "../utils/axios"


export const login = async(token)=>{
 try {
    const {data} = await api.post("/api/auth/login",{token})
    return data
 } catch (error) {
   console.error("Login request failed:", error.response?.data);
   console.error("HTTP status:", error.response?.status);
   return null;
 }
}
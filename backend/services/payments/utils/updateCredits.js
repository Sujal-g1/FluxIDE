import axios from "axios"

export const addCredits = async({userId, credits })=>{
    const {data} = await axios.post(`${process.env.AUTH_SERVICE_URL}/user/add-credits`, {userId, credits})
    return data
}
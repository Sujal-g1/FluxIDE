import { app } from "../config/firebase.js";
import { getAuth, } from "firebase-admin/auth"
import User from "../models/user.model.js"
import crypto from "crypto"
import redis from "../../../shared/redis/redis.js";

export const login = async ( req, res) => {
    try {
        const {token} = req.body;
        const decoded = await getAuth(app).verifyIdToken(token)
        // console.log(decoded);

        let user = await User.findOne({
            firebaseUid:decoded.uid
        })

        if (!user) {
            user = await User.findOne({
              email: decoded.email,
            });
        
            if (user) {
                // Link the existing account to this Firebase identity
                user.firebaseUid = decoded.uid;
                user.name = decoded.name;
                user.avatar = decoded.picture;
            
                await user.save();
            }else {
                user = await User.create({
                  firebaseUid: decoded.uid,
                  name: decoded.name,
                  email: decoded.email,
                  avatar: decoded.picture,
                });
            }
        }

        const sessionId = crypto.randomUUID()
        await redis.set(`user-session-${user?._id}`, sessionId,"EX",3*24*60*60)
        await redis.set(`session-${sessionId}`, JSON.stringify({
            name: user.name,
            _id: user._id,
            email:user.email,
            avatar:user.avatar,
            credits: user.credits
        }), "EX",3*24*60*60)

        res.cookie("session", sessionId,{
            httpOnly: true,
            secure:false,
            samesite:"strict",
            maxAge:3*24*60*60*1000
        })

        return res.status(200).json(user)

    } catch (error) {
    return res.status(500).json({message:`login error ${error}`}) 
    }
} 


export const logout = async ( req, res) => {
    try {

    const sessionId = req.cookies?.session
    await redis.del(`session-${sessionId}`)

    res.clearCookie("session")

     return res.status(200).json({message:"Logout successfully"})

    } catch (error) {
        console.error("LOGIN ERROR:", error.message);
         return res.status(500).json({message:`logout error ${error}`})
           
    }
} 


export const deductCredits = async(req,res)=>{
    try {
    const {userId, amount} =  req.body

    if(!userId) return res.status(401).json({message:"userId not found"})

    const user = await User.findOneAndUpdate(
    {_id:userId, credits:{$gte:amount}},{
        $inc:{
            credits: -amount
        }
    },{returnDocument:"after"}).select("credits")

    if(!user) return res.status(401).json({message:"insufficient credits"})

    const sessionId = await redis.get(`user-session-${userId}`)
    await redis.set(`session-${sessionId}`, JSON.stringify({
        name: user.name,
        _id: user._id,
        email:user.email,
        avatar:user.avatar,
        credits: user.credits
    }), "EX",3*24*60*60)
    return res.status(200).json({credits: user.credits})

    } catch (error) {
        return res.status(500).json({message:`credits deduction error ${error}`}) 
    }
}


// export const addCredits = async ({ userId, credits }) => {
//     try {
//       if (!userId) {
//         throw new Error("userId not found");
//       }
  
//       const creditAmount = Number(credits);
  
//       if (!Number.isFinite(creditAmount) || creditAmount <= 0) {
//         throw new Error("Invalid credit amount");
//       }
  
//       const user = await User.findById(userId);
  
//       if (!user) {
//         throw new Error("User not found");
//       }
  
//       user.credits = (user.credits || 0) + creditAmount;
//       await user.save();
  
//       const sessionId = await redis.get(`user-session-${userId}`);
  
//       if (sessionId) {
//         await redis.set(
//           `session-${sessionId}`,
//           JSON.stringify({
//             name: user.name,
//             _id: user._id,
//             email: user.email,
//             avatar: user.avatar,
//             credits: user.credits,
//           }),
//           "EX",
//           3 * 24 * 60 * 60
//         );
//       }
  
//       return {
//         success: true,
//         credits: user.credits,
//       };
//     } catch (error) {
//       console.error("Add credits error:", error);
//       throw error;
//     }
//   };
  


const updateUserCredits = async (userId, credits) => {
    if (!userId) {
      throw new Error("userId not found");
    }
  
    const creditAmount = Number(credits);
  
    if (!Number.isFinite(creditAmount) || creditAmount <= 0) {
      throw new Error("Invalid credit amount");
    }
  
    const user = await User.findById(userId);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    user.credits = (user.credits || 0) + creditAmount;
    await user.save();
  
    const sessionId = await redis.get(`user-session-${userId}`);
  
    if (sessionId) {
      await redis.set(
        `session-${sessionId}`,
        JSON.stringify({
          name: user.name,
          _id: user._id,
          email: user.email,
          avatar: user.avatar,
          credits: user.credits,
        }),
        "EX",
        3 * 24 * 60 * 60
      );
    }
  
    return user.credits;
  };
  
  export const addCredits = async (req, res) => {
    try {
      const { userId, credits } = req.body;
  
      const updatedCredits = await updateUserCredits(userId, credits);
  
      return res.status(200).json({
        success: true,
        credits: updatedCredits,
      });
    } catch (error) {
      console.error("Add credits error:", error);
  
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  
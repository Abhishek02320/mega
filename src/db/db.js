import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB =  async () => {
    try{
       const connectionInstance =   await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         // database ki link paste karne ke baad us database ka jo naam h usko (/) lagakar likho ----- usi naam ka database ban jaaeyag backend me   
            console.log(`\n MOngoDb connected !! DB HOST : ${connectionInstance.connection.host}`)
        }
    catch(error){
        console.log('database is not connect properly error', error)
        // agar databse thik se connect nahi hua is file se ya link me koi kharabhi h ya kisi bhi tarah ke databse connection with this file se related error ko ye error show karega 
        throw err
    }
}

export default connectDB

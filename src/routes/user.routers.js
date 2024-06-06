import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.js"



const router = Router()

router.route("/register").post(
    
    upload.fields([     // yaha ham (upload) function ko yaha is route me as middleware use kar rahe h aise kisi bhi (route) me ham kisi controller jaise ki yaha(registerUser) h usse pahle agar ham kisi function ko use kar dete h to use middleware kahte h ki contoller wala kaam karne se pahle tum is middleware se pass karo aur uski needs ki fullfill karne ke baad hi controller ke commnds ko procced karo
    // yaha jo hamne middleware use kiya h jaise (upload)as middleware use kkya h jisme (milter) ka use kar rahe h as function for uploading file yaha (upload.) likhte hi bahut saare options milenge like (array, single, fields) jisme (array) mean aap ak hi field me ak se jyada file upload kar skte h (single)mean ak field me ak hi file upload ho bas // (field)mean ak field me ak se jayada (arry)create karna jo apne ander apni hi tarah ki file ko accept kare doosare ki nahi
{
  name : "avatar",  // ye hamare field ka naam hoga jsime hamari files upload hogi
  maxCount: 1  // mean is filed me kitni files ko accept karna chhate ho 
},
{
  name: "coverImage",
  maxCount: 1
}

    ]),
    registerUser)    // jab is file ko active kiya jaayega mean is route ko active kiya jaayega (app.js) file ki wajahse se (/user) route ki request maar kar aur user hamara (user) page per ajaayega ab jab isper (/register) request maari jaayegi to ye file hamare user ko redirect karegi (register)page per jaha (post)method ka use karke ham apne (registerUser) ki file me likhe contoller ke response ko us page per render karaayenge ab wo page hamse kya kah raha h response me hame kya bhej raha h wo sab hame wahi controller file bata sakti h jo uske hamne response me likha hoga 
export default router




// thunderclient chalaane ka traika (collection < makenewcollection < new request < localhost:8000/users/register ) yaha galti se (http//) aise mat likh dena nahi yo error maan jaayega aise hi direct (localhost)aur jo port use kiya h wo aur jis address per request maarni h wo address mardo aur bas ho gaya aur ha request kyamaari h wo bhi dyaan se dekhke maaarna ki request (post/get/delete) inmese konsi maari h wahi request maarna nahi to error a jaayega 
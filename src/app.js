import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({   // now ab ham yaha set karenge ki ye backend kis kis origin/frontend se request accept karega data ko (ui)se backend me lene ki  
    origin: process.env.CORS_ORIGIN,
    credentials:true
         //jo jo frontend se data accept karana h unka link ham apni (env me likh denge )
}))

app.use(express.json({limit: "16kb"})) // ye hamne allow/access kar diya h apne webpage ke ui ke forms se aane waale data ko accept kare  
app.use(express.urlencoded({extended: true, limit: "16kb"}))   // hamesa yaad rakhna ki url bhi kuch na kuch data deta hi h like kisi ne serch kiya (abhishek yadav) than iski request jaayegi url form me (abhishek%20yadav) here (here %20)mean space to is trike ki jo request aati h server per use ham kahte h (url)request to isko bhi allow kar rahe h jo apne nader ak data ko leke aati h aur server per request maarti h us data se related 
app.use(express.static("public")) // is type ki request me user hamaare local storage like (public)folder me store files like (pdf,jpg) ko access karna chhahta h to uske liye ham is code ko likhte h  

app.use(cookieParser()) // jo bhi data user ke browser me store h in the form of cookies usko access karne ke liye ya us data ko modify karne ke liye ham is code ka use karenge aur har ak perticular website ka server sirf uske apne server/website ke cookie ka access le sata h kisi aur ka nahi jo usne user ke browser me store karaya h  


// import routes
import userRouter from './routes/user.routers.js'
// actual me hamari (user.routers)file me hamne apne function export kiya h (router) ke naam se aur us function ko yaha import kiya h bina {}paranthesis lagaaye (userRouter)naam se jiski wajah se misconception ki wajah se hamari file eror maar sakti h to aise ham agar chhahte h ki ham apni file me funtion ko export kisi aur naam se kare aur import kisi aur man chhhahe naam se bina {}paranthesis lagaaye to uske liye hame apne file ke function ko export (default) karna hoga agar (export default route) likha hoga to ham yaha us file ke function ko kisi bhi man chhahe naam se import kara sakte h but agar hamne (export {route} aise likha to yaha import isi naam se karana hoga aur {}paranthesis lagaake ki import karna hoga agar bina {}paranthesis ke import kiya to error a jaayega aur man chaha naam nahi likh sakte exect wahi naam se import karo jisse export kiya h ) 
// agar ham isi file me routes aur aur isi file me (controllers) banante t to ham direct (app.get) ka use kar sakte the but kyuki hamne routes ko alag file me likha h aur contollers ko alag isliye ab hame middleware ka use karna hoga router ko is file me call karakar run karaane ke liye so we use here (app.use)
app.use("/users", userRouter)  // ab yaha hamne apna address de diya aur jis router per request bhejkar uska response ko render karwana h us router ka naam bhi likh diya h  yaha   



export {app}




// middleware  ak tarike ka checkpoint ki tarah work karta h like user ne koi route request di (/instagram) than bacend server ka kaam hota us request ka reapong karna mean ak function jisme (req, res) hoga aur response me hame use onscreen kaya show karna h wo app.send("hello") karke send kar denge    ////  but agar ham is request aur response ke beech me checkpoint laga de jo ye check kare jo ham chhate h like kya jo request maar raha h wo (admi) is request ka agar h to hi use respond karo nahi to nahi karo aur ropute ko procced mat karo like kya user jo request maar raha h wo login h than usko response me wo reqesting page kholke de as response warna mat do is tarike ke checkpoints ko lagaane ko kahte h (middleware) 
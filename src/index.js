
//  ham yaha database ko apne backend se connect karne ke liye (2)method ka use kar sakte h (1)neeche wala code ki saara code isi (index) file me likh do aur bas run kara do database connect ho jaayega backeend se (2) method is code ko alag db naam ki file me likho jissse ak structured project bane aur fhir us file ko is file me import kardo aise bhi databse backend se connect ho jaayega aur ye industrial approach h   

/* 
                                                                                                                                       // import check from "./utils/async.js";
import mongoose, { connect } from "mongoose"
import { DB_NAME } from "./constants.js"
import express from "express"
const app =  express( )


;( async () => {
    try{
     await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         // database ki link paste karne ke baad us database ka jo naam h usko (/) lagakar likho ----- usi naam ka database ban jaaeyag backend me   
             app.on("error" , (error) => {   // ye ak express ka listen event h mena agar hamari expresss jo routing ka kaam kar rahi h uske aur databse ke beech me connection me koi problem a jaaye to ye error through kar de 
              // express ka ye event jo bhi error hoga b/w connection usko as input me lega backend se fhir usko pass karega is (app.on) function me (error) ki jagah fhir wo hame hamare text ke saath console me render hoga (error ki jagah)  
                console.log("connection b/w databse and express ERR: ", error)
                                                 // ye wala text render hoga console me aur text ke aage jo error h wo error show hoga jaha (error) likha h uski jagah isliye har baar console me aise (error)likhte h taaaki console me pata chal jaaye ki error kaya h  
               throw error   // is line ka kaam h ki agar error aya h to error throw/show kar do code ko aage proceed mat karne do 
             })  
            //  aur agar hamara express and databse connection thik h mean ab ye routing ke events ko listen kar skta h than
            app.listen(process.env.PORT, () => {
                console.log(`App is listen on port ${process.env.PORT}`);
                                                                                                                                                                                                       // check()
            }) 
        }
    catch(error){
        console.log('error', error)
        // agar databse thik se connect nahi hua is file se ya link me koi kharabhi h ya kisi bhi tarah ke databse connection with this file se related error ko ye error show karega 
        throw err
    }
})()

*/

// second method jisme hamne apna databse connection ka code (db)file me likhkar use yaha import kara liya aur backend se databse connect ho gaya  
import { app } from "./app.js"
import connectDB from "./db/db.js"   
// ye common problem h ki kabhi kabaar sab kuch thik h poora code thik h fhir bhi hamar error a raha h aur error a raha import karane me to kuch time to ye bina (file.js)likhe file ko direct import kara deta h ak file se doosari file me kabhi kabaar isko likhna jarruri hota h apni file ko import karne ke liye nahi to ye error deta rahega 
connectDB()  // agar databse successfully connect ho jaaye backend se tab hame kya kar karna uske liye ham neeeche likhe hue ka use karte h 

.then(  // isme aaage ka work likhenge ki ab isse kaya karana h 
     ()=> {  //ab hamara mongo backendse connect to ho gaya but isko kisi port per listen bhi to karna hoga kisi route per listen karne ke liye is function ko call karenge aur isme express ki help se is database ko kisi backend ke port per listen karege   
        app.on("err",(error)=>{  //  agar databse connection given port per nahi hua mean connection b/w express and mongo is not goood throw eror   mean databse is not listen on given port
            console.log("connection b/w databse and express not success ERR:", error);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running at port : ${process.env.PORT}`);
        })
        
     })

.catch((err) =>{    // aur agar mongo thik se connect nahi hua kuch error aya to ye chalega aur neeche likha text render karega console me and jo bhi error h wo error (err) ki jagah per console me render hoke aajayegi text ke aage 
    console.log("mongo is not connect successfully ERR:" , err)
}) 









// jaisa ki hame pata h ki jab bhi ham apne server ki file me ya poore backend ke code me khuch bhi naya code edit karte h ya kuch edit karte h to hame server ko baar baar (stop karke start) karna padta h har baar jab bhi ham backend ki files me kuch edit karte h 
//to ye baar baar hame server (start ya stop) na karna pade code edit ke baad for see your edit code result ham iske liye (nodemon) ka use karenge iska kaam hota h ki jaise hi hamari server ki file me kuch bhi edit ho ye apne aap server ko band karke apne aap dubara start kar de jisse hame ye sab khudse na karna pade 
// npm i nodemon        // aise karke isko install karenge to ye main dependency ban jaayegi but ham chhhate h ki ye devdependency bane (devdependency)matalab ki jab ham apna project taiyaar kar rahe sirf tabhi tak ye use ho hamare code me aur jaise hi is code ko industry me use kare to waha nodemon use hona band ho jaaye because iska use bhi to hame tabhi tak h jab tak ham is project ko bana rahe h to file edit karte h to apne aap ye (server ko stop than start)kare aur industry jab use hoga tab koi online user is code me edit to karega nahi to waha use karne ka koi fayada nahi h (isse project ki file halka ya bhaari hone ka koi sambandh nahi h koi farak nahi padta h)
// (npm install --save-dev nodemon) or (npm i -D nodemon)


// now we connect database to this project 
// mongodb atlas <price scetion < choose free  < signup < give some details < make cluster
// cluster is the main thing because isme ham kuch cheeje likhte h (user id and password)add members jin jin ko tumhe apne is project ke data ka access members add karne ke liye (database)section me kar sakte h 
// second thing give ip address (0.0.0.0/0)ye wo ip address h jo har server se aane waale data ko access deta h apne databse me store karne ke liye industry me ham sepcific (ip address) ka use karte h for alllowing data coming from only own server    // ip adress chanhe karna h to (network access) me jaake change kardo
// third thing   ab hame ak link chhiaye jise ham apne backend ke code me paste kar sake taaki apne backend ka data us databse me send kar sake store karne ke liye uske liye tumhe (databse section me jaaao) waha jo project h apna uska cluster chuno har project ka alag alag cluster banaya hoga tumne to apna cluster chuno connect per click karo bahut saare option aayenge but ham yaha per (compass )option select karenge because ham usi ka use kar  rahe h wo hame ak link dega jise ham apne backend ke code me paste kar denge 
// ham mongodb ki link ko jab (.env)file me paste krenge to waha hame us link me (password ki jagah)apne cluster ka password dalana hoga jo ki admin bante time banaya hoga cluster me



// install mongoose for structured our data in database and this package is for sending data in structured formate to database or we can say yahi h wo jo backend code ko databse/mongodb se connect karayega  
// install express for routing from one page to another 

// npm i mongoose express 



// databse ko jab bhi apne server se connect karo to 2cheeje hamesa yaaad rakho pahla ye ki (async await) and 2nd (try catch) in dono ka hamesa use karo hamesa 


// neeche diye hue dono package ke baare me (asynchandler.js)me jaake dekho
// (npm i cookie-parser)  // jab ham ye chhate h ki hamara server  user ka secure data and commonly assential data ko access kar paaye jo user ke broswer me hi hamaara server store kara deta h aur us data ko user ke browser se intake lene ka aur modify karne ka access sirf hamare server ke pass hota h 
// (npm i cors)   // is for give access to do some settings or write some code to make connection b/w two different server to each other (like backend ko frontend se )

// (npm i mongoose-aggregate-paginate-v2)    // mongodb me aggrigation (queries) likhne ke liye ham iski jarrurat padi (video.model) me jake dekho


// (npm i bcrypt) iska use hamne (user.model) me kiya h 
// (npm i jsonwebtoken) use in (user.model)
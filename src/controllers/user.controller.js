import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"




const registerUser = asyncHandler(async (req,res) => {
    //hamne apne is file ke funtion yaani user ko regiter karne ke liye jo function banaya h us function ko cover kiya h (try-catch/promise) ke rapper se jo ki hamne banaya h apne asyncfile me to is ke code/function ko hamne apne asynchandler file ke function me pass kiya h aur wo function apne ander (try-cath/promise) method ko contain kiya hua h jo hame kaafi problem se bacahayega aur wo usi file me likha h kis problem se bachaayega 
//    return res.status(200).json({ message : "ok"})
   // ak baat hamesa yaad rakhna ki agar aap apne function ko kisi aur file me pass karte ho but iske return ko kisi aur file me pass karte ho mean is file ke function ko yahi execute kardo kisi aur file me pass karke waha ka work perform karaane ke baad is file ka work perform karo than apko apne function me (return) likhne ki koi jarrurat nahi iska matalab ye h ki aapka function execute ho jaayega aur isi file me hoga kisi aur file me pass nahi kiya gaya h mean ye function higher oerder function nahi h but agar fhir bhi agar aapko koi doubt ho to (return) likh sakte ho apni man marji ke liye 
   // but agar aapka function ak higher order function h mean aapke function me kisi aur file ke function ko pass kiya jaayega aur fhir wapas usi file me bheja jaayega to aapko apne function me return likhan compulsory hoga nahi to return na likhne ki wajah se error aane ke chances h

// now actual work start how this registeruser function register a new user data in backend
 // get user details from frontend like form form 
    //check validations - like fields are not empty or details are correct
    // check if user already exists: by its username, email in backend
    // check for images, check for avatar given by user // is user given avatar or not 
    // upload them to cloudinary, avatar   // if not uploaded to cloudnary and stored at localstorage 
    // create user object - create entry in db   //store all details of in mongodb in object form because all stored in object form as we known
    // remove password and refresh token field from response   // after storing details it always render all details onscreen as response but we say donot render (password/refresh token) 
    // check for user creation    // check is user data is stored in backend mean a user is created in backend if created than return as response 
    // return res


    //jab bhi hamare frontend se data aayega to wo (2)format me aayega (1st)(in json like from form or body) and (2nd) from (url) 
    // for body 
   const {fullName, email, username, password} = req.body 
   // ye saari details ham exract karenge from request se like hmaari body se request karne per kuch data a raha h jo user ne form/register fill karte time diya hoga ab us data me but saari details a rahi h jisme se hamne kuch cheeje extract karli like (fullName, email)key naam ki to wo ham ab print kara kar dekha rahe h ki wo hamaari extract hoke hame mili ki nahi 
   // console.log("fullName : ", fullName)     // now run thunderclient and get output as reponse agar aapne abhi frontend nahi banaya h    //aur ha yaar jab tumhaare pass frontend hi nahi h to tum jo data frontend se bhejne waale the wo kaise bhejoge aur agar frontend se koi data nahi aayega to ye code thunderclent per error maar jaayega to uske liye ham thunderclient per (post) ki request maarne se pahle response waale section me jaake (body) me (json select karke) { "email": "abhi@gmail.com", "fullName": "abhi"} aise key and value dono hi likhna padega agar hamaare pass frontend hota to form fillupp karke send dabaate hi ye (post)request active hoti aur backend me hame data mil jata jise ham yaha is code se extract kara kar apne console me print kar lete aur console me dekh lete aur yaha abhi to ham console/terminal me dekhne ke liye isliye print kara rahe h nahi to waise ham is extract kiye hue data ko mongodb me object form me store karaate   
//ham yaha (fullname, many more)cheejo ko body se extract karwa rahe h but ham  but agatr hamne apne frontend se sirf kuch hi field fill karke behej like (email) field fill karke nahi bheja to hamara error a jaayega ham chhahe to wo error kaisa dikhega dekhne ke liye (console me email) ko print karaane ke liye bol denge (apne (body,json)me email field bana kar bina usko fill kiye request maarenge thunderclient se to hame error dekhne ko milega)ki hamne body se (email ko bhi extract)kiya h but wo field user me body/form fill me fill nahi kiya h aur data send kar diya h backend me to aise user kaam na kare jisse hame baad me dikkat ho ki hame koi field chahiye aur user wo data hame send na kare isiye (validation checks) lagaate h aur field ko required banate h ki bina us filed ke fill kiye user data send nahi kar sakta backend me although hamne apne model file me jab ye fields banaye the to usme (requeired) field  property ka use kiya jisse ak frontend check lag jata h ki agar wo field fill nahi huua to data backend me send nahi hoga but ham apne liye ak (backend) me bhi validation check lagaate h kki agar frontend se bach gaya user aur bina filed fill kiye body/form data ko backend me send kare to wo send hi na ho error deke wahi stop ho jaaye taaki ham user se saari information lene ke baaad hi use aage procced karne de jaise agar wo (login)kare to poori information daale jise backend me match karakar tab user ko aage procced karne de 
// yaha ham data handle kar rahe like (json/body) se aane waale data ko aur extract kara kar backend me store kar rahe ise data handling kahte h but hame aage jaake file handling bhi karni hogi jaise yaha ham avatar/image lenge file format me to usko bhi handle karne keliye koi function ya property likhni hogi hi jo ham likhnge apni (user.router.js)file me wo h middleware like hamara data to handle ho raha h easily body se aayega usko extract kar lenge aur mongo me store but file jo hame apne user se leni h wo koi data to ha nhhi wo h file to usko user se lenge to frontend se usko user lene ke liye koi file handler yaani koi function likhna hoga jo us file ko frontend se le paaye jaise data ko ham user se body format me le pa rahe h uske liye ham use karegne (multer) ka jo frontend se kisi bhi file ko uplod kara sakta h isliye ham yaha use karenge (middleware)jisme hamne multer ka function likha h jiska kaam hota h kisi bhi file ko upload karana   // baaki kaise hoga kaise kaam karega wo (user.router)file me dekhlo   

if(fullName ===""){  // ye yaha hamne apne backend me chekpoint/val;lidation laga diya taaki user frontend se empty field na bheje
throw new ApiError(400, "fullName is required")    // agar is tarike ka error hota h ki user koi field empty diya h to aise error ko ham aise manually error banakar apne console me render kara sakte h waise ye koi error nahi h server ke hisaab se but hamne is error ko manuaaly banaya h aur render kar rahe h taaki hame jo data chahiye wo u+mile user se 
// yaha ye (ApiError) ak file h jisme hamne kuch input filds bana rakhe h jo input me kuch lenge jinhe hamne yaha pass kar diya h jise (error,message )   
// ak tarika ye uuper wala bhi h but usse hame sbhi fields ko check karaane ke liye uske (if) banane padenge jo ki accha tarika nahi h isliye ham isko ak aur method se karenge jisme ak baar me sabhi fields me condition daal denge bina sabhi ke liye (if)baar baar banaye  
}

if(
   [email, username, password].some(    //sabhi varible jisme condition check karni h unko (arry) me band kiya (.some)property ka use kiya jo ki hame in return (true/false) return karega  
      (filed) => {filed?.trim() === ""}      // yaha hamne jo pass kiya h uska naam kuch bhi rakho because uske ander pass to (email,username) in fieldname ke fields hi pass karenge jisme user data send karke bhej raha h// ab {}paranthesis me condition likhenge ki fields agar h in fieldsnames me to un filds me trim karo mean empty spaces hata do fields mese aur agar fhir bhi field empty h mean hamara field empty h to yaha se ham (if)condition activate karayege aur usse kya kaam karana h wo likh denge   
   )
){
   throw new ApiError(400, "all filds are required")
}

const existedUser = await User.findOne( // User naam ka model hamne models file me banaya h jo ki directly connected h mongodb se jo backend se direct data mongodb me bhejta h // to yaha ham iski help se databse me direct check kar paayenge jaha isne apna kudka ak alag section banaya hoga jaha saare (new/old)users ka (username, email) store rakha hoga waha ye (findone )propertyy use karenge jiska kaam h data me check karna match karna // ab jaise yaha user model me aake jo data store ho raha h us data me jo bhi naya user detail jo frontend se a raha h wo kisi exixt user ke  (username, email ) se match to nahi kar raha h agar kar raha h mean ye user hamar already backend me exixt kar raha h isko dubara is detail ke saath account mat banaane do rok do // to ye (findOne)bas exixt data me new coming data ko match karta h aur jo matched data sabse pahle mil jaayega data matching me usi ko as retun of matching dataye funtion return me de dega ye nahi h ki poore data mo match karega iska kaam bas itna h jaise hi matched data mila bas return me dedo aur aage matched data dhoodne ki jarrurat nahi h 
   {
    $or: [{username}, {email}]      // yaha hamne ($)lagaake condition property ka use kar liya iase hi ham (and,or,not) ka use kar sakte h jaise ye kah raha h ki agar (username) ya (email) dono mese kisi bhi field ka data jo frontend se a raha h wo databse me stored users model me stored user ke data se match karta h to us user ka matched hone wwale field ke data ko return me dedo taaki pata chal jaayega ki is naam ka data alredy databse me exixt kar raha h 
   })

if (existedUser){  // agar uuper ke function ke chalne se aisa koi user nila jiska email ya username databse me exixt kar raha h to us user ke us matched field ke data  ko as return me upper ka function dedega jo ki (if) condition ke liye as (true) show hoga to ye active ho jaayega  
   throw new ApiError(409, "User with same email or username alredy exixt")
}

// userrouter ne pahle hi hamari files ko upload kara kiya h local storage me to ab yaha jab ham apne naye user ko register karte h mean uska ak naya account banaate h to usse kuch detils lete h jo jamne uuper leli aur verify bhi karwa ki ki ye user exixt nahi karta h ab hamne register karne se pahle user se ak cheej maangi thi that is (file for avatar)using middleware aur usko localstorage me store bhi kara loya h but yaha is file me usko karna jarruri h ki hamne wo file li tabhi to wo register user ki file me count hogi ki ye perticular is user ki file h     
const avatarLocalPath = req.files?.avatar[0]?.path;
// jab bhi hame body se data chahiye hota h like form or json data from fontend to wo ham (express) ki help se (req.body)karke (body)se aane waale data ka access le lete h // ye to hua data handling but agar hame file handling karna ho to ham use karte h (multer) multer ka use karke agar ham (req.files)likhte h to ye hame body se aane waali har ak file like (png,pdf)sabhi filo ka access deta h ab hamne pane middleware ki help se multer ka use karke user se multiple files(coverpage,avatar) ko localstorage me store kara liya h aur (req.files karke)ham un body me store files ka access le sakte h 
//yaha hamne (req.files)karke files ka access liya h aur kahi koi error na aajaye isliye safeside ke liye pooch lete h (?)lagakar ki files ka access h ya nahi agar h to isme jitni files stored h localstore me usme se (avatar)naam ki file section ke array mese jo file us arrya me sabse uuper h usko dedo because is arrya me aur bhi baake users ke avatar files store h but hame to apne current user ke avatar ka access chaiye jisko hame during register new user ke data me store karna h   // ab ham yaha ye bhi kah rahe h ki bhai ye batao ki us array me h (0)th position per koi file h ya nahi agar g to uska localstorage ka path hame dedo ki wo kaha located h    
const coverImageLocalPath =req.files?.coverImage[0]?.path;


if(!avatarLocalPath){
   throw new ApiError(400, "avatar image is required")
}

// abhi tak hamne apne user se aane waale register ke data ko body se extract kiya usko check kiya empty to nahi h usko verify kiya ki copied/exixting to nahi h fhir jo files hamne multer se upload karwaai unka localstorage se file ka path nikalwa liya fhir ab unfiles ko ham cloudnary per upload karne waale h because yaha tak ye confirm ho chuka h ki ye files hi hamari store hogi as databse inko cloudnary per upload karenge aur ye sara kaam sirf ak single user ke liye kar rahe h jo ki pahli baar register karne aaya h is website per 

const avatar = await uploadOnCloudinary(avatarLocalPath)   //(uploadOnCloudinary) ye cloudnary file ka function h jiska kaam h files ko cloud per upload karwana uske liye ye un files ka path maang raha h as url form wo hamne isme pass kar diya h path ab files upload hone me time leti h isliye hamne yaha (await) ka use kiya h ki bhai jab tak hamara ye upload na ho jaaye tab tak is file ke aage ke functions ko procced na kiya jaaye 
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
   throw new ApiError(400, "avatar image is not uploaded on cloud")
}


const user = await User.create({   // ab ahamne yaha jo bhi data is file se le liya h user se usko apne monodb me store karenge now jaisa hame pata h ki (User.model file ka User)function directly mongodb se directly connected data databse me directly store karne ke liye ya data accesss karne ke liye mongodb databse se to yaha ham un varaibes to mention karenge jiska data ham databse me store ke liye bhej rahe h  
   fullName, // ye exect aise hi object form me databse me store hoga ye data 
   avatar: avatar.url,    // yaha ye avtar varaible me kaafi taike ka data hota h jo kaam ka nahi hota h jab ham apni multer ki file kholenge to hame pata chalega ki us file me wo file ko upload karata h aur response me sab kuch return karta h aur sab kuch me bahut kuch ata h jabki hame bas apne api uploded file ka (url)kaam ka h aur yaha ye (avatar,coverimege)varaible multer use kar rahe h to isliye return me hame faaltu cheeje na mile sirf url mile multer se ise liye ham yaha specify kar denge because (avatar, coverimage)multer  ke finction ka use kar rahi h to wo return me kaafi kuch apne ander contain kiye hui h isliye hamne yaha direct(avatar) na likhne ki jagah (avatar.url) likha nahi to wo saari unused data bhi is object me store ho jata databse me   
   coverImage: coverImage?.url || "", // yaha hame hamne apne (avatar) file ko baar baar recheck kar liya ki user se ye file aayi ki nahi iska url hame multer than cloudnary se mila ki nahi yaani avatar ki file hame user se mili h ki nhi ye hamne conditioon lagaake check kar liya but (coverImage)ko chek nahi kiya aur agar hame coverimage ka url nahi mil raha h mean koi dikkat hui h ya to user ne file hi upload nahi kiya coverimage ka to url nahi miega aur aise me ham us coverimage ko yaha databse e store karaane ke liye call karenge to error maar jaayega to eror se bachne ke liye ham yaha condition likh rahe h ki agar (url) h to store kara do nahi to empty space store kara do   
   email,
   password,
   username : username.toLowerCase()

})   // ab ye saari entries hamari object ki form me store hongi databse me but jab ye entries store hongi tab mongodb inhe ak specific(id) deta h jo perticular naye data entry in datbse ko represent karti h to mongodb ak (_id)naam ke varaible me ak (id) deta h nayi entry koo 


const createdUser = await User.findById(user._id).select( //abhi ham (user) varaible me check kar rah eh ki ye (id) naam ka varaible hame mila h mongodb se ya nahi agar mila h mean ye (iuser naam ka varaible/model ) empty nahi h isme entries aake store hui h jo ki hamare user ne store karai h (User.create) karke // is id ke milne se ye confirmation mil jata j hame ki data jo hame pane databse me store karaya h wo successfully store ho gaya h because tanhi ye (id)generate hui h jo ki mogodb me ne ki h jab entrires store karai gayi databse me 
             "-password -refreshToken"          // (select) hamara ak method h javascript ka jo ki use kiya jata h ki aapko kya kya cheeje select nahi karaani h unka naam likho is method me is method me bydefult saare fields selected hote h ki sabhi field hame show karne h databse me is perticular model ke single user ke object me but jinka name ham is method me likh dete h un fields ke data ko ye undefined store karata h databse me for security purpose like ham chhahte h ki password field ke detail mean passworrd hamara databse me store ho but wo show na ho databse me isliye us filed ki enrty ko undefined show karaate h ham apne databs me
             //yaha hamne (select)method ka use (.select) karke chaining method se kiya h mean direct use nahi kiya h because ham yaha isko specify kara rahe h ki jo user tumhe is (.findById) se mile us user ki data enrty me tumhe ye work perform karna h to chaining karke ham refernce dete h ki kiske saath ye kaam perform karna h  
              )

              if(!createdUser){
               throw new ApiError(500, "while register user something wrong happen") 
              }

// abhi tak hamne sirf user ko register kiya usko databse me store karaya aur koi error na a rahi ho ye check kiya but now finaaly hamara user register ho chuka h successfully iska bhi to hame response dena jarruri h ki bhai sab kaam ak dam set h sab kuch ho gaya aur user ki details ko databse me store kara liya h mean user register ho gaya h to iska ak final success wala response dedo to uske liye ham neeche response code likhenge
              return res.status(201).json(   
               new ApiResponse(200, "user registered successfully")
              )

} )


export {registerUser}




// backend me is file ke code ko test karne ke liye ham thunderclient ka use karenge 
// body < form <details insert 
// ab ham ye soch rahe honge ki (<body < json) me likh sakte the fhir (body < form) ka use kyu kar rahe beacuse (json) type me ham files ko insert nahi kar sakte jaise (body < form) option me ham apni files like (png,pdf) send kar sakte h like a frontend but (json) format me sirf data like text form me (key, value) send kar sakte but files nahi (form option)isme ak option hota h file ka usper click karke ham file option ko activate kar sakte h jiski help se ham (key,value)text ke saath (file)ko bhi send kar sakte h like a frontend 
//









// monodb altlas me ham databse < dataservices < collection mee jakee ham apna frontend se send kiye hue data ko dekh sakte h jo ki waha aake store hua hoga 
//aur jo (img,pdf) files hamne send ki hogi wo hamaare localstorage me (public < temp)folder me aake store ho gayi hogi fhir waha se cloudnary per upload hoke uski ak link link generate hui hogi jo ki database me user ke bane hue object jaha uska saara data store h waha aake store ho gayi hogi

// cludnary < media explorer me file dikh jaayegi jo ki frontend se localstorage and then yaha aake store hui hogi
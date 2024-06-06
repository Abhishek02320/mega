import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"




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
      (filed) => {filed?.trim() === ""}      // yaha hamne jo pass kiya h uska naam kuch bhi rakho because uske nader pass to (email,username) in fieldname ke fields hi pass karenge jisme user data send karke bhej raha h// ab {}paranthesis me condition likhenge ki fields agar h in fieldsnames me to un filds me trim karo mean empty spaces hata do fields mese aur agar fhir bhi field empty h mean hamara field empty h to yaha se ham (if)condition activate karayege aur usse kya kaam karana h wo likh denge   
   )
){
   throw new ApiError(400, "all filds are required")
}

USer.findOne( // User naam ka model hamne models file me banaya h jo ki directly connected h mongodb se jo backend se direct data mongodb me bhejta h // to yaha ham iski help se databse me direct check kar paayenge jaha isne apna kudka ak alag section banaya hoga jaha saare (new/old)users ka (username, email) store rakha hoga waha ye (findone )propertyy use karenge jiska kaam h data me check karna match karna // ab jaise yaha user model meaake jo data store ho raha h us data me jo bhi naya user detail jo frontend se a raha h wo kisi exixt user ke  (username, email ) se match to nahi kar raha h agar kar raha h mean ye user hamar already backend me exixt kar raha h isko dubara is detail ke saath account mat banaane do rok do // to ye (findOne)bas exixt data me new coming data ko match karta h aur jo matched data sabse pahle mil jaayega data matching me usi ko as retun of matching dataye funtion return me de dega ye nahi h ki poore data mo match karega iska kaam bas itna h jaise hi matched data mila bas return me dedo aur aage matched data dhoodne ki jarrurat nahi h 
   {
      
   })


} )


export {registerUser}
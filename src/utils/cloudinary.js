// file hnadling pagenge yaha ham kaise ham apne server ke localstorage se cloudnary ko path deke us file ko waha se utha kar cloudnary per upload karana fhir us file ke upload ho jaane ke baad us file ko loaclstorage se hatana server ke 


import { v2 as cloudinary } from "cloudinary";
// iska hamne naam (v2 se chnage karke cloudnary) rakha h bas
import fs from fs;   // basically (fs)(filesystem) ak file handler h jo ki already builtin property hoti h nodejs mean jab (nodejs install karoge te apne aap milega tumhe) jiska kaam h hamari file ko (read, write, remove) karne me help karta h jaise hame yaha file ko remove karne ke liye iski help lagegi 
// ak baat samajlo yaar ki file hamari kahidelete nahi hoti h filesystem se ye bas link ya unlink hoti h like maanlo  user ne koi file ko upload kiya to wo file localstorage me aake store hogi aur us time wo linked hogi aur jaise hi wo file cloudnary per upload ho jaayegi to ham kahenge ki us file ko remove kardo apne server ke localstorage se to wo file waha se remove nahi hogi sirf unlink hojaayegi server se aur show hoga ki wo remove ho gayi h but actuall me wo file wahi rahi rahegi bas server se unlink ho jaayegi
// actual me file hamaare server/website ke localstorage yaani browser me temporary kuch time ke liye store rahegi fhir after period of time wo waha se remove ho jaayegi but in real time agar file me hamare localstorage me show ho rahi h its mean ki file hamare (filesystem) se link h aur agar hame hamaare localstorage me show nahi ho rahi h its mean wo filesystem se unlink ho chuki h but actual me wo wahi localstorage me hi padi hui h (fs)se unlink hoke bas ye show karti h ki wo remove hogayi server ke localstorage se but wo wahi padi rahti h and after a period of time wo waha se remove ho jaati h so we can say that file remains there only for temporary time



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



 const uploadOnCloudinary = async (localFilePath) => {
// ye ak function aur ye funtion execute hone me timelagayega isliye (async) taaki baaki ke function ko chala do ye promise late return karega isme hamne parameter me jo pass kiya h varaible wo h (localstorage) ke path ka link jaha se hamara cloudinary file ko uthaayega cloud per upload karega fhir ham us file ko localstorage se unlink kar denge 
     try{
            if (!localFilePath) return console.log("can't get localfile path", null)
            // matalab agar hame localstorage ka path link form me nahi mila ki file kaha rakhi h to cloudnary us file ko find nahi kar paayega to ham yaha null return kara denge with msg
     // aur agar hame path mil gaya mean uuper waali (if) condition nahi chalegi aur ye code aage execute hoga for uploading the file from localstorage to cloud
    const response = await cloudinary.uploader.upload(localFilePath,     // ye clpudnary ka code h for uploading file on cloud jaha wo file path maan raha h to wo hamne (localfilepath)varaible me pass kar diya aur wo poochega ki file ki tarike ki h (pdf,image) than hamne usse (auto) kah diya ki bhai aap khud hi detect karlo ki file kis format ki h
    // jaisa ki hame pata h ki file jo h wo upload hone metime lega isliye hamne (await) laga diya because aage ka function isper depended h ki bhai file upload hone ke baad jo hame cloudnary url dega uska use karke ham kuch karenge to uske liye hame apne is function ka poora execute hona jarrruri h aur fhir ye function hame return me dega (url) us cloudinary per uploaded file ka usko ham yaha (response)varible me store kara kar return me response likh denge yaha jaha bhi iska use ho waha likh denge     
    {
            resource_type: "auto"
 })
       console.log("file uploaded cloud successfullly", response.url)
    return response;    
    }
      catch(error){ //agar hamari file upload thik se nahi hui cloudinary per like koi dikkat aayi to ye cathc chal jaayeha ab yaha agar problem (localfilepath)link me hogi tab to hamara (try) ke ander ka (if) chal jaayega but agar (direct)(error) aa gaya mean (try) ke ander ka code chala hi nahi mean file upload karne me koi dikkat aayi h (localfilepath)link me ko dikkat nahi h // ab yaha ye error ata h to hame ye to pata h ki hamare localstrorage me to file h but wo upoad nahi ho rahi h to aisi file junk create karti h hmaare localstorage me to ham aisi file ko apne localstorage se hi delete kar dete h is baar ham (unlink) nahi kar rahe h uski jagah use (delete) kar rahe h localstorage se beacuse aisi file junk create kar rahe hi (jab file unlink hoti h to file wahi padi rahti h ) localstorage me but wo as invisible behave karti h but jo file upload bhi na ho cloudnary per aur wo localstorage me hi padi rahe aisi file ko ham delete kar de wahi thik h nahi to junk create karti h
         fs.unlinkSync(localFilePath) // is code se wo localstored file waha se delete ho jaayegi 
         return null;

     }
 }

 export {uploadOnCloudinary}


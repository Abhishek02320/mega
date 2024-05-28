import multer from "multer";
// ham ayaha ak middleware bana rahe h (multer) ka jiska kaam hoga ki jab bhi poore project me kahi bhi kisi file ko upload karne ki baat chalegi to hamara (multer)middleware kahega ki bhai kuch bhi upload karna ho to us file ke code se kaho ki hamse pass kare pahle because ham hi h jo kisi bhi file ko poore upload kar sakta h (localstorage) me aur kisi cheeje se ham apne localstorage me koi bhi store nahi kar sakte sirf multer ke (upload) functions hi upload kara sakte h localstorage me isliye poore project me jaha bhi file upload ki baat aayegi to (multer) ke is middleware ko call karenge  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // ye middleware ak function chalata h jisme wo as parameter (req) yaani jo user file upload karna chahta h wo request hi to maarega ki ye file upload kar do (request me bhi hmara (json))data aayega jaise site me agar form hua to form ki details aayegi request me aur agar http link request h to usme bhi kuch na kuch data hota h wo bhi milega (2nd)ye lega (file ka)access yaani file me kya h (pdf,jpg) us file ka bhi access lega aur ak (cb mean callback)as input lega     (call back mean        ()=>{}  ye h cb isko cb bol rahe h yaha  )
      cb(null, "./public/temp") // yaha ham (callback) ka pahla parameter (null) le rahe h mean kuch bhi nahi aur doosara ham apni file ko kaha store katana chahte h usko wo destination folder path de rahe h jis folder me ham apni file ko as localstorage store krayenge  
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname) // yaha ham (callback function me null pass karenge aur doosara prameter me ham pass karemge file ka naam jo user upload karega uska yaha ham kah rahe h ki file ka wahi naam rakho jo ki user ne diya h usi naam se file ko localstorage me store karado )
    }
  })
 // ye uuper wala function hame return me (path and file name dega like   ./public/tem/abhi.jpg) file with its same name return karega jo ki user ne name diya tha usi name me aur fhir ham multer ka (upload)use karke localstorage me temporary time ke liye is file ko store kara lenge   aur ye path ko bhej denge apne (cloudinary)file ke function me as parameter me pass karemhe (localfilepath)varaible me waha ye path as path pass karenge aur ye path hame is file se return me (storage) varaible se milega because usi naam se function bana h yaha is file me 
export const upload = multer({ 
    storage, 
})


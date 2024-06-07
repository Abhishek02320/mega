import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// abhi in dono packages ko ham direct use nahi ar sakte h uske liye hame jaarurat padegi mongoose ke hooks ki jaise (middlewares ki) jisme (pre)ak middleware h jiska kaam h ki like hamne koi data (user se liya ya khud likha) to usko databse me store karaane se pahle ham is (pre)middleware ka ak check laga denge ki koi bhi data hamara jo ki (secured)hona chahiye usko databse me store kraane se pahle is miiddleware se pass karna hoga aur ye middleware (apne ander ak prograam) chala raha hoga jiska kaam hoga (data encryption) ka mean us data ko store karaane se pahle ham is middleware ka use karke usme (jwt,bcrypt) ka code chaale us data ko encrypt encoded kar denge fhir usko apne database me store karwa lenge  

const userSchema = new Schema({
    username: {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,     // is line se ham is Username field ko searching (true) karwa lete h databse me like hame pata h ki ham onscreen is username field ko bahut search karne waale h apne backend me to iska serching (true) hona chahiye jaise koi user h aur wo apka channel name search karna  chhahta h to wo apka username hi to search karega onscreen to agar iska (username)field ka (searching) true rahega to username ko ham apne database me search kar sakte h by name   
    },
    email: {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullName: {
        type: String,
        required : true,
        trim : true,
        index : true,
    },
    avatar: {
        type: String,   // ye jo string isme aake store hogi is jpg image ki wo hame milegi (3rd)party app (aws/cloudnary) se jaha ham apna image upload karenge aur wo hame ak link generate karke dega jisko ham databse me is filed me store karayenge tabhi wo onscreen awatar me show hoga 
        required : true,
    },
    CoverImage: {
        type: String,     // take string from cloudnary 
    },
    watchHistory: [   // ab is field me ham bahut saari videos har time store karaane waale h isliye is field ko hamne (array) bana liya h isme ak ak karke unsabhi videos ka (id) store karate rahenge ki ye videos abhi recently watch ki gayi h 
       {
        type: Schema.Types.ObjectId,
        ref: "Video"
       }   
    ],
    password: {
        type:String,
        required : [true, 'Password is required']

    },
    refreshToken: {
        type:String,
    },
    
},
{
    timestamps: true
})

userSchema.pre("save", //userschema ki fields ki details ko store karne se (pre middleware se pass karao) jo ki kah raha h ki (data save karne se pahle ye function chalega) jiska kaam h 
                    //  () => {}    // yaha ham is function ki jagah (function () {} ) ye function use karenge because dono me farak h (()=>{}) ye wala function me ham (this.password or this.username)aise kisi specific filed ke data ko target nahi kar paayenge because ham isme (this) ko use nahi kar sakte mean kisi specific ko target nahi kar paayenge  
                     async function (next) {   // hamne is function me next pass kiya h jiska matalab h ki iska promise return karne me time lagega tab tak tum agla function procced kra do
 // yaha is function ko time lagega promise retun karne me isliye async use kar liya ki bhai tu error mat maar ham promise denge but late denege isliye aage baaki ko procced kar 
 if(!this.isModified("password")) return next();   // isline ko likhna jarrori ye line ak check laga rahi is code per and ask agar hamaare databse me koi user apna password ko naya store karata h ya alredy stored ko modify karta h tabhi is middleware funtion ko chalao aur (password) field ke data ko encode karo agar yaha ye line nahi likhenge to ye function hamara har baar call hoga jaise hi User naam ke databse ke model me koi bhi field modify ya naya store hoga like koi user h usne apna email modify kiya to matalab wo is (user) model ke databse ko call karega to jab ye call hoga to (pre)middleware hook bhi call hoga jabki iski jarrurat bhi nahi h aur fhir hamare password field ke data ko dubara encoded karke uska ak naya hash generate karke usko dubra password field me store karega to aisa na ho isliye hamne ye condition lagayi h 
 // is uuper waali line ka matalab h ki agar password filed ka data modify nahi hua h to return me (next) procced karo mean agla function activate kardo iska promise aane me a bhi time h neaxt prograam procced kardo ab jiasa ki hame pata h ki agar kisi function me jaha bhi return likh dete h ya retrun me kuch bhi de dete h jaise yaha retun me (next()) dedioya h to function ke ander ke aage ka code read hi nahi hota h jaha return dediya mean wahi wo function end hoga aur promise me wo return de dega as output to yaha agar password modify nahi hua h than ia function ka aage ka code run nahi hoga hash me convert karne wala aur function retrun me next function ko activate kar dega               
 this.password = await bcrypt.hash(this.password, 10)  
             // (this.password)mean is feild ko pakdo uske data ko encode karo (bcrypt)hamse poochega kya cheej hash me convert karni h than we say (password) field ka data (10) round ke ander isko encoded kar do                           
 next() // hamne uuper apne function me (next) pass kiya tha wo isliye kiya tha taaki use yaha call kara paaye tabhi (next)function work karega ye kahega ki is function ka promise aane me time lagega tum tab tak doosara function neeche ka usko activate kardo mean aage ka kaam karo jo iske promise return karne ke baad hone wala h 
})

userSchema.methods.isPasswordcorrect = //ye yaha hamne apna ak custom method banaya h jo hamaare chhote chhote kaam karega jaise mongoose me bhi hote h methods like (updateone, deleteone) aise methods hote h usme // yaha hamne apna ak custom method banaya h jiska kaam h (password) ko check karna ki jo user ne hamara pass diya h login karne ke liye kya wo thik h kinahi mean jo sune signup ke time diya tha usi se login kar raha h ya kuch aise hi random to nahi de diya h uske liye hame (userschema dena hoga mean)use batao databse me jo password ja rahe h uska access dena (methods)ye likha jarruri h ye bataane ke liye ki ye ak (method) h jiska hamne naam rakha h (isPasswordCorrect) ab isme ak function chalayenge jo promise late return karega to (async) likh diya   
  async function (password){  // yaha hamne parameter me password pass kiya h mean (password)field ke data ko pass kiya h is function me ab usme function lagaayenge aur check karenge jo data aya h onscreen se wo thik h ya nahi conditions lagaake ki jispassword se user login kar raha h wo wahi h jo usne signup ke time diya tha ya random password se login kar raha h
    return await bcrypt.compare(password, this.password)
    // bcrypt ki ak khasiyat hoti h ki ko sirf string ko encode hi nahi karta h balki us encoded ko check bhi kar sakta h isliye yaha hamne bcrypt se hi kah diya bhai to check karke bata to usne kaha ki (onscreen) se aane wala password dedo aur jo databse me password field me stored hash h wo dedo mai compare karke tumhe bata doonga ki password same h ki nahi aur return me (true) ya false dedonga to compare hoke result aane me time legega isliye hamne yaha (await) laga diya ki bhai jab tak ye function poora complete hoke return me (true or false) na dede tab tak aage ke programm ko chalne mat do    

  }




// Jwt ak web token h aur ye kuch is tarike se kaam karta h ki jo bhi user hame ye token dega usko ham apna owner maanke ham use data ka access de denge  
// Jwt token secrate token hote h because jikse pass hoga wo aapke data ka access kar paayega isliye ham use apne (.env) file me likhte h 
// neeche waale dono hi (jwt) tokens h 
userSchema.methods.generateAccessToken = function(){
  return  jwt.sign(  // jwt ka ye sign method token generate karne me help karta h ab token generate karne ke liye kuch chhaiye jaise (payload jo ki hamara  object, string, buffer) mese kisi form me ho sakta h  (2)(secerate key) (3)(token expiry)
      { // ye h hamara payload
          _id: this._id, 
          // _id: naam ke payload varaible me ham string store kara rahe h apne databse ke (id)fild se utha ke yaha store kara rahe h aur ham chhahe to ham yaha object me aur bhi payload introduce kara sakte h string form me   
          email: this.email,
          username: this.username,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }         
    )
}
userSchema.methods.generateRefreshToken = function(){
    return  jwt.sign(  // jwt ka ye sign method token generate karne me help karta h ab token generate karne ke liye kuch chhaiye jaise (payload jo ki hamara  object, string, buffer) mese kisi form me ho sakta h  (2)(secerate key) (3)(token expiry)
      { // ye h hamara payload
          _id: this._id, 
          // _id: naam ke payload varaible me ham string store kara rahe h apne databse ke (id)fild se utha ke yaha store kara rahe h aur ham chhahe to ham yaha object me aur bhi payload introduce kara sakte h string form me   
     // referesh token me ham (id) as input lete h token generate karne ke liye beacuse ye har baar contineusly change hota rahta h isliye ham yaha bas (id) ka use karte h    
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }         
    )
}

export const User = mongoose.model("User", userSchema) 


//(npm i bcrypt) ka use ham isliye karte h because jaisa ki hame pata h ki (password ko string) form me likhne me bahut dikkat h jo ki unsafe bhi h to is problem se bachne ke liye ham (bcrpt) ka use karte h jiska kaam h hamaare (password)ko (hash form) me convert karna mean pahle (user se leke hash me convert karke store karana fhir wapas jab user maaange to fhirse hash se string me convert karke user ko dena ) 
// (npm i jsonwebtoken)   // ye package aur uuper wala bcrypt package dono ka ak hi kaam hi tokens generate karna mean ki kisi bhi secured data ko like (password, id) or any secured data ko encode karna tokens me which is unreadable than decode for user from token to string for secured data from other peoples 
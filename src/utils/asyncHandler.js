// asyc await type ke code ko likhne/handle karne waale ko ham asynchandler kah rahe h aur iska code 2tarike se likha jata h (1 h try catch format) (2 h promise format)
// ye handler ham bas isliye bana rahe h beause ham bas itna chhahte h ki ham apne project me koi bhi code likhe aur usme koi error aaye to ye site/server ko crash hone se bacha le bas jis code me error h utna part hamara working stop karde but poori site crash na kare isliye ham yaha ye (try catch ay promise methods bana rahe h jinko hame har baar har file me na banana pade jab ham un filo ke code ko is trycatch ya promise method ke rapper me band kar rahe h because baar baar trycatch ka code kon likhe har file me code ko cover karne ke liye is method me isliye yaha ak jagah likh liya h abhi yahi se har jagah har file me call kara kar un codes ko cover kara denge apne in methods me  ) 

// first method (promise method )
const asyncHandler = (fn) => {
   return (req,res,next) => {   // ye hamne ak bada function ke ander chhota function banaya h aur usi chhote function ke promise ko return kar diya h is bade function ke return me 
       // agar aapka function ak higher order function h mean aapke function me kisi aur file ke function ko pass kiya jaayega aur fhir wapas usi file me bheja jaaye jaha se wo aya h to aapko apne function me return likhan compulsory hoga nahi to return na likhne ki wajah se error aane ke chances h
        Promise.resolve(fn(req, res, next)).reject((err) => next(err) )  
     // promise me hame agar (resolve mila) mean function executed successfully and perform that function jo ki (async await ke raper me hamne closed h jis file me is file ko call kara kar unke code ko close kiya h in async await functions me  ) aur agar reject mila to (error show hoga aur agle waale function ko execute karenge aisa hamne apne (reject)promise me likha h mena agar error aayi to doosara function execute kar do ) 

    }
}


export {asyncHandler}




// **************************************************************************************************************************************************************************

// second method (try catch) 
//neeche wwale code ko samjhne ke liye ye code comment form me likha h 
// const asyncHandler = () => {} normally ye ah async handler function h because funtion kya hoota h jo kuch bhi (    () => {}  is fomat me likha ho usi ko function kahte h )
// const asyncHandler = (fn) => () => {} ab yaha hamne kya kiya ki ak function me doosara function pass kar diya h ()parameter me daal ke aur fhir ak naya ()parameter le liya h jisse hamara normal function format waisa ka waisa hi rahe
// const asyncHandler = (fn) => async () {} ahm apne function ko async bhi to banana chhahte h isliye bas aise likh diya 

// const asyncHandler = (fn) => async (req, res, next) => {
//     try{
//          await fn(req,res,next)
//     } catch(error){
//         res.status(err.code).json({
//             // agar koi error aya to code kaha error yaha h wo hame code likhke aajayega terminal per (err.code) ki wajah se
//             success: false,
//             message: err.message   // and kaya error h ye bhi show ho jaayega terminal me is line ki wjaha se because ye (err)se message maang raha h jo ki show hoga terminal per terminal me aise hi formate me error show hoga 
//         })
//     }
// }

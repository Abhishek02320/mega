import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req,res) => {
    //hamne apne is file ke funtion yaani user ko regiter karne ke liye jo function banaya h us function ko cover kiya h (try-catch/promise) ke rapper se jo ki hamne banaya h apne asyncfile me to is ke code/function ko hamne apne asynchandler file ke function me pass kiya h aur wo function apne ander (try-cath/promise) method ko contain kiya hua h jo hame kaafi problem se bacahayega aur wo usi file me likha h kis problem se bachaayega 
    res.status(200).json({ message : "ok"})
} )


export {registerUser}
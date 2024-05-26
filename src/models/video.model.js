import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
 // mongodb me aggrigation (queries) likhne ke liye hame iski jarrurat padi  is package ko ham yaha as a plugin inject karenge is file me direct iska us nahi kar sakte 
// basically ham is package ka use isliye kar rahe h because hamne ak cheej banayi h wo h (watchhistory) jisko perform karaane ke liye hame kuch queries likhi padegi like (insertone,  insert many)is tarike ki jisse hamari jo video watched videos hongi usni id store hogi us field me aur fhir jo videos hamari wayched hogi wo hame watched section me dikhegi to uski kaam ko asaan karne ke liye ham ye (aggriggation pipeline) ka use kar rahe h mongodb ki isliye ye extention download kiya h 

const videoSchema = new Schema({
    videoFile: {    
        type: String,   // from cloudnary
        required : true,
       },
    thumbnail: {
        type: String,  // from cloudnary
        required : true,
        },
    title: {
        type: String,
        required : true,
        },
    description: {
        type: String,
        required : true,
        },
    duration: {
            type: Number,    // from cloudnary because ak baar jab file hamari upload ho jaati h server per to wo hame (duration bhi as information) apne link me generate karke deti h 
            required : true,
        },
    views: {
        type: Number,
        default: 0
    },
    ispublished: {    // matalab jo video hamne apne  channel per upload karwai h kya wo publicly available h ya private h (true or false store hoga isme )
        type: Boolean,
        default: true   // agar hamne is filed me kuch bhi store naho karaya to ye bydefult us video ko public kar dega (true) store kra kar
    },
    owner: {
        type: Schema.Types.ObjectId,   // is filed ki details ham apne dosare model(User model) se leke yaha store karwa denge 
        ref: "User"
    }
   
},
{
    timestamps: true
})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema) 
 
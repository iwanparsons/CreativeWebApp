const mongoose=require('mongoose')
const {Schema, model} = mongoose

const postSchema=new Schema({
    user: String,
    message: [{
        colour: { type: String },
        engineSize: { type: Number },
        registrationNumber: { type: String, unique: true },
        make: { type: String },
    }],
    likes: Number,
    time: Date
})

const postData=model('MyPosts', postSchema)


function addNewPost(user, message){
   console.log(message)
    let newPost={
        user: user,
        message: [{
            colour: message.colour,
            engineSize: message.engineSize,
            registrationNumber: message.registrationNumber,
            make: message.make,
        }],
        likes: 0,
        time: Date.now()
    }
    // postData.push(newPost)
    postData.create(newPost)
        .catch(err=>{
            console.log("error: "+err)
        })
    console.log("with post ",postData)
}

async function getAllPosts(){
    let foundData=[]
    postData.find({})
        .then(mongoData=>{
            foundData=mongoData
        })
    return foundData
}

async function getUserPosts(user){
    let foundData=null
    await postData.find({user: user})
        .then(mongoData=>{
            // console.log("posts.js found posts")
            // console.log(mongoData)
            foundData=mongoData[0]
            console.log("found data: ",foundData.message)
        })
    return foundData.message
}

function likePost(){

}

module.exports={
    addNewPost,
    getAllPosts,
    getUserPosts,
    likePost
}
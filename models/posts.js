const mongoose=require('mongoose')
const {Schema, model} = mongoose

const postSchema=new Schema({
    user: String,
    post: [{
        colour: { type: String },
        engineSize: { type: Number },
        registrationNumber: { type: String },
        make: { type: String },
        message: {type: String},
    }],
    likes: Number,
    time: Date
})

const postData=model('MyPosts', postSchema)


function addNewPost(user, post){
   console.log(post)
    let newPost={
        user: user,
        post: [{
            colour: post.colour,
            engineSize: post.engineSize,
            registrationNumber: post.registrationNumber,
            make: post.make,
            message: post.message,
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

async function getAllPosts(n=5){
    let foundData=null
    await postData.find({})
        .sort({'time':-1})
        .limit(n)
        .exec()
        .then(mongoData=>{
            foundData=mongoData[0]
            console.log("found data: ",foundData.post)
        })
    return foundData.post
}

async function getUserPosts(user){
    let foundData=null
    await postData.find({user: user})
        .then(mongoData=>{
            // console.log("posts.js found posts")
            // console.log(mongoData)
            foundData=mongoData[0]
            console.log("found data: ",foundData.post)
        })
    return foundData.post
}

module.exports={
    addNewPost,
    getAllPosts,
    getUserPosts
}
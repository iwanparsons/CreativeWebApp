const mongoose=require('mongoose')
const {Schema, model} = mongoose

const userSchema= new Schema({
    username: String,
    password: String
})

const userData = model('Users', userSchema)

async function newUser(username, password){
    let isUser=await findUser(username)
    // console.log(isUser)
    if(!isUser){ // no user of that name exists
        const user={
            username:username, 
            password:password
        }
        await userData.create(user)
        .catch(err=>{
            console.log('Error:'+err)
            return false
        })
        return true
    }
    return false
}



async function getUsers(){
    // return users
    let data=[]
    await userData.find({})
        .exec()
        .then(mongoData=>{
            data=mongoData
        })
        .catch(err=>{
            console.log('Error:'+err)
        })
    return data
}

async function findUser(userToFind){
    // return users.find(user=>user.username==username)
    let user=null
    await userData.findOne({username:userToFind}).exec()
        .then(dataFromMongo=>{
            user=dataFromMongo
        })
        .catch(err=>{
            console.log('error:'+err)
        })
    return user
}



async function checkPassword(username, password){
    let user=await findUser(username)
    if(user){
        return user.password==password
    }
    return false
}

module.exports={
    newUser,
    getUsers,
    findUser,
    checkPassword
}

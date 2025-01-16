const mongoose=require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    vehicles: [
      {
        colour: { type: String },
        engineSize: { type: Number },
        registrationNumber: { type: String, unique: true },
        make: { type: String },
      },
    ],
  });

const userData = model('Users', userSchema)

async function newUser(username, password){
    let isUser=await findUser(username)
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

async function saveVehicle(username, vehicleData){
    try {
    const user = await findUser(username);

    if (!user) {
      console.error('User not found');
      return;
    }

    user.vehicles.push(vehicleData);
    await user.save();
    console.log('Vehicle added to user:', user);
  } catch (err) {
    console.error('Error adding vehicle:', err);
  }
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
    checkPassword,
    saveVehicle
}

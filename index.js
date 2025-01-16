const express = require('express')
const app = express()
const path = require('path')
const search = require('./models/search.js')
const users = require('./models/users.js')
const mongoose = require('mongoose')
require('dotenv').config()


const mongoDBpassword = process.env.MONGODB_PASSWORD
const myAppDBName = "WebApp"
const connectionString = `mongodb+srv://iwanparsons:${mongoDBpassword}@cluster0.eiwh5.mongodb.net/${myAppDBName}?retryWrites=true&w=majority`
mongoose.connect(connectionString)

app.listen(3000, () => {
  console.log("listening 3000")
})

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))

const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const threeMinutes = 3 * 60 * 1000

app.use(sessions({
  secret: "sheep",
  saveUninitialized: true,
  cookie: { maxAge: threeMinutes },
  resave: false
}))

//Dave's code
function checkLoggedIn(request, response, nextAction) {
  if (request.session) {
    if (request.session.username) {
      console.log('valid user, come on in')
      nextAction()
    } else {
      request.session.destroy()
      console.log('imposter get out')
      response.sendFile(path.join(__dirname, '/views', 'notloggedin.html'))
    }
  }
}

//My Code
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/vehicleSearch', checkLoggedIn, (req, res) => {
  response.sendFile(path.join(__dirname, '/views', 'search.html'))
})

app.get('/app', checkLoggedIn, (req, ress)=>{
  response.sendFile(path.join(__dirname, '/views', 'search.html'))
})

app.post('/save', async (req,res)=>{
  const vehicleData ={
    make: req.body.make,
    registrationNumber: req.body.reg,
    engineSize: req.body.engSize,
    colour: req.body.colour,
  }
  const user = req.session.user
  users.saveVehicle(user, vehicleData)
  res.sendFile(path.join(__dirname, '/views', 'search.html'))
})

app.post('/vehicleSearch', (req, res) => {
  const registrationNumber = req.body.registrationNumber;  // Get input from form
  const postData = JSON.stringify({ registrationNumber });

  // Call dataHelper function to fetch data based on registration number
  search.dataHelper(postData, search.blankObject(), (error, updatedObject) => {
    if (error) {
      res.status(500).send("Error fetching vehicle data.");
    } else {
      // Send the updated object to the client-side
      res.send(`
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/styles.css">
            <title>Vehicle Search Results</title>
          </head>
          <body>
            <nav>
              <ul>
                <a href="login">Login</a>
                <a href="logout">Logout</a>
                <a href="register">Register</a>
                <a href="app">Application</a>
              </ul>
            </nav>
            <div class="form">
              <h1>Vehicle Search</h1>
              <!-- Form to Submit Vehicle Registration Number -->
              <form action="/vehicleSearch" method="POST">
                <label for="registrationNumber">Enter Vehicle Registration:</label>
                <input type="text" id="registrationNumber" name="registrationNumber" required>
                <button type="submit">Search</button>
              </form>
            </div>
    
            <h2>Vehicle Information:</h2>
    
            <!-- Display each vehicle attribute on its own line -->
            <div><strong>Reg:</strong> ${updatedObject.reg}</div>
            <div><strong>Make:</strong> ${updatedObject.make}</div>
            <div><strong>Colour:</strong> ${updatedObject.colour}</div>
            <div><strong>Engine Size:</strong> ${updatedObject.engineSize}</div>
            <form action="/save" method="POST">
              <button type="submit" name="saveVehicle">Save Vehicle</button>
              <input type="hidden" name="reg" id="reg" value=${updatedObject.reg}>
              <input type="hidden" name="make" id="make" value=${updatedObject.make}>
              <input type="hidden" name="colour" id="colour" value=${updatedObject.colour}>
              <input type="hidden" name="engSize" id="engSize" value=${updatedObject.engineSize}>
            </form>
          </body>
        </html>
      `);  // Dynamically render each vehicle attribute on its own line
    }
  });
});

//dave's code till end of file
app.get('/login', (request, response) => {
  response.sendFile(path.join(__dirname, '/views', 'login.html'))
})

app.get('/register', (request, response) => {
  response.sendFile(path.join(__dirname, '/views', 'register.html'))
})

app.post('/register', async (request, response) => {
  if (await users.newUser(request.body.username, request.body.password)) {
    response.sendFile(path.join(__dirname, '/views', 'login.html'))
    console.log(users.getUsers())
  } else {
    response.sendFile(path.join(__dirname, '/views', 'registration_failed.html'))
  }
})

app.post('/login', async (request, response) => {
  if (await users.checkPassword(request.body.username, request.body.password)) {
    console.log('valid user')
    request.session.user = request.body.username
    response.sendFile(path.join(__dirname, '/views', 'search.html'))
  } else {
    console.log('invalid user')
    response.sendFile(path.join(__dirname, '/views', 'notloggedin.html'))
  }
})

app.get('/logout', (request, response) => {
  response.sendFile(path.join(__dirname, '/views', 'logout.html'))
})

app.post('/logout', (request, response) => {
  request.session.destroy()
  response.sendFile(path.join(__dirname, '/views', 'notloggedin.html'))

})
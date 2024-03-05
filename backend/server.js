const app = require('./app.js')
const socketio = require('socket.io')
//const {instruement} = require("@socket.io/admin-ui")
const PORT = 4000

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//socket connection
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
let currentQuestion = null
//will be a list of current questions in the future

io.of("habram").on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`)
  socket.on("set-question", (question,userName) =>{
    currentQuestion = question
    socket.to(userName).emit("display-question", currentQuestion)
    //console.log(`set-question display-question ${userName} ${currentQuestion}`)
  })
  socket.on("connect-to-room", (userName) => {
    // console.log("Current room", userName)
    // console.log("Current Question", currentQuestion)
    if(currentQuestion != null){
      socket.emit("display-question", currentQuestion)
    }
    else{
      console.log("Empty")
      socket.emit("disconnect-handler")
    }
    
  })
  socket.on("host", (userName) => {
    socket.to(userName).emit("switch-pages")
  })
  socket.on("join-room", (userName) => {
    socket.join(userName)
  })
  socket.on("host-disconnect", (userName) => {
    //will have to set current question to null for the map key of username
    socket.to(userName).emit("disconnect-handler")
    currentQuestion = null
  })
  socket.on("submit-answer-text", (userName, answer) => {
    console.log(`Sent the answer (${answer}) to ${userName}`)
    socket.to(userName).emit("recieve-answer-text", answer)
  })
  socket.on("submit-answer-MCQ", (userName , option) => {
    console.log(`Sent the answer (${option}) to ${userName}`)
    socket.to(userName).emit("recieve-answer-mcq", option)
  })
  socket.on("unsubmit-answer-MCQ", (userName , option) => {
    console.log(`Rebuke the answer (${option}) to ${userName}`)
    socket.to(userName).emit("decline-answer-mcq", option)
  })
  socket.on("give-option", (userName , option) => {
    console.log(`Initialise (${option}) to ${userName} new`)
    socket.to(userName).emit("initialise-option", option)
  })
})


module.exports=server
const app = require('./app.js')
const socketio = require('socket.io')
//const {instruement} = require("@socket.io/admin-ui")
const PORT = 4000

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//socket connection
const io = socketio(server)
let currentQuestion = null
//will be a list of current questions in the future

io.of("habram").on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`)
  socket.on("set-question", (question,userName) =>{
    currentQuestion = question
    socket.to(userName).emit("display-question", currentQuestion)
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
    console.log(answer)
    socket.to(userName).emit("recieve-answer-text", answer)
  })
})


module.exports=server
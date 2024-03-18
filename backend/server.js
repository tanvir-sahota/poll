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
let currentQuestionMap = new Map()
//will be a list of current questions in the future

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected. ${io.engine.clientsCount} clients.`)
  socket.on("set-question", (question,userName) =>{
    currentQuestionMap.set(userName, question)
    socket.to(userName).emit("display-question", question)
    //console.log(`set-question display-question ${userName} ${currentQuestion}`)
  })
  socket.on("connect-to-room", (userName, callback) => {
    //console.log("Socket ",socket.id, " and rooms in ", socket.rooms)
    const currentQuestion = currentQuestionMap.get(userName)
    if(currentQuestion != undefined){
      callback({
        question: currentQuestion
      })
    }
    else{
      console.log("No question hosted")
      callback({
        question: null
      })
    }

  })
  socket.on("check-hosting-status", (userName, callback) => {
    callback({
      isHosting: (currentQuestionMap.get(userName) != undefined)
    })
  })
  socket.on("host", (userName) => {
    socket.to(userName).emit("switch-pages")
  })
  socket.on("join-room", (userName) => {
    socket.join(userName)
  })
  socket.on("host-disconnect", (userName) => {
    //will have to set current question to null for the map key of username
    console.log("Socket ",socket.id, " and rooms to ", userName)
    socket.to(userName).emit("disconnect-handler")
    currentQuestionMap.delete(userName)
  })
  socket.on("submit-answer-text", (userName, answer) => {
    console.log(`Sent the answer (${answer}) to ${userName} ${io.engine.clientsCount} clients.`)
    socket.to(userName).emit("recieve-answer-text", answer)
  })
  socket.on("submit-answer-MCQ", (userName , option) => {
    console.log(`Sent the answer (${option}) to ${userName} ${io.engine.clientsCount} clients.`)
    socket.to(userName).emit("recieve-answer-mcq", option)
  })
  socket.on("unsubmit-answer-MCQ", (userName , option) => {
    console.log(`Rebuke the answer (${option}) to ${userName} ${io.engine.clientsCount} clients.`)
    socket.to(userName).emit("decline-answer-mcq", option)
  })

})


module.exports=server
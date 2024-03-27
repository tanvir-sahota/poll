//import all required components
const app = require('./app.js')
const socketio = require('socket.io')
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
let hostedSession = new Map()

//all web socket interactions
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
    if(!hostedSession.get(userName) || !hostedSession.get(userName).get(socket.id)) return
    if(currentQuestion != undefined){
      hostedSession.get(userName).set(socket.id, {value : 0})
      socket.to(userName).emit("new-attendees")
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
    hostedSession.set(userName, new Map([]))
    socket.data.username = userName
    socket.data.hosting = true
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
    //hostedSession.delete(userName)
  })
  socket.on("submit-answer-text", (userName, answer) => {
    console.log(`Sent the answer (${answer}) to ${userName} ${io.engine.clientsCount} clients.`)
    hostedSession.get(userName).get(socket.id).value++
    socket.to(userName).emit("recieve-answer-text", answer)
  })
  socket.on("submit-answer-MCQ", (userName , option) => {
    if(!hostedSession.get(userName) || !hostedSession.get(userName).get(socket.id))
    {
      socket.to(userName).emit("disconnect-handler")
      return
    }
    console.log(`Sent the answer (${option}) to ${userName} ${io.engine.clientsCount} clients.`)
    hostedSession.get(userName).get(socket.id).value++
    socket.to(userName).emit("recieve-answer-mcq", option)
  })
  socket.on("unsubmit-answer-MCQ", (userName , option) => {
    if(!hostedSession.get(userName) || !hostedSession.get(userName).get(socket.id))
    {
      socket.to(userName).emit("disconnect-handler")
      return
    }
    console.log(`Rebuke the answer (${option}) to ${userName} ${io.engine.clientsCount} clients.`)
    hostedSession.get(userName).get(socket.id).value--
    socket.to(userName).emit("decline-answer-mcq", option)
  })
  socket.on("update-attendees", (userName, callback) => {
    if(io.sockets.adapter.rooms.get(userName)){
      const size = io.sockets.adapter.rooms.get(userName).size
      callback({
        count: size > 0 ? (size - 1) : 0  
      })
    }
    else{
      callback({
        count: 0
      })
    }
  })
  socket.on("get-number-of-submissions", (userName, callback) => {
    const roomMap = hostedSession.get(userName)
    const iterator = roomMap.values()
    let count = 0;
    for(let i = 0; i < roomMap.size; i++){
      const value = iterator.next().value.value
      if(value > 0){
        count++
      }
    }
    callback({
      count: count
    })
  })
  socket.on("disconnect", ()=> {
    console.log("DISCONNECT")
    hostedSession.forEach(v => console.log(v))
    console.log(socket.id)
    if(socket.data.hosting) {
      console.log("LECTURER DISCONNECTED")
      socket.broadcast.emit("disconnect-handler")
      currentQuestionMap.delete(socket.data.username)
      //hostedSession.delete(socket.data.username)
    }

    socket.broadcast.emit("new-attendees")
  })
})



module.exports=server
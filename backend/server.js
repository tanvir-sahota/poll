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

io.of("habram").on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`)
})


module.exports=server
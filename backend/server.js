const app = require('./app.js')
const PORT = 4000;

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports=server;
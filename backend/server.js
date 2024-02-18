const app = require("./app.js")
const port = 4000

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

module.exports = server
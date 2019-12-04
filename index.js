const server = require("./api/server.js");

const port = 4000;
server.listen(4000, () => {
  console.log(`\n*** The API is currently running on http://localhost:${port} !***\n`);
});


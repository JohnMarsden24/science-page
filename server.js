const app = require("./app");

const port = 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

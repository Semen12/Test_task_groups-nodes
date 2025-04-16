const server = require("express")();
const port = 23456;
const cors = require('cors');


//Разрешаем запросы с  фронтенда!!!!
server.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));

process.env.BASEDIR = process.cwd();

server.use("/api", require("./routes"));

server.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});

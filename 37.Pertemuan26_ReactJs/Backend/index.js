const express = require("express");
const cors = require("cors");
const { response, request } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const port = 3001;
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "ambarwati",
  database: "db_react",
  host: "localhost",
  port: 5432,
});

//connect Database
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error", err.stack);
  }
  client.query("SELECT NOW ()", (err, res) => {
    release();
    if (err) {
      return console.error("Error", err.stack);
    }
    console.log("Connected to database");
  });
});

app.get("/", (req, res, next) => {
  pool.query("SELECT * FROM contacts").then((data) => {
    console.log(data);
    res.send(data.rows);
  });
});

app.delete("/:id", (req, res, next) => {
  pool.query(`DELETE FROM contacts WHERE id=${req.params.id}`).then((data) => {
    console.log(data);
    res.send(data.rows);
  });
});

app.put("/:id", (req, res) => {
  const { name, email, mobile } = req.body;
  pool
    .query(
      `UPDATE contacts SET name=$1, email=$2, mobile=$3 WHERE id=${req.params.id}`,
      [name, email, mobile]
    )
    .then((data) => {
      console.log(data.rows);
      res.send(data.rows);
    });
});

app.listen(port, () => {
  console.log(`App is Running on port ${port}, http://localhost:${port}`);
});

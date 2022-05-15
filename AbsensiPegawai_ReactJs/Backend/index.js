const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/db");
// //call multer
const multer = require("multer");
//call path
const path = require("path");
//call bcrypt module
const bcrypt = require("bcrypt");

//image uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File Not Valid"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

//middleware

app.use(express.json()); //req.body
app.use(cors());

//routes

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));
//dahsboard routes
app.use("/dashboard", require("./routes/dashboard"));

//Absensi Masuk Pegawai
app.post("/TimeIn", (req, res) => {
  const { user_id, date, time, ket } = req.body;
  pool
    .query(
      `INSERT INTO absensi (user_id, date, time, ket) VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, date, time, ket]
    )
    .then((data) => {
      console.log(data.rows);
      res.status(200).json({ msg: "Anda Berhasil Absen Masuk" });
    });
});

//Absensi Masuk Pegawai
app.post("/TimeOut", (req, res) => {
  const { user_id, date, time, ket } = req.body;
  pool
    .query(
      `INSERT INTO absensi (user_id, date, time, ket) VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, date, time, ket]
    )
    .then((data) => {
      console.log(data.rows);
      res.status(200).json({ msg: "Anda Berhasil Absen Pulang" });
    });
});

//Menampilkan detail profile karyawan
app.get("/Detail/:id", (req, res) => {
  pool
    .query(
      `SELECT users.id, users.username, users.name, users.email, users.mobile, users.address, users.position, users.image, absensi.date, absensi.time, absensi.ket FROM users FULL OUTER JOIN absensi ON absensi.user_id=users.id WHERE users.id='${req.params.id}'`
    )
    .then((data) => {
      console.log(data.rows);
      res.send(data.rows);
    });
});

//halaman daftar karyawan
app.get("/Employee", (req, res) => {
  pool.query(`SELECT * FROM users`).then((data) => {
    console.log(data.rows);
    res.send(data.rows);
  });
});

//tambah karyawan
app.post("/Register", upload.single("image"), async (req, res) => {
  if (!req.file) {
    console.log("No file Upload");
  } else {
    console.log(req.file.filename);
    const { username, name, position, email, mobile, address, password } =
      req.body;
    const { image } = req.file.filename;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);
    const img_src = req.file.filename;
    const upload = pool.query(
      `INSERT INTO users (username, name, position, email, mobile, address, password, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        username,
        name,
        position,
        email,
        mobile,
        address,
        hashedPassword,
        img_src,
      ],
      function (err, result) {
        if (err) {
          throw err;
        }
        console.log(result.rows);
      }
    );
    res.status(200).json({ msg: "Registrasi Berhasil" });
    // let imageUrl = req.protocol + "://" + req.get("host") + "/img/" + img_src;

    // res.json({ img_src: imageUrl });
  }
});

//Update Data Karyawan
app.put("/Employee/:id", (req, res) => {
  const { name, position, email, mobile, address } = req.body;
  pool
    .query(
      `UPDATE users SET name=$1, position=$2, email=$3, mobile=$4, address=$5 WHERE id=${req.params.id}`,
      [name, position, email, mobile, address]
    )
    .then((data) => {
      console.log(data.rows);
      res.send(data.rows);
    });
});

//hapus data karyawan
app.delete("/Employee/Delete/:id", (req, res) => {
  pool.query(`DELETE FROM users WHERE id=${req.params.id}`).then((data) => {
    console.log(data);
    res.send(data.rows);
  });
});

app.listen(3001, () => {
  console.log("Server is running on Port 3001");
});

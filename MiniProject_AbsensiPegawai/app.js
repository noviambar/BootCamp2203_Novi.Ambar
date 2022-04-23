//call express module
const express = require("express");
//call expressLayouts module
const expressLayouts = require("express-ejs-layouts");
//call express validator module
const { body, check, validationResult, Result } = require("express-validator");
//call morgan
const morgan = require("morgan");
//call express library
const app = express();
//call body-parser module
const bp = require("body-parser");
//call express session module
const session = require("express-session");
//call flash middleware
const flash = require("express-flash");
//call passport module
const passport = require("passport");
//call database
const pool = require("./config/db");
//call bcrypt module
const bcrypt = require("bcryptjs");
// //call multer
const multer = require("multer");
//call path
const path = require("path");

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
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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

const port = 3000;

const initializePassport = require("./config/passport");
initializePassport(passport);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(expressLayouts);

app.use(morgan("dev"));

app.use(express.json()); //=>req.body

//using middleware
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

//information using ejs
app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));

//function didalam passport
app.use(passport.initialize());
//
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
  res.locals.message = req.flash("message");
  next();
});

//call halaman login
app.get("/", checkAuthenticated, (req, res) => {
  //flash message
  console.log(req.session.flash.error);
  res.render("login", { title: "Login" });
});

//login user
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/Dashboard",
    failureRedirect: "/",
    failureFlash: true,
  })
);

//user Logout
app.get("/logout", checkNotAuthenticated, (req, res) => {
  req.logOut();
  res.render("login", {
    message: "You Have Logged Out Successfully",
    title: "Login",
  });
});

//call halaman dashboard
app.get("/Dashboard", checkNotAuthenticated, (req, res) => {
  const listCont = pool.query(
    `SELECT * FROM users WHERE id='${req.user.id}'`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      console.log(result.rows);
      res.render("dashboard", {
        title: "Dashboard",
        data: result.rows,
        message: "You Must Login To View This Page",
      });
    }
  );
});

//call halaman tambah data employee
app.get("/add", checkNotAuthenticated, (req, res) => {
  res.render("register", { title: "Add Employee" });
});

//tambah data karyawan
app.post(
  "/Employee",
  upload.single("image"),
  body("username").custom(async (value, { req }) => {
    try {
      const { rows: dupCont } = await pool.query(
        `SELECT username FROM users WHERE username='${value}'`
      );
      dupCont.map((contact) => {
        console.log(contact);
        if (contact) {
          throw new Error("username Already Taken");
        }
        return true;
      });
    } catch (err) {
      throw new Error("username Already Taken");
    }
  }),
  check("email", "Email is Invalid").isEmail(),
  check("mobile", "Mobile Phone is Invalid").isMobilePhone("id-ID"),
  check("password", "Password is Invalid")
    .isLength({ min: 5 })
    .withMessage("Password Must Contain at least 5 Characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = [req.body];
      const alert = errors.array();
      res.render("register", { alert, data, title: "Add Employee" });
    } else {
      if (!req.file) {
        console.log("No File Uploaded");
      } else {
        console.log(req.file.filename);
        const { username, name, position, email, mobile, address, password } =
          req.body;
        const { image } = req.file.filename;
        hashedPassword = await bcrypt.hash(password, 10);
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
            req.flash("success_msg", "Successful Uploaded");
            res.redirect("/Employee");
          }
        );
      }
    }
  }
);

//call halaman daftar employee
app.get("/Employee", checkNotAuthenticated, (req, res) => {
  const listCont = pool.query(`SELECT * FROM users`, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    console.log(result.rows);
    res.render("employee", { title: "Employee Page", data: result.rows });
  });
});

//call halaman detail employee
app.get("/Detail/:id", checkNotAuthenticated, (req, res) => {
  const listCont = pool.query(
    `SELECT users.id, users.username, users.name, users.email, users.mobile, users.address, users.position, absensi.date, absensi.time, absensi.ket FROM users INNER JOIN absensi ON absensi.user_id=users.id WHERE users.id='${req.params.id}'`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      console.log(result.rows);
      res.render("detail", { title: "Detail Employee", data: result.rows });
    }
  );
});

//call halaman update employee
app.get("/Detail/Update/:id", checkNotAuthenticated, (req, res) => {
  const editCont = pool.query(
    `SELECT * FROM users WHERE id=('${req.params.id}')`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.render("update", { title: "Update Page", data: result.rows });
    }
  );
});

//Update Data Employee
app.post(
  "/Detail/Update/:id",
  body("username").custom(async (value, { req }) => {
    try {
      const { rows: dupCont } = await pool.query(
        `SELECT username FROM users WHERE username='${value}'`
      );
      dupCont.map((contact) => {
        if (value !== req.body.oldName && contact.value) {
          throw new Error("Username Already Taken");
        }
        return true;
      });
    } catch (err) {
      console.log(err);
      throw new Error("Username Already Taken");
    }
  }),
  check("email", "Email is Invalid").isEmail(),
  check("mobile", "Phone Number is Invalid").isMobilePhone("id-ID"),
  (req, res) => {
    const errors = validationResult(req);
    const data = [req.body];
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("update", { alert, data, title: "Edit Data" });
    } else {
      const cont = [
        req.body.username,
        req.body.name,
        req.body.position,
        req.body.email,
        req.body.mobile,
        req.body.address,
      ];
      const addCont = pool.query(
        `UPDATE users SET username=$1, name=$2, position=$3, email=$4, mobile=$5, address=$6 WHERE id='${req.params.id}' `,
        cont,
        function (err, result) {
          res.redirect("/Employee");
        }
      );
    }
  }
);

//call halaman delete employee
app.get("/Detail/Delete/:id", checkNotAuthenticated, (req, res) => {
  const delCont = pool.query(
    `DELETE FROM users WHERE id = ('${req.params.id}')`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.redirect("/Employee");
    }
  );
});

//call halaman detail absensi
app.get("/Detail/Absensi/:id", checkNotAuthenticated, (req, res) => {
  const user = pool.query(
    `SELECT users.id, users.name, users.email, users.mobile, users.address, users.position, users.image, absensi.date, absensi.time, absensi.ket FROM users INNER JOIN absensi ON absensi.user_id=users.id WHERE users.id='${req.params.id}'`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      console.log(result.rows);
      res.render("absensi", { title: "Detail Absensi", data: result.rows });
    }
  );
});

//Absensi Masuk Pegawai
app.post("/AbsenMasuk", (req, res) => {
  const { user_id, date, time, ket } = req.body;
  const absensi = pool.query(
    `INSERT INTO absensi (user_id, date, time, ket) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, date, time, ket],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result.rows);
      res.redirect("/Dashboard");
    }
  );
});

//Absensi Pulang Pegawai
app.post("/AbsenPulang", (req, res) => {
  const { user_id, date, time, ket } = req.body;
  const absensi = pool.query(
    `INSERT INTO absensi (user_id, date, time, ket) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, date, time, ket],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result.rows);
      res.redirect("/Dashboard");
    }
  );
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/Dashboard");
  }
  next();
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

app.use("/", (req, res) => {
  res.status(404).send("Page Not Found!: 404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

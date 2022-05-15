const router = require("express").Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//register
router.post("/register", validInfo, async (req, res) => {
  try {
    const { username, name, position, email, mobile, address, password } =
      req.body;

    //check if user exist
    const user = await pool.query("SELECT FROM users WHERE username = $1", [
      username,
    ]);
    // res.json(user.rows);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist");
    }

    //hashing password using bcrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const hashedPassword = await bcrypt.hash(password, salt);

    //enter to database
    const newUser = await pool.query(
      "INSERT INTO users (username, name, position, email, mobile, address, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*",
      [username, name, position, email, mobile, address, hashedPassword]
    );
    // res.json(newUser.rows[0]);

    //generate jwt token
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login routes
router.post("/login", validInfo, async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    //if user doesn't exist
    if (user.rows.length === 0) {
      return res.status(401).json("Username or Email is Incorrect");
    }

    //cek password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      res.status(401).json("Password is Incorrect");
    }

    //mendapatkan jwt_token
    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;

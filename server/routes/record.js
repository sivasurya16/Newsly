import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
// This will help us connect to the database
import db from "../db/connection.js";
import auth from "../Middleware/auth.js"

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/",async (req, res) => {
  let collection = await db.collection("news");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("news");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", auth,async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("news");
    // let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.post('/user',async (req, res) => {
  const { email, password } = req.body;
  let User = await db.collection("creds");
  
  try {
    // check if the user already exists
    let user = await User.findOne({email:email});
    // console.log(user)

    if (user) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    // create new user
    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    User.insertOne({email:email,password:hashPassword,isAdmin:false});
    user = await User.findOne({ email:email });
    // return jwt
    const payload = {
      user: {
        email: email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const User = db.collection("creds");
  try {
    // check if the user exists
    let user = await User.findOne({ email:email });
    // console.log(user)
    if (!user) {
      return res.status(200).json({ msg: 'Email or password incorrect' });
    }

    // check is the encrypted password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ msg: 'Email or password incorrect' });
    }

    // return jwt
    const payload = {
      user: {
        email: email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);

router.get('/user/info', async (req, res) => {
  let User = db.collection("creds");
  try {
    var decoded = jwt.verify(req.headers["x-auth-token"],process.env.JWT_SECRET)
    let user = await User.findOne({"email": decoded.user.email});
    delete user.password;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});


// This section will help you update a record by id.
router.patch("/:id" ,auth,async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        "itemTitle" : req.body.itemTitle,
        "itemText" : req.body.itemText
      },
    };

    let collection = await db.collection("news");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id",auth ,async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("news");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
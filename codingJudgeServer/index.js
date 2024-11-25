require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://educare-fe496.web.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@developingcluster.sfd1o.mongodb.net/?retryWrites=true&w=majority&appName=developingCluster`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the database
const dbConnect = async () => {
  try {
    await client.connect();
    console.log("DB Connected Successfully ✅");
  } catch (error) {
    console.error("DB Connection Error:", error.name, error.message);
  }
};
dbConnect();

// Ensure graceful shutdown
process.on("SIGINT", async () => {
  await client.close();
  console.log("DB Connection Closed");
  process.exit(0);
});

// Database collections
const database = client.db("eduCareDB");
const usersCollections = database.collection("usersDB");
const contestsCollections = database.collection("contestsDB");
const submittedContestsCollections = database.collection("submittedContestsDB");

// JWT Middleware
const verifyCookie = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.user = decoded;
    next();
  });
};

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID format" });
  }
  next();
};

// API Endpoints
app.get("/", (req, res) => {
  res.send("Server is running, data will appear soon...");
});

// JWT routes
app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .send({ success: true });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", { maxAge: 0 }).send({ success: true });
});

// Users routes
app.get("/users", async (req, res) => {
  const result = await usersCollections.find().toArray();
  res.send(result);
});

app.get("/users/:email", async (req, res) => {
  const userEmail = req.params.email;
  const query = { email: userEmail };
  const result = await usersCollections.findOne(query);
  res.send(result);
});

app.post("/users", async (req, res) => {
  const email = req.body.email;
  const query = { email: email };
  const existedUser = await usersCollections.findOne(query);
  if (existedUser) {
    res.json({ message: "User already exists!", success: true });
  } else {
    const user = req.body;
    const result = await usersCollections.insertOne(user);
    res.json({ message: "User registered successfully!", result });
  }
});

// Contests routes
app.get("/contests", async (req, res) => {
  const result = await contestsCollections.find().toArray();
  res.send(result);
});

app.get("/contests/:id", verifyCookie, validateObjectId, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await contestsCollections.findOne(query);
  res.send(result);
});

app.post("/contests", verifyCookie, async (req, res) => {
  const contestInfo = req.body;
  const result = await contestsCollections.insertOne(contestInfo);
  res.send(result);
});

app.delete("/contests/:id", verifyCookie, validateObjectId, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await contestsCollections.deleteOne(query);
  res.send(result);
});

// Submitted Contests routes
app.get("/submittedContests/:id", verifyCookie, validateObjectId, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await submittedContestsCollections.findOne(query);
  res.send(result);
});

app.get("/submittedContestsByUser/:email", verifyCookie, async (req, res) => {
  const submittedBy = req.params.email;
  if (req.user.email !== submittedBy) {
    return res.status(403).send({ message: "Forbidden Access" });
  }
  const query = { userEmail: submittedBy };
  const result = await submittedContestsCollections.find(query).toArray();
  res.send(result);
});

app.post("/submittedContests", verifyCookie, async (req, res) => {
  const submittedData = req.body;
  const result = await submittedContestsCollections.insertOne(submittedData);
  res.send(result);
});

// Server setup
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

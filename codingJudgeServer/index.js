require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://educare-fe496.web.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@developingcluster.sfd1o.mongodb.net/?retryWrites=true&w=majority&appName=developingCluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// jwt middleware
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

// mongodb connection
const dbConnect = async () => {
  try {
    client.connect();
    console.log("DB Connected Successfully✅");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();

const database = client.db("eduCareDB");
const usersCollections = database.collection("usersDB");
const contestsCollections = database.collection("contestsDB");
const submittedAssignmentCollections = database.collection(
  "submittedAssignmentDB"
);

// jwt api method
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
  const user = req.body;
  res.clearCookie("token", { maxAge: 0 }).send({ success: true });
});

app.get("/", (req, res) => {
  res.send("server is running data will be appear soon...");
});

// users api method
app.get("/users", async (req, res) => {
  const cursor = usersCollections.find();
  const result = await cursor.toArray();
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
    res.json({ message: "User already exists!" , success: true});
  } else {
    const user = req.body;
    const result = await usersCollections.insertOne(user);
    res.json({ message: "User registered successfully!", result });
  }
});

// contests api method
app.get("/contests", async (req, res) => {
  // const page = parseInt(req.query.page);
  // const size = parseInt(req.query.size);
  // const filter = req.query.filter;

  // let query = {};
  // if (filter && filter !== "All") {
  //   query = { difficulty: filter };
  // }
  // const result = await assignmentsCollections
  //   .find(query)
  //   .skip(page * size)
  //   .limit(size)
  //   .toArray();
  const result = await contestsCollections.find().toArray()
  res.send(result);
});

// app.get("/assignmentsCount", async (req, res) => {
//   const filter = req.query.filter
//   console.log(filter);
//   let query = {}
//   if(filter){
//     query = { difficulty: filter };
//   }
//   const count = await assignmentsCollections.estimatedDocumentCount(query);
//   res.send({count});
// });

app.post("/contests", verifyCookie, async (req, res) => {
  const contestInfo = req.body;
  const result = await contestsCollections.insertOne(contestInfo);
  res.send(result);
});

app.get("/contests/:id", verifyCookie, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await contestsCollections.findOne(query);
  res.send(result);
});

// app.put("/assignments/:id", verifyCookie, async (req, res) => {
//   const id = req.params.id;
//   const assignment = req.body;
//   const filter = { _id: new ObjectId(id) };
//   const options = { upsert: true };
//   const updatedAssignment = {
//     $set: {
//       title: assignment.title,
//       difficulty: assignment.difficulty,
//       marks: assignment.marks,
//       dueDate: assignment.dueDate,
//       photoURL: assignment.photoURL,
//       description: assignment.description,
//       endDate: assignment.endDate,
//     },
//   };
//   const result = await contestsCollections.updateOne(
//     filter,
//     updatedAssignment,
//     options
//   );
//   res.send(result);
// });

app.delete("/contests/:id", verifyCookie, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await contestsCollections.deleteOne(query);
  res.send(result);
});

// submitted assignment api
app.get("/submittedAssignments", verifyCookie, async (req, res) => {
  const queryStatus = req.query.status;
  const query = { status: queryStatus };
  const result = await submittedAssignmentCollections.find(query).toArray();
  res.send(result);
});

app.get("/submittedAssignments/:email", verifyCookie, async (req, res) => {
  const submittedBy = req.params.email;
  if (req.user.email !== submittedBy) {
    return res.status(403).send({ message: "Forbidden Access" });
  }
  const query = { submittedEmail: submittedBy };
  const result = await submittedAssignmentCollections.find(query).toArray();
  res.send(result);
});

app.post("/submittedAssignments", verifyCookie, async (req, res) => {
  const submittedData = req.body;
  const result = await submittedAssignmentCollections.insertOne(submittedData);
  res.send(result);
});

app.put("/submittedAssignments/:id", verifyCookie, async (req, res) => {
  const id = req.params.id;
  const viewedAssignmentData = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedSubmittedAssignment = {
    $set: {
      status: viewedAssignmentData?.status,
      givenMarks: viewedAssignmentData?.givenMarks,
      feedback: viewedAssignmentData?.feedback,
    },
  };
  const result = await submittedAssignmentCollections.updateOne(
    filter,
    updatedSubmittedAssignment,
    options
  );
  res.send(result);
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

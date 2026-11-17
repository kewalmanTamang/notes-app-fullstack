require('dotenv').config();
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require('express');
const app = express(); 
const path = require("path"); 

const authRouter = require("./routes/auth");
const moviesRouter = require("./routes/movies"); 
const noteRouter = require("./routes/notes")
const tmdbRouter = require("./routes/tmdb");
const { default: mongoose } = require('mongoose');
const auth = require("./middleware/auth");



app.use(express.json()); // read JSON bodies into req.body 
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter); //anything starting /auth goes to routes/auth.js
app.use("/movies", moviesRouter); 
app.use("/notes",auth, noteRouter); //anything starting with /notes goes to route/notes.js
app.use("/tmdb",tmdbRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB! "))
  .catch((error) => console.log("MongoDB connection failed: ", error.message))

app.listen(5000, () =>{
  console.log("running at http://localhost:5000");
});


require('dotenv').config();
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require('express');
const app = express(); 
const path = require("path"); 

const moviesRouter = require("./routes/movies"); 
const noteRouter = require("./routes/notes")
const tmdbRouter = require("./routes/tmdb");
const { default: mongoose } = require('mongoose');


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/movies", moviesRouter); 
app.use("/notes", noteRouter); 
app.use("/tmdb",tmdbRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB! "))
  .catch((error) => console.log("MongoDB connection failed: ", error.message))


app.listen(5000, () =>{
  console.log("running at http://localhost:5000");
});


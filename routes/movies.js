const express = require('express'); 
const router = express.Router(); 

const movies = [
  {
  id: 1,
  title:"Predestination", 
  genre:"Sci-fi",
  }, 
  {
  id:2,
  title:"Intersteller", 
  genre:"Sci-fi"
  },
  {
    id:3,
    title:"Hangover", 
    genre:"Comedy"
  }
]
router.get("/", (req,res)=>{
res.json(movies)
})

router.get("/best", (req,res)=>{
  const best =movies.find((n) => n.id === 2)
  res.json(best);
})

router.get("/:id", (req,res) =>{
  const id = Number(req.params.id); 
  const movie = movies.find((n) => n.id === id)

  if(!movie){
    return res.status(404).json({error:"Movies not found"})
  }

  res.json(movie);
})

module.exports= router;
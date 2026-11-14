const express = require('express'); 
const router = express.Router(); 

// router.get("/popular",(req, res) =>{
//   res.json({message:"TMDB route works "});
// })

router.get("/popular", async(req,res)=>{
  const response = await fetch("https://api.themoviedb.org/3/movie/popular",{
    headers:{
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  })
 
  if(!response.ok){ 
  return res.status(404).json({error: "TMDB request failed! "})
  }

  const data = await response.json();
  res.json(data);
})

router.get("/search", async (req,res) =>{
  const query = encodeURIComponent(req.query.query); 

  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
    headers:{
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`
    },
  })
   if(!response.ok){ 
    return res.status(404).json({error: "TMDB request failed! "})
   } 

  const data = await response.json(); 
  res.json(data); 
})

router.get("/movie/:id", async (req,res) =>{

  const id = req.params.id; 
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits`,{
    headers:{
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`
    }
  })

  if(!response.ok){
    return res.status(404).json({error:"Movie not found"})
  }
  const data = await response.json();
  res.json(data); 
})


module.exports = router; 
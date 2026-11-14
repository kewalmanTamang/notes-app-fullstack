const express = require("express"); 
const mongoose = require("mongoose")
const router = express.Router();
const Note = require("../models/Note");

router.get("/", async(req,res) =>{
  try{
    const notes = await Note.find(); 
  res.json(notes);
  } catch(error){
    console.log(error); 
    res.status(500).json({error: error.message})
  }
})

router.post("/", async (req,res) =>{
  try{
     if(!req.body.title){
  return res.status(400).json({error: "Empty note "});
 }

 const newNote = await Note.create({
  title: req.body.title,
  content: req.body.content,
 })
  res.status(201).json(newNote); 
  } catch(error){
  console.log(error)
  res.status(500).json({error: error.message})
  }

})

router.delete("/:id", async(req,res)=>{
  try{
   const id = req.params.id; 
 
 if(!mongoose.isValidObjectId(id)){
  return res.status(400).json({error:"Bad Request"})
 } 
   const deletedNote = await Note.findByIdAndDelete(id);
  
   if(deletedNote === null){
   return res.status(404).json({error: "Note not found "}); 
   }  return res.json({message: "note deleted successfully"})

  } catch(error){
    console.log(error)
    return res.status(500).json({error: error.message})
  }
})

router.put("/:id", async (req,res) =>{
  try{
    const id = req.params.id; 
   if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({error: "Bad request"})
   } 
   if(!req.body.title){
    return res.status(400).json({error:"Title is required!"})
   } 
    const updatedNote = await Note.findByIdAndUpdate(id,{ title: req.body.title, content: req.body.content},
      { returnDocument: "after", runValidators: true}
    );

    if(updatedNote === null){
      return res.status(404).json({error: "note not found"})
    }
    res.json(updatedNote); 
  } catch(error){
   console.log(error)
   res.status(500).json({error: error.message})
  }
});

module.exports = router;
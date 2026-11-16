const express = require("express"); 
const mongoose = require("mongoose"); 
const Note = require("../models/Note")
const router = express.Router(); 

router.get("/", async(req,res) =>{
  try{
    const newNote = await Note.find(); 
    res.json(newNote); 
  } catch(error){
    console.log(error); 
    res.status(500).json({error: error.message});
  }
})

router.post("/", async(req,res) =>{
  try{
    if(!req.body.title){
      return res.status(400).json({error: error.message});
    }
    const newNote = await Note.create({
      title: req.body.title,
      content: req.body.content
    } )
    res.status(201).json(newNote);  
  } catch(error){
      console.log(error)
      res.status(500).json({error: error.message});
    }
})

router.delete("/:id", async(req,res) =>{
  try{
    const id = req.params.id; 
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({error: "Bad request"})
    } 
      const deletedNote = await Note.findByIdAndDelete(id); 
  if(deletedNote === null){
     return  res.status(404).json({error: "Note doesn't exist"});
  } res.json({message: "Note successfuly Deleted"})
  } catch(error){
    console.log(error);
    res.status(500).json({error: error.message})
  }
})

router.put("/:id", async(req,res)=>{
  try{
    const id = req.params.id; 
  if(!mongoose.isValidObjectId(id)){
   return  res.status(400).json({error: "Bad request"})
  } 
  if(!req.body.title){
  return  res.status(400).json({error: "Title is required  doesn't "})
  }
 const updatedNote = await Note.findByIdAndUpdate(id,
  {
  title: req.body.title,
  content: req.body.content,
 }, 
 {  returnDocument: "after",
  runValidators: true,
 } 
) 
if(updatedNote === null){
 return res.status(404).json({error: "note not found "})
}
res.json(updatedNote);
  } catch(error){
    console.log(error);
    res.status(500).json({error: "somthing went wrong"})
  }
})

module.exports = router;
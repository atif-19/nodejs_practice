const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
});
router.post('/', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add person', message: error.message });
  }
});


router.get('/:work',async (req,res)=>{
    try{
        const work = req.params.work;
        const persons = await Person.find({ work: work });
        res.json(persons);
    }
    catch(error){
        res.status(500).json({ error: 'Failed to fetch persons' });
    }
});

// update person by id
router.put("/:id",async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedData = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(personId,updatedData,{new:true,runValidators:true});

        if(!updatedPerson){
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json(updatedPerson);
    }

    catch(error){
        res.status(400).json({ error: 'Failed to update person', message: error.message });
    }
});

// delete person by id
router.delete("/:id",async(req,res)=>{
    try{
        const personId = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(personId); 
        if(!deletedPerson){
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json({ message: 'Person deleted successfully' });
    }
    catch(error){
        res.status(400).json({ error: 'Failed to delete person', message: error.message });
    }
});
module.exports = router;
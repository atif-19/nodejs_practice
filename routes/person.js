const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const localAuthMiddleware = require('../auth');
const bcrypt = require('bcrypt');
const {jwtAuthMiddleware, generateToken} = require('../jwt');
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();

    // generate JWT token upon successful signup
    const token = generateToken(savedPerson);
    console.log('Generated JWT Token:', token);

    res.status(201).json({ user: savedPerson, token: token });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add person', message: error.message });
  }
});

router.post('/login',async (req,res)=>{
    try{
        const { username, password } = req.body;
        const person = await Person.findOne({ username: username });
        if(!person){
            return res.status(400).json({ error: 'Invalid username' });
        }
        const isPasswordMatch = await bcrypt.compare(password, person.password);
        if(!isPasswordMatch){
            return res.status(400).json({ error: 'Invalid password' });
        }
        else{
            const token = generateToken(person);
            console.log('Generated JWT Token on login:', token);
            res.setHeader('Authorization', token);
            res.send(token);
            res.json({ message: 'Login successful', user: person });
        }
    }
    catch(error){
        res.status(500).json({ error: 'Login failed', message: error.message });
    }
});



router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const user = req.user;
        const userId = user.id;
        const person = await Person.findById(userId);
        if(!person){
            res.status(404);
            res.send({ error: 'Person not found' });
        }
        
        res.send(person);
        res.status(200);
    }
    catch(error){
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
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
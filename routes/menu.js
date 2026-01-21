const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

router.post('/addmenuitems', async (req, res) => 
{
    try {
        const newItem = new MenuItem(req.body);
        const savedItem = await newItem.save();
        console.log('New menu item added:', savedItem);
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add menu item' });
    }
});
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const menuItems = await MenuItem
            .find({ category: category });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu items by category' });
    }
})
module.exports = router;
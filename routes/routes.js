const express = require('express');
const router = express.Router();
const Owner = require('../models/owner');

router.post('/owner', async (req, res) => {
    try {
        const { name, email } = req.body
        if (!(name && email)) {
            return res.status(200).json('Please enter a name and email')
        }
        const checkOwner = await Owner.findOne({ name, email })
        if (checkOwner) {
            return res.status(409).json({
                message: 'Owner already exists!'
            })
        }
        const data = new Owner({ name, email })
        const owner = await data.save();
        res.status(200).json(owner)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error on create Owner'
        })
    }
})

module.exports = router;
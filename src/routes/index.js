const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', (req, res) =>{
    res.send("helow word")

})


module.exports = router
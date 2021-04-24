const express = require('express')
const router = express.Router()

const pool = require('../database')
const {isLoggedIn} = require('../lib/auth')

router.get('/add',isLoggedIn, (req, res) => {
    res.render('links/add')
})

router.post('/add',isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('INSERT INTO links SET ?', [newLink])
    req.flash('success', 'Link saved successfully')
    res.redirect('/links')
    
})

router.get('/',isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log(links)
    res.render('links/list', {links})
})

router.get('/delete/:id',isLoggedIn, async(req,res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id])
    req.flash('success', 'link deleted successfully')
    res.redirect('/links')
})

router.get('/edit/:id',isLoggedIn, async( req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id])
    res.render('links/edit', {link:links[0]})

})

router.post('/edit/:id',isLoggedIn, async (req,res) => {
    const { id } = req.params;
    const {title,description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id])
    req.flash('success', 'Link updated successfully')
    res.redirect('/links')
})

module.exports = router     
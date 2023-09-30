const express = require("express");                    
const router = express.Router();                           
const db = require("../data/db-connection");

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}));

router.get("/adminarea/update/:idsong", async (req, res) => {
    const idsong = req.params.idsong
    const data = await db.query("SELECT * FROM lyrics WHERE idsong=?", [ idsong ])
    const singername = await db.query("SELECT * FROM lyrics INNER JOIN singers ON lyrics.idsinger=singers.idsinger")
    
    try {
        res.render("admin/update.ejs", {
            data: data[0][0],
            singername: singername[0][0]
        })
    } catch (err) {
        console.log(err)
    }
})

router.post("/adminarea/update/:idsong", async (req, res) => {
    const idsong = req.params.idsong
    const idsinger = req.body.idsinger
    const songname = req.body.songname
    const lyrics = req.body.lyrics
    const speichern = req.body.speichern

    if (speichern) {
        try {
            await db.query("UPDATE lyrics SET songname=?, lyrics=? WHERE idsong=?", [songname, lyrics, idsong])
            res.redirect("/adminarea?action=update")
        } catch(err){
            console.log(err)
        }
    } else {
        res.redirect("/adminarea")
    }
})

router.get("/adminarea/delete/:idsong", async (req, res) => {
    res.render("admin/delete.ejs")
})

router.post("/adminarea/delete/:idsong", async (req, res) => {
    const idsong = req.params.idsong
    const loschen = req.body.loschen

    if(loschen){
        try {
            await db.query("DELETE FROM lyrics WHERE idsong=?", [ idsong ])
            res.redirect("/adminarea?action=delete")
        } catch(err){
            console.log(err)
        }
    } else {
        res.redirect("/adminarea")
    }
})

router.get("/adminarea/create", async (req, res) => {
    try {
        const [singername, ] = await db.query("SELECT * FROM singers")
        res.render("admin/create.ejs", {
            option: singername
        })
    } catch (err) {
        console.log(err)
    }
})

router.post("/adminarea/create", async (req, res) => {    //sorun var kaydetmede
    const idsinger = req.body.singername
    const songname = req.body.songname
    const lyrics = req.body.lyrics
    
    try {
        await db.query("INSERT INTO lyrics (idsinger, songname, lyrics) VALUES (?, ?, ?)", [idsinger, songname, lyrics])
        res.render("/adminarea/?action=create")
    } catch (err) {
        console.log(err)
    }
})

router.get("/adminarea/read/:idsong", async (req, res) => {
    const id = req.params.idsong
    try {
        const [read, ] = await db.query("SELECT * FROM lyrics where idsong=?", [ id ])
        res.render("admin/read.ejs", {
            read: read[0]
        })
    } catch (err) {
        console.log(err)
    }
})

router.get("/adminarea", async (req, res) => {
    
    try {
        const [list, ] = await db.query("SELECT * FROM lyrics INNER JOIN singers ON lyrics.idsinger=singers.idsinger")
        res.render("admin/adminarea.ejs", {
            list: list,
            action: req.query.action
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;    
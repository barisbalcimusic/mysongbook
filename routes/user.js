const express = require("express");
const router = express.Router();
const db = require("../data/db-connection");
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}));

router.get("/lyrics/:idsinger/:idsong", async (req, res)=> {
    const idsong = req.params.idsong
    try {
        const [data, ] = await db.query("SELECT * FROM lyrics WHERE idsong=?", [idsong]);
        res.render("user/songdetail.ejs", {
            song: data[0]
        })
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/lyrics/:idsinger", async (req, res)=> {
    const idsinger = req.params.idsinger
    
    try {
        const [data, ] = await db.query("SELECT * FROM lyrics INNER JOIN singers ON lyrics.idsinger=singers.idsinger WHERE lyrics.idsinger=?", [idsinger]);
        const [singername, ] = await db.query("SELECT singername FROM singers WHERE idsinger=?", [idsinger])
        
        res.render("user/songlist.ejs", {
            song: data,
            singername: singername
        })
    } catch(err) {
        console.log(err);
    }
});
                           
router.get("/lyrics", async (req, res)=> {                   
    try {
        const [data, ] = await db.query("SELECT * FROM singers");                
        res.render("user/lyrics.ejs", {
            singer: data
        })
    }
    catch(err) {
        console.log(err);
    }
});

router.use("/signup", (req, res)=> {
    res.render("user/signup.ejs");
});

router.use("/login", (req, res)=> {
    res.render("user/login.ejs");
});

router.use("/", (req, res)=> {
    res.render("user/index.ejs");
});

module.exports = router;
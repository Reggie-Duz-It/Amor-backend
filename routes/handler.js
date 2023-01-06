const express = require('express');
const router = express.Router();
const pool = require('../config/db.js');
const cors = require('cors');
const flash = require('express-flash');

router.use(cors());


router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Tyoe');
    next();
})

router.get('/testimonials', async (req, res) => {
    pool.getConnection( (err,conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT * FROM testimonial`;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            })

        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});

router.post('/testimonials', async (req, res) => {
    pool.getConnection( (err,conn) => {
        var firname = req.body.firname;
        var tmessage = req.body.tmessage;
        if (err) throw err;

        try {
            const qry = `INSERT INTO testimonial (name, message) VALUES ('${firname}', '${tmessage}')`;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                console.log('record inserted');
                console.log(result);
                res.redirect('https://amormft.com/');
            })

        } catch (err) {
            console.log(err);
            res.end();
        }
    });
     
});

module.exports = router;
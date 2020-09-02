var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
    res.render('backend');
})

router.get('/upload', function (req, res) {
    res.render('upload')
})

router.post('/upload', function (req, res) {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    var xx = req.files.xx;
    const uploadPath = path.join(__dirname, '../../public/uploads/', xx.name);
    xx.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });
    res.send('ok');
})

router.use('/user', require('./users'));

module.exports = router;

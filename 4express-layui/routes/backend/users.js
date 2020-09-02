var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
    //获取post请求数据
    console.log('post:', req.body);
    conn.query('insert into user set ?', req.body, function(err, result) {
        if (err) {
            res.statusCode = 500;
            res.send('error');
            console.log('注册失败');
        }
        res.statusCode = 200;
        if (result.affectedRows > 0) {
            res.send('注册success');
        } else {
            res.send('fail');
        }
    })
});
module.exports = router;
var express = require('express');
const conn = require('../db');

const resultback = require('../utils/result');

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    var articleList = [];
    console.log(req.cookies.user);
    var user = req.cookies.user;
    conn.query("select *,DATE_FORMAT(date,'%Y-%m-%d  %H:%i:%s') nowdate from article", function(err, result) {
        if (err) {
            console.log(err);
            res.send(resultback.fail('请求数据失败！'));
        } else {
            result.forEach(item => {
                    articleList.unshift(item);
                })
                // res.render('user/list', { list: postList })
                // res.json(articleList);
        }
    })
    var postList = [];
    conn.query("select pid,user.avater,user.nickname,img,text,DATE_FORMAT(date,'%Y-%m-%d  %H:%i:%s') nowdate from post,user where user.id=post.id", function(err, result) {
            if (err) {
                console.log(err);
                res.send(resultback.fail('请求数据失败！'));
            } else {
                result.forEach(item => {
                        postList.unshift(item);
                    })
                    // res.render('user/list', { list: postList })
                res.json([articleList, postList]);
            }
        })
        // conn.query("select *,DATE_FORMAT(date,'%Y-%m-%d  %H:%i:%s') nowdate from post", function(err, result) {
        //         if (err) {
        //             console.log(err);
        //             res.send(resultback.fail('请求数据失败！'));
        //         } else {
        //             result.forEach(item => {
        //                     postList.unshift(item);
        //                 })
        //                 // res.render('user/list', { list: postList })
        //             res.json(postList);
        //         }
        //     })
        // var data = {
        //     code: 0,
        //     data: { name: 'aaa', pwd: '123' },
        //     isSuccess: true,
        //     msg: "请求成功"
        // }
        // res.json(data);
});
// router.post('/', function(req, res) {
//     console.log(req.body);
// })
router.post('/login', function(req, res) {
    var param = req.body;
    console.log(param);
    conn.query('select * from user where username=?', param.username, function(err, result) {
            if (err) {
                // res.statusCode = 500;
                res.send(resultback.fail('请求失败！'));
                console.log('失败');
            } else {
                res.statusCode = 200;
                if (result.length > 0) {
                    console.log(result);
                    if (param.password == result[0].password) {
                        res.cookie('user', result[0].id, {
                            domain: 'localhost',
                            path: '/',
                            maxAge: 30 * 60 * 1000
                        });
                        res.redirect('http://localhost:8080/Home');
                        // res.send(resultback.success('登录成功', result[0].status));
                    } else {
                        res.send(resultback.fail('密码错误！请重试！'));
                        // res.set('refresh', '3;url=/login');
                    }
                } else {
                    conn.query('insert into user set ?', req.body, function(err, result) {
                        if (err) {
                            res.statusCode = 500;
                            res.send('error');
                            console.log('注册失败');
                        }
                        res.statusCode = 200;
                        if (result.affectedRows > 0) {
                            res.send('注册成功！');
                        } else {
                            res.send('fail');
                        }
                    })
                }
            }
        })
        // if (req.body.username == 'zs' && req.body.password == '123') {
        //     // req.session.user = { username: 'zs', password: '123', role: '超级管理员' };
        //     res.send(result.success('登录成功')) // {code:200,status:'success',data:''} 封装到了utils里
        // } else {
        //     console.log('post login');
        //     res.send(result.fail('用户名或密码错误'))
        // }
});
router.post('/article', function(req, res, next) {
    //获取post请求数据
    console.log('post:', req.body);
    conn.query('insert into article(title,content,date,id) values(?,?,now(),4)', [req.body.title, req.body.content], function(err, result) {
        console.log(result);
        if (err) {
            res.statusCode = 500;
            res.send('error');
            console.log(err);
        }
        res.statusCode = 200;
        if (result.affectedRows > 0) {
            res.send('发布success');
        } else {
            res.send('fail');
        }
    })
});
router.post('/post', function(req, res, next) {
    //获取post请求数据
    console.log('post:', req.body);
    console.log(req.cookies.user);
    if (req.cookies.user) {
        conn.query('insert into post(text,img,date,id) values(?,?,now(),?)', [req.body.text, req.body.img, req.cookies.user], function(err, result) {
            console.log(result);
            if (err) {
                res.statusCode = 500;
                console.log(err);
            }
            res.statusCode = 200;
            if (result.affectedRows > 0) {
                res.redirect('http://localhost:8080/Recommend');
                // res.render('http://localhost:8080/Recommend', { user: req.cookies.user })
            } else {
                res.send('fail');
            }
        })
    } else {
        res.send('请登录')
    }
});
router.get('/article', function(req, res) {
    console.log(req.query);
    conn.query("select *,DATE_FORMAT(date,'%Y-%m-%d  %H:%i:%s') nowdate from article where aid=" + req.query.aid, function(err, result) {
        console.log('111', result);
        res.render('article.ejs', { list: result })
    })
})
router.get('/self', function(req, res) {
    console.log(req.query);
    console.log(req.cookies);
    // console.log();
    console.log(JSON.stringify(req.cookies));
    var postList = [];
    conn.query("select pid,user.avater,user.nickname,img,text,DATE_FORMAT(date,'%Y-%m-%d  %H:%i:%s') nowdate from post,user where user.id=post.id and user.id=1", function(err, result) {
        if (err) {
            console.log(err);
            res.send(resultback.fail('请求数据失败！'));
        } else {
            result.forEach(item => {
                    postList.unshift(item);
                })
                // res.render('user/list', { list: postList })
            res.json(postList);
        }
    })
})
router.get('/self/del', function(req, res, next) {
    conn.query("delete from post where pid=" + req.query.pid, function(err, result) {
        if (err) {
            res.send('error删除失败')
        }
        res.redirect('http://localhost:8080/Self');
    })
});
router.post('/self/edit', function(req, res, next) {
    console.log('post:', req.body);
    console.log(req.cookies.user);
    if (req.cookies.user) {
        conn.query('update post set text=?,img=? where pid=?', [req.body.text, req.body.img, req.body.pid], function(err, result) {
            console.log(result);
            if (err) {
                res.statusCode = 500;
                console.log(err);
            }
            res.statusCode = 200;
            if (result.affectedRows > 0) {
                res.redirect('http://localhost:8080/Self');
            } else {
                res.send('fail');
            }
        })
    }
});
module.exports = router;
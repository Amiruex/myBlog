const result = require('../utils/result');
var session = require('express-session');
var { v4: uuidv4 } = require('uuid');

module.exports = function(app) {
    app.use(session({
            genid: function(req) {
                return uuidv4() // use UUIDs for session IDs
            },
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 60000 }
        }))
        //session过滤器（中间件）注需要放在静态资源后面
        // app.use(function (req, res, next) {
        //   if (!req.session.user && req.url != '/login') {
        //     res.redirect('/login');
        //   } else {
        //     if(req.session.user){
        //       res.locals.user = req.session.user;
        //     }
        //     next();
        //   }
        // })

    /* GET home page. */
    app.get('/', function(req, res, next) {
        res.redirect('/Home')
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.post('/login', function(req, res) {
        if (req.body.username == 'zs' && req.body.password == '123') {
            req.session.user = { username: 'zs', password: '123', role: '超级管理员' };
            res.send(result.success('登录成功')) // {code:200,status:'success',data:''} 封装到了utils里
        } else {
            res.send(result.fail('用户名或密码错误'))
        }
    });

    app.use('/backend', require('./backend'));

    // 404 page
    app.use(function(req, res) {
        if (!res.headersSent) {
            res.status(404).render('404')
        }
    })
}
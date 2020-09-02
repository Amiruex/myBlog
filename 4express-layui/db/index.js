const mysql = require('mysql');

const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '198627',
        database: 'base'
    })
    //数据连接创建号
conn.connect();

module.exports = conn
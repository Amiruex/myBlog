const conn = require('../db');

exports.findUsers = function(callback){
    conn.query(`select id,username,status,role,date_format( create_time, '%Y-%m-%d' ) create_time from user` ,callback);
}

exports.findUserByNameAndPsw = function (username,userpsw,callback){
    conn.query('select * from user where username=? and userpsw=?'
        ,[username,userpsw],callback
    );
}

exports.findUserById = function(id, callback){
    conn.query('select * from user where id=?',id,callback);
}

exports.findUserByName = function(name,cb){
    conn.query('select * from user where username=?',name,cb);
}
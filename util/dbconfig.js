// const mysql = require('mysql');
// module.exports = {
//     //数据库配置
//     config:{
//         host:'localhost',
//         port:'3306',
//         user:'root',
//         password:'sql846123',
//         database:'node_test'
//     },
//     //连接数据库  使用mysql的连接池连接方式
//     //连接池对象
//     sqlConnect:function(sql,sqlArr,callBack){
//         var pool = mysql.createPool(this.config)
//         pool.getConnection((err,conn)=>{
//             if(err) throw err;
//             //事件驱动回调
//             conn.query(sql,sqlArr,callBack);
//             //释放连接
//             conn.release();
//         })
//     },
//     SySqlConnect:function(sySql,sqlArr){
//         return new Promise((resolve,reject)=>{
//             var pool = mysql.createPool(this.config)
//             pool.getConnection((err,conn)=>{
//                 if(err) reject(err);
//
//                 //事件驱动回调
//                 conn.query(sySql,sqlArr,(err,data)=>{
//                     if(err) reject(err);
//                     resolve(data)
//                 });
//                 //释放连接
//                 conn.release();
//             })
//         }).catch(err=>{
//             throw(err);
//         })
//     }
// }

const config = {
    APP_PORT:3000,
    MYSQL_host:'localhost',
    MYSQL_user:'root',
    MYSQL_password:'sql846123',
    MYSQL_port:'3306',
    MYSQL_database:'node_test',
    MYSQL_waitForConnections:true,
    MYSQL_connectionLimit:10,
    MYSQL_queueLimit:0,
}
module.exports = config
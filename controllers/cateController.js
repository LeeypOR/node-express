const connections = require("../util/database.js");

//获取人员
getUser = async (req, res)=>{
    let sql = "select * from test1";
    let sqlArr = [];
    const [rows] = await connections.execute(sql,sqlArr)
    console.log(rows)
    if(rows.length > 0){
        res.send(rows)
    }
}


//获取指定分类的文章列表
getPostCate = (req,res)=>{
    let {id} = req.query;
    var sql = `select * from post where cate_id=?`;
    var sqlArr = [id];
    var callBack = (err,data)=>{
        if(err) return console.log("连接出错",err)
        res.send({data})
    }
    dbconfig.sqlConnect(sql,sqlArr,callBack);

}

module.exports = {
    getUser,
    getPostCate
}
var express = require('express');
var router = express.Router();
const con = require('../config/key');
const point = require('../model/pointModel');
var sql;
router.getIndex = (req,res,next)=>{
    sql = 'SELECT point.* , student.holyName ,student.firstName ,  student.lastName , student.studentCode , class.name from point,student,class,matchScholastic where student.id = point.idStudent and point.idmatchScholastic = matchScholastic.id and matchScholastic.idClass = class.id and student.status = 1';
    var pointAll=[];
    con.query(sql,function(err,rows,field){
        if(err)throw err
            else{
                
                rows.forEach(element => {
                    pointAll.push(new point(element.id,element.studentCode,element.holyName,element.lastName,element.firstName,element.oral1,element.oral2,element.prayer1,element.prayer2,element.test1,element.test2,element.endTerm,element.midTerm,element.name));

                });
                console.log(pointAll);
            }
            res.render('student/point',{pointAll: pointAll});
    })
    
}
router.postPoint = (req,res,next)=>{
    console.log("posstttt!!");
    console.log(req.body);
    sql = "UPDATE point SET ? = ? WHERE point.id = ?";
    con.query('UPDATE point SET '+req.body.name+ '= ? WHERE point.id = ?',[req.body.value,req.body.pk],function(err,rows,fiels){
        if(err) throw err;
        else {
            res.send('updated');
        }
    } )
    
    
}

module.exports = router;
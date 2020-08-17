var express = require('express');
var router = express.Router();
const con = require('../config/key');
const student = require('../model/studentModel');

router.getIndex = (req,res,next) =>{
    var studentAll = [];
        con.query('SELECT student.* , class.name from student,class where class.id = student.idClass and student.status = 1',function(err,rows,fields){
            if(err)throw err
            else{
                
                rows.forEach(element => {
                    studentAll.push(new student(element.studentCode,element.holyName,element.firstName,element.lastName,element.name,element.dadname,element.momname,element.dadphonenumber,element.momphonenumber,element.sex,element.birthday,element.confirmation,element.christen,element.status));

                });
                
            }
            res.render('student/all_student',{studentAll: studentAll});
        })
          
     
   
}

module.exports =router;
var express = require('express');
var router = express.Router();
const con = require('../config/key');
const room = require('../model/classModel');
const scholastic = require('../model/scholasticModel');
var currentDate = new Date;
var studentCode;

router.getIndex = (req,res,next)=>{
    con.query('SELECT * from class',function(err,rows,fields){
        if (err) throw err
        else {
            var roomAll=[];
            rows.forEach(element => {
                roomAll.push(new room(element.id,element.name,element.total));

            })
            con.query('SELECT * from scholastic', function(err,rows,fields){
                var scholasticAll=[];
                rows.forEach(element => {
                    scholasticAll.push(new scholastic(element.id,element.fromYear,element.toYear));
                })

                console.log(roomAll);
                
                
                res.render('student/add_student',{roomAll: roomAll,scholasticAll: scholasticAll, message: req.flash('addStudentMessage') });
            })
            
        }
    })
    
    
}


router.addStudent = (req, res, next) => {
    var holyName = req.body.holyname;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var address =  req.body.address;
    var birthday = req.body.birthday;
    var dadname = req.body.dadname;
    var momname = req.body.momname;
    var dadphonenumber = req.body.dadphonenumber;
    var momphonenumber = req.body.momphonenumber;
    var gender = req.body.gender;
    var christen = null;
    var confirmation = null;
    var idClass  = req.body.idClass;
    var idScholastic = req.body.idScholastic;
    var idSemester= req.body.idSemester;
    if(req.body.christen.length > 0)
        christen = req.body.christen;
    if(req.body.confirmation.length >0)
     confirmation = req.body.confirmation;
    console.log(req.body);


    con.query('SELECT MAX(RIGHT(studentCode, 5)) as number FROM student', function (err, rows, fields) {
        //Create studentCode
        if (err) throw err;
        else {
            let code = rows[0].number;
            let year = code.substr(0, 2)
            code = code.substr(2, 5);

            if (year == currentDate.getFullYear().toString().substr(2, 2)) {
                if (parseInt(code) < 9) {
                    studentCode = "HS" + year + "00" + (parseInt(code) + 1);
                }
                else if (parseInt(code) < 99) {
                    studentCode = "HS" + year + "0" + (parseInt(code) + 1);
                }
                else {
                    studentCode = "HS" + year + (parseInt(code) + 1);
                }


            }
            else {

                studentCode = "HS" + currentDate.getFullYear().toString().substr(2, 2) + "001";
            }
            //insert student
            console.log(studentCode);

            sql = "INSERT INTO `student` (`id`, `studentCode`, `holyName`, `firstName`, `lastName`, `idScholastic`, `idClass`, `idSemester`,`dadname`, `momname`, `dadphonenumber`, `momphonenumber`, `sex`, `birthday`, `confirmation`, `christen`, `status`) VALUES (NULL, ?, ?, ?, ?, ?, ?,1,?,?, ?,?,?,?, ?,?, ?)";
            con.query(sql,[studentCode,holyName,firstName,lastName,idScholastic,idClass,dadname,momname,dadphonenumber,momphonenumber,gender,birthday,confirmation,christen,1],function(err,rows,fields)
            {
                    if(err) throw err;
                    idStudent = rows.insertId;

                    
                    con.query('select * from matchScholastic where idClass = ? and idScholastic = ? and idSemester = ?',[idClass,idScholastic,idSemester],function(err,rows,fields){
                        console.log(rows);
                        if (rows.length > 0 )
                        {
                            con.query('insert into point (idStudent,idmatchScholastic) values (?,?)',[idStudent,rows[0].id]);
                        }
                        else{
                            con.query('insert into matchScholastic (idClass,idSemester,idScholastic) values (?,?,?)',[idClass,idSemester,idScholastic],function(err,rows,fields){
                                console.log(rows);
                                con.query('insert into point (idStudent,idmatchScholastic) values (?,?)',[idStudent,rows.insertId]);
                            });
                        
                    
                        }
                    })
                });
                    
            
            req.flash('addStudentMessage','Đã thêm học sinh: '+lastName+' '+firstName);
            res.redirect('/add-student');
        }
    })



}

module.exports = router;
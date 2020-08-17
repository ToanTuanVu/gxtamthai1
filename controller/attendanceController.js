var express = require('express');
var router = express.Router();
const con = require('../config/key');
const attendanceModel = require('../model/attemdaceModel');
const { Router, json } = require('express');
var sql;
const room = require('../model/classModel');

// router.getIndex = (req, res, next) => {
//     let idClass = 1;
//     if(req.query.idClass != undefined)
//     {
//         idClass = req.query.idClass;
//     }
//     // SELECT st.id , st.holyName    , st.lastName, st.firstName, att.* FROM `attendence` att, student st where st.id = att.idStudent ORDER BY st.firstName ASC
//     // get all class
//     con.query('SELECT * from class', function (err, rows, fields) {
//         let count = 0;
//         let roomAll = [];
//         let list = [];
//         if (err) throw err
//         else {

//             rows.forEach(element => {
//                 roomAll.push(new room(element.id, element.name, element.total));

//             })
//             //count day with idClass and sort by ASC 
//             con.query('SELECT att.idStudent, COUNT(att.idStudent) as "st"  FROM attendence att,student st WHERE st.idClass= ? and st.id=att.idStudent and st.status = 1 GROUP BY att.idStudent ORDER BY st ASC ', [idClass], function (err, rows, fields) {
//                 //if don't have student in that class
//                 if (rows.length < 1) {
//                     res.render('student/attendance', { count: count, list: list, roomAll: roomAll });
//                 }

//                 else {

//                     //get number of day
//                     count = rows[rows.length-1].st;
//                     let newStudentId = [];
//                     let oldStudentId=[]
//                     let listDay = [];
//                     //check and get  the student short attendance day
//                     // rows.forEach(element=>{
//                     //     if(element.st < count ) {
//                     //         newStudentId.push(element.idStudent);
//                     //         console.log(newStudentId);
//                     //     }
//                     // })
//                     // if (newStudentId.length > 0 )
//                     // {
//                     //     con.query('SELECT st.id , st.studentCode,st.holyName    , st.lastName, st.firstName,cl.name as "clName", DATE_FORMAT(att.date, "%M %d %Y") as date,att.point FROM `attendence` att, student st,class cl where st.id = att.idStudent and st.status =1  and cl.id = st.idClass and st.idClass = ? and att.idStudent = ? ORDER BY st.firstName ASC', [idClass,newStudentId], function (err, rows, fields) {
//                     //         console.log(rows);
//                     //     })
//                     // }
//                     // //if student of that class has enough day
//                     // else
//                     // {
//                     con.query('SELECT  DATE_FORMAT(att.date, "%M %d %Y") as date FROM `attendence` att, student st,class cl where st.id = att.idStudent and st.status =1 and cl.id = st.idClass and st.idClass = ? GROUP BY att.date',[idClass],function(err,rows,fields){
//                         listDay = rows;
//                         console.log(listDay);
//                         con.query('SELECT st.id , st.studentCode,st.holyName    , st.lastName, st.firstName,cl.name as "clName", DATE_FORMAT(att.date, "%M %d %Y") as date,att.point FROM `attendence` att, student st,class cl where st.id = att.idStudent and st.status =1  and cl.id = st.idClass and st.idClass = ? ORDER BY st.firstName ASC', [idClass], function (err, rows, fields) {
//                             list = rows;
//                             rows.forEach(function(element,index){

//                             })
//                             console.log(list);
//                             res.render('student/attendance', { count: count, list: list, roomAll: roomAll });


//                         })
//                     })

//                     // }
//                 }
//             })
//         }
//     })




// }
// //add attendace for 1 class not invalid
// router.addAttendance = (req, res, rext) => {
//     const idClass = req.body.idClass;
//     con.query('select CURDATE() as curDate', (err, rows, fields) => {

//         let currentDay = rows[0].curDate;
//         console.log(currentDay);
//         const date = new Date(currentDay);
//         const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })
//         const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)
//         currentDay = `${month} ${day} ${year}`;
//         console.log(currentDay)
//         con.query('select st.* from student st, attendence att where DATE_FORMAT(att.date,"%M %d %Y") = ? and st.idClass = ? and st.id = att.idStudent',[currentDay,idClass] ,function(err,rows,fields){
//             //check had attendance day
//             console.log(rows);
//             if(rows.length > 0)
//             {
//                 res.redirect('/attendance');
//             }
//             else
//             {
//                 con.query('SELECT st.id as idStudent, ms.id as idmatchScholastic from student st , matchScholastic ms WHERE st.idScholastic = ms.idScholastic and st.idSemester = ms.idSemester and st.id = ms.idStudent and st.status = 1 and st.idClass = ?', [idClass], function (err, rows, field) {
//                     console.log(rows);

//                     //check null rows student
//                     if (rows.length > 0) {


//                         let newSqls = [];
//                         rows.forEach(function (element, index) {
//                             newSqls.push(new Array(element.idStudent, element.idmatchScholastic));
//                         });
//                         console.log(newSqls);
//                         // res.json({ msg: 'abc' });

//                         con.query('INSERT INTO `attendence` (idStudent,idmatchScholastic) VALUES ?', [newSqls], function (err, rows, fields) {
//                             if (err) throw err
//                             else {
//                                 console.log(rows);

//                                 res.redirect('/attendance');
//                             }

//                         })
//                     } else {
//                         res.redirect('/attendance');
//                     }



//                 })
//             }

//         })
//     })




// }

// router.postAttendance = (req, res, next) => {
//     console.log("posstttt!!");
//     console.log(req.body);
//     //SELECT * FROM `attendence` WHERE DATE_FORMAT(date,"%M %d %Y")= "August 04 2020"
//     con.query('UPDATE attendence SET point = ? WHERE DATE_FORMAT(date,"%M %d %Y") = ? and idStudent = ?', [req.body.value, req.body.name, req.body.pk], function (err, rows, fiels) {
//         if (err) throw err;
//         else {
//             res.send('updated');
//         }
//     })

// }

router.getIndex = (req, res, next) => {
    let idClass = 1;
    if (req.query.idClass != undefined) {
        idClass = req.query.idClass;
    }
    con.query('SELECT * from class', function (err, rows, fields) {
        let roomAll = [];

        let listDay = [];
        let studentAll = [];
        rows.forEach(element => {
            roomAll.push(new room(element.id, element.name, element.total));

        })

        con.query('SELECT att.id as attID, st.studentCode,st.holyName    , st.lastName, st.firstName,cl.name as "clName",att.point FROM `attendence` att, student st,class cl where st.id = att.idStudent and st.status =1  and cl.id = st.idClass and st.idClass = ? ORDER BY st.firstName ASC', [idClass], function (err, rows, fields) {
            console.log(rows);
            if (rows.length > 0) {
                rows.forEach(element => {
                    studentAll = rows;
                    listDay.push(JSON.parse(element.point));
                    console.log(listDay);
                })
                console.log(listDay[0][0].date);
                res.render('student/attendance', { listDay: listDay, studentAll: studentAll, roomAll: roomAll });
            }
            else {
                res.render('student/attendance', { listDay: listDay, studentAll: studentAll, roomAll: roomAll });
            }




        })


    })

}
router.addAttendance = (req, res, next) => {
    let check = 0;
    const idClass = req.body.idClass;
    const date = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)
    currentDay = `${month} ${day} ${year}`;
    console.log(currentDay);
    //get all student from class
    con.query('SELECT st.id as idStudent, ms.id as idmatchScholastic from student st , matchScholastic ms WHERE st.idScholastic = ms.idScholastic and st.idSemester = ms.idSemester and st.status = 1 and ms.idClass = ?', [idClass], async function (err, rows, field) {

        let newSqls = [];
        const dataInsert = {
            date: currentDay,
            point: null
        };
        let dataOj = [];
        //dataOj.push(dataInsert);
        let dataJS;
        console.log(dataJS);
        const studentAll = rows;
        await studentAll.forEach(function (student, index) {
            //get attendence of id student and sholastic
            con.query('SELECT * from attendence where idStudent = ? and idmatchScholastic = ?', [student.idStudent, student.idmatchScholastic], function (err, rows, fields) {
                //if it doesn't have attendance
                if (rows.length > 0) {
                    
                    rows.forEach(element => {
                        //get point with date of 1 student
                        const pointAll = JSON.parse(element.point);
                        pointAll.forEach(point => {
                            //check it has a currenday(add attendance already)
                            if (point.date == currentDay) {

                                check =1;
                                return;
                            }
                        })
                        if(check){
                            return;
                        }
                        dataOj = pointAll;
                        dataOj.push(dataInsert);
                        dataJS = JSON.stringify(dataOj);
                        con.query('update attendence SET point = ? where id = ?', [dataJS, element.id]);
                    })

                }
                else {
                    dataOj.push(dataInsert);
                    dataJS = JSON.stringify(dataOj);
                    con.query('INSERT INTO `attendence` (idStudent,idmatchScholastic,point) VALUES (?,?,?)', [student.id, student.idmatchScholastic, dataJS]);
                }
            })
            if(check)
            {return;}
        })
        // rows.forEach(function (element, index) {
        //     newSqls.push(new Array(element.idStudent, element.idmatchScholastic,dataJS));
        // });
        // console.log(newSqls);
        // res.json({ msg: 'abc' });

        // con.query('INSERT INTO `attendence` (idStudent,idmatchScholastic,point) VALUES (?,?,?)', [], function (err, rows, fields) {
        //     if (err) throw err
        //     else {
        //         console.log(rows);

        //         res.redirect('/attendance');
        //     }

        // })
        res.redirect('/attendance?idClass='+idClass);
    })

}
router.postAttendance = (req, res, next) => {
    console.log("posstttt!!");
        console.log(req.body);
        const pointUpdate = req.body.value;
        const date = req.body.name;
        const id = req.body.pk;
        var sql="";
        var temp;
        //SELECT * FROM `attendence` WHERE DATE_FORMAT(date,"%M %d %Y")= "August 04 2020"
        con.query('SELECT * from attendence where id = ?',[id],function(err,rows,fields){
            let point = JSON.parse(rows[0].point);
            point.forEach(element=>{
                if(element.date == date){
                    element.point = pointUpdate;
                    return;
                }
            })
            let dataJS = JSON.stringify(point);
            console.log(sql);
            con.query('UPDATE attendence SET point = ? WHERE id = ?', [dataJS,id]);
            res.send('updated');
        })
        
}
module.exports = router;
var express = require('express');
var router = express.Router();
const homeController = require('../controller/homeController');
const allStudentController = require('../controller/all_studentsController');
const addStudentController = require('../controller/add_studentController');
const pointController = require('../controller/pointController');

const attendanceController =require('../controller/attendanceController');


/* GET home page. */
router.get('/', homeController.getIndex);
router.get('/login',homeController.login);
router.post('/login',homeController.postLogin);
router.get('/all-students',allStudentController.getIndex);
router.get('/add-student',addStudentController.getIndex);
router.get('/point',pointController.getIndex);
router.get('/attendance',attendanceController.getIndex);
router.get('/attendance/:idClass',attendanceController.getIndex);



//Post 
router.post('/add-student',addStudentController.addStudent);
router.post('/post-point',pointController.postPoint);
router.post('/post-attendance',attendanceController.postAttendance);
router.post('/add-attendance',attendanceController.addAttendance);

module.exports = router;

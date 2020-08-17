const student = function(studentCode, holyName,firstName, lastName, room, dadName,momName,dadPhonenumber,momPhonenumber,sex, birthday,confirmation,christen,status)

{
    this.studentCode = studentCode;
    this.holyName = holyName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.room = room;
    this.dadName = dadName;
    this.momName = momName;
    this.dadPhonenumber = dadPhonenumber;
    this.momPhonenumber = momPhonenumber;
    this.sex = sex;
    this.birthday = birthday;
    this.confirmation = confirmation;
    this.christen = christen;
    this.status = status;
}
module.exports = student;
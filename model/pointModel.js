const point = function(id,studentCode,holyName,lastName,firstName,oral1,oral2,prayer1,prayer2,test1,test2,endTerm,midTerm,room)
{
    this.id =id;
    this.studentCode =studentCode;
    this.holyName = holyName;
    this.lastName = lastName;
    this.firstName = firstName;
    this.oral1 = oral1;
    this.oral2 = oral2;
    this.prayer1 = prayer1;
    this.prayer2 =prayer2;
    this.test1 = test1;
    this.test2 = test2;
    this.endTerm = endTerm;
    this.midTerm = midTerm;
    this.room = room;
    
}
module.exports = point;
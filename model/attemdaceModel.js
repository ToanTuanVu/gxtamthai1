const db = require('../config/db');

module.exports = {
  add: entity => {
    return db.add(entity, 'attendance');
  },
  findByOne: (field, value) => { db.load(`select * from attendace where ${field} = ${value}`) },
  delete: (entity) => {
    return db.delete(entity, "attendance");
  },
  updateByOne: (field, value, entity) => {

    return db.update("attendance", field, value, entity);
  },

};
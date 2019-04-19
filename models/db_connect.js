const sqlite3 = require('sqlite3').verbose();

class Database {

  constructor(file) {
    this.db = new sqlite3.Database(file, (err) => {
      if (err)
        console.error('Could not connect to the database: ' + err.message);
      console.log('Connected to the database.');
    });
  }

  run(sql, params=[]) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  get(sql, params=[]) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    })
  }

  all(sql, params=[]) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    })
  }

}

module.exports = Database;

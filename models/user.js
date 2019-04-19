const passwordUtils = require('../utils/password_utils');

class User {

  constructor(db) {
    this.db = db;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        firstName TEXT,
        lastName TEXT,
        email TEXT
      )
    `
    return new Promise(function(resolve, reject) {
      return this.db.run(sql);
    });
  }

  create(username, password, firstName, lastName, email) {
    return new Promise(function(resolve, reject) {
      passwordUtils.cryptPassword(password, (err, hash) => {
        if (err) return reject("Could not hash password: " + err.message);
        const sql = `INSERT INTO user (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)`
        this.db.run(sql, [username, hash, firstName, lastName, email])
          .then(() => resolve())
          .catch((err) => reject(err));
      });
    });;
  }

  // update, delete

  find(username) {
    const sql = `SELECT * FROM user WHERE username = ?`;
    return this.db.get(sql, [username]);
  }

  connect(username, password) {
    const sql = `SELECT * FROM user WHERE username = ?`;
    return new Promise(function(resolve, reject) {
      this.db.get(sql, [username])
        .then((result) => {
          passwordUtils.comparePassword(password, result.password, (err, match) => {
            if (err) return reject("Could not compare password: " + err.message);
            else if (!match) return reject("Wrong password for user: " + username);
            else return resolve();
          });
        })
        .catch((err) => reject("Could not find user " + username));
    });
  }

}

module.exports = User;

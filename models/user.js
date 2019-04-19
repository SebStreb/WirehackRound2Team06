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
    const sql = `INSERT INTO user (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)`
    return this.db.run(sql, [username, password, firstName, lastName, email]);
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
          if (result.password != password)
            reject("Wrong password for user " + username);
          resolve();
        })
        .catch((err) => reject("Could not find user " + username));
    });
  }

}

module.exports = User;

class Review {

  constructor(db) {
    this.db = db;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS review (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        user_from TEXT NOT NULL,
        user_to TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        FOREIGN KEY (user_from) REFERENCES user(id),
        FOREIGN KEY (user_to) REFERENCES user(id)
      )
    `
    return this.db.run(sql);
  }

  create(date, from, to, rating, comment) {
    const sql = `INSERT INTO review (date, user_from, user_to, rating, comment) VALUES (?, ?, ?, ?, ?)`
    return this.db.run(sql, [date, from, to, rating, comment]);
  }

  // update, delete

  of(user) { //Find all review made to an user
    const sql = `SELECT * FROM review WHERE user_to = ?`;
    return this.db.all(sql, [user]);
  }

}

module.exports = Review;

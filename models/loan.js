class Loan {

  constructor(db) {
    this.db = db;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS loan (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_start TEXT,
        date_end TEXT,
        interest_rate INTEGER,
        amount REAL,
        loaner INTEGER,
        credits INTEGER,
        FOREIGN KEY(loaner) REFERENCES user(id),
        FOREIGN KEY(credits) REFERENCES user(id)

      )
    `
    return new Promise(function(resolve, reject) {
      return this.db.run(sql);
    });
  }

  create(date_end, date_start, interest_rate, amount, loaner, credits) {
    const sql = `INSERT INTO loan (date_end, date_start, interest_rate, amount, loaner, credits) VALUES (?, ?, ?, ?, ?, ?)`
    return this.db.run(sql, [date_end, date_start, interest_rate, amount, loaner, credits]);
  }

  // update, delete

  find(id_loan) {
    const sql = `SELECT * FROM loan WHERE id = ?`;
    return this.db.get(sql, [id_loan]);
  }

}

module.exports = Loan;

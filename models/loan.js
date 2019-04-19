class Loan {

  constructor(db) {
    this.db = db;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS loan (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_start TEXT NOT NULL,
        date_end TEXT NOT NULL,
        interest_rate INTEGER NOT NULL,
        amount REAL NOT NULL,
        loaner INTEGER NOT NULL,
        credits INTEGER NOT NULL,
        FOREIGN KEY (loaner) REFERENCES user(id),
        FOREIGN KEY (credits) REFERENCES user(id)
      )
    `
    return this.db.run(sql);
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

  from_user(id_user) {
    const sql = `SELECT * FROM loan WHERE loaner = ?`;
    return this.db.all(sql, [id_user]);
  }

}

module.exports = Loan;

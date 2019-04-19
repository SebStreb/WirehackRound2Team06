class Payment {

  constructor(db) {
    this.db = db;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS payment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        amount REAL NOT NULL,
        id_loan INTEGER NOT NULL,
        FOREIGN KEY(id_loan) REFERENCES loan(id)

      )
    `
    return new Promise(function(resolve, reject) {
      return this.db.run(sql);
    });
  }

  create(date, amount, id_loan) {
    const sql = `INSERT INTO payment (date, amount, id_loan) VALUES (?, ?, ?)`
    return this.db.run(sql, [date, amount, id_loan]);
  }

  // update, delete

  find(id_payment) {
    const sql = `SELECT * FROM payment WHERE id = ?`;
    return this.db.get(sql, [id_payment]);
  }

}

module.exports = Payment;

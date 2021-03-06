class Proposal {

  constructor(db) {
    this.db = db;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS proposal (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        interest INTEGER NOT NULL,
        finalDate TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id)
      )
    `
    return this.db.run(sql);
  }

  create(user_id, amount, interest, finalDate) {
    const sql = `INSERT INTO proposal (user_id, amount, interest, finalDate) VALUES (?, ?, ?, ?)`
    return this.db.run(sql, [user_id, amount, interest, finalDate]);
  }

  // update, delete

  find(id) {
    const sql = `SELECT * FROM proposal WHERE id = ?`;
    return this.db.get(sql, [id]);
  }

  all(){
    const sql = `SELECT * FROM proposal`;
    return this.db.all(sql, []);
  }

  best(amount) {
    const sql = `SELECT * FROM proposal WHERE amount >= ? ORDER BY interest`;
    return this.db.all(sql, [amount]);
  }

  from_user(user_id) {
    const sql = `SELECT * FROM proposal WHERE user_id = ?`;
    return this.db.all(sql, [user_id]);
  }

  del(id) {
    const sql = `DELETE FROM proposal WHERE id = ?`;
    return this.db.run(sql, [id]);
  }

}

module.exports = Proposal;

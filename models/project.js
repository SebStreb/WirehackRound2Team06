class Project {

  constructor(db) {
    this.db = db;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        demand REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        project_url TEXT,
        user_id INTEGER NOT NULL,
        risk INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id)
      )
    `
    return this.db.run(sql);
  }

  create(demand, description, image_url, project_url, user_id, title) {
    const risk = (Math.random() * (3) ) << 0;
    const sql = `INSERT INTO project (demand, description, image_url, project_url, user_id, title, risk) VALUES (?, ?, ?, ?, ?, ?, ?)`
    return this.db.run(sql, [demand, description, image_url, project_url, user_id, title, risk]);
  }

  // update, delete

  all() {
    const sql = `SELECT * FROM project`;
    return this.db.all(sql);
  }

  get(id_project) {
    const sql = `SELECT * FROM project WHERE id = ?`;
    return this.db.get(sql, [id_project]);
  }

  from_user(id_user) {
    const sql = `SELECT * FROM project WHERE user_id = ?`;
    return this.db.all(sql, [id_user]);
  }

  del(id) {
    const sql = `DELETE FROM project WHERE id = ?`;
    return this.db.run(sql, [id]);
  }

}

module.exports = Project;

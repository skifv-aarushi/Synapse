import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'synapse.db');

let db;

function wrapDb(database) {
  return {
    run(sql, params = []) {
      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) return reject(err);
          resolve(this);
        });
      });
    },
    get(sql, params = []) {
      return new Promise((resolve, reject) => {
        database.get(sql, params, (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    },
    all(sql, params = []) {
      return new Promise((resolve, reject) => {
        database.all(sql, params, (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
    }
  };
}

export async function initDatabase() {
  const rawDb = new sqlite3.Database(dbPath);
  db = wrapDb(rawDb);

  await db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      task_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(task_id) REFERENCES tasks(id)
    );
  `);

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  return db;
}

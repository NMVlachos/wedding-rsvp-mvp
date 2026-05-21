import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DB_PATH ?? path.join(__dirname, '..', 'data', 'rsvp.db');

const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS guests (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name   TEXT    NOT NULL,
    last_name    TEXT    NOT NULL,
    invite_code  TEXT    NOT NULL UNIQUE CHECK(length(invite_code) = 4),
    is_admin     INTEGER NOT NULL DEFAULT 0,
    created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    invite_code  TEXT    NOT NULL UNIQUE,
    first_name   TEXT    NOT NULL,
    attending    TEXT    NOT NULL CHECK(attending IN ('yes', 'no')),
    diet         TEXT             CHECK(diet IN ('none', 'vegetarian', 'vegan')),
    song         TEXT,
    created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

export default db;

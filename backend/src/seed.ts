import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DB_PATH ?? path.join(__dirname, '..', 'data', 'rsvp.db');
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');

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

const insert = db.prepare(
  `INSERT OR IGNORE INTO guests (first_name, last_name, invite_code, is_admin)
   VALUES (@first_name, @last_name, @invite_code, @is_admin)`
);

// ─── EDIT THIS LIST ───────────────────────────────────────────────────────────
const guests = [
  // Admin accounts (can view all RSVPs)
  { first_name: 'Admin',     last_name: 'One',       invite_code: 'K7M2', is_admin: 1 },
  { first_name: 'Admin',     last_name: 'Two',       invite_code: 'R4W9', is_admin: 1 },

  // Wedding guests
  { first_name: 'James',     last_name: 'Anderson',  invite_code: 'B3NX', is_admin: 0 },
  { first_name: 'Olivia',    last_name: 'Bennett',   invite_code: '7PH4', is_admin: 0 },
  { first_name: 'William',   last_name: 'Carter',    invite_code: 'W2KQ', is_admin: 0 },
  { first_name: 'Sophia',    last_name: 'Davis',     invite_code: '9FT6', is_admin: 0 },
  { first_name: 'Henry',     last_name: 'Edwards',   invite_code: 'M5VD', is_admin: 0 },
  { first_name: 'Isabella',  last_name: 'Foster',    invite_code: '3LY8', is_admin: 0 },
  { first_name: 'Charles',   last_name: 'Greene',    invite_code: 'C6RJ', is_admin: 0 },
  { first_name: 'Amelia',    last_name: 'Harris',    invite_code: '4ZB1', is_admin: 0 },
  { first_name: 'George',    last_name: 'Irving',    invite_code: 'H9GN', is_admin: 0 },
  { first_name: 'Charlotte', last_name: 'James',     invite_code: 'X7PM', is_admin: 0 },
  { first_name: 'Thomas',    last_name: 'Knight',    invite_code: '2SWK', is_admin: 0 },
  { first_name: 'Evelyn',    last_name: 'Lane',      invite_code: '6EF3', is_admin: 0 },
  { first_name: 'Arthur',    last_name: 'Mason',     invite_code: 'T4DV', is_admin: 0 },
  { first_name: 'Harper',    last_name: 'Nelson',    invite_code: '8YN5', is_admin: 0 },
  { first_name: 'Frederick', last_name: 'Parker',    invite_code: 'J1QB', is_admin: 0 },
  { first_name: 'Violet',    last_name: 'Quinn',     invite_code: 'P7CH', is_admin: 0 },
  { first_name: 'Edmund',    last_name: 'Russell',   invite_code: '5RK2', is_admin: 0 },
  { first_name: 'Penelope',  last_name: 'Scott',     invite_code: 'D3MX', is_admin: 0 },
  { first_name: 'Leonard',   last_name: 'Taylor',    invite_code: '9WF6', is_admin: 0 },
  { first_name: 'Clara',     last_name: 'Underhill', invite_code: 'L4TN', is_admin: 0 },
  { first_name: 'Walter',    last_name: 'Vaughn',    invite_code: 'B8ZV', is_admin: 0 },
  { first_name: 'Cecilia',   last_name: 'Walsh',     invite_code: '7GH1', is_admin: 0 },
  { first_name: 'Edward',    last_name: 'Young',     invite_code: 'N2PK', is_admin: 0 },
  { first_name: 'Margaret',  last_name: 'Zimmer',    invite_code: '4XD9', is_admin: 0 },
  { first_name: 'Philip',    last_name: 'Archer',    invite_code: 'W6FM', is_admin: 0 },
  { first_name: 'Rose',      last_name: 'Blake',     invite_code: '3CB5', is_admin: 0 },
  { first_name: 'Alfred',    last_name: 'Burns',     invite_code: 'K9LR', is_admin: 0 },
  { first_name: 'Lillian',   last_name: 'Cole',      invite_code: 'Y2TJ', is_admin: 0 },
  { first_name: 'Raymond',   last_name: 'Drake',     invite_code: '8NH4', is_admin: 0 },
  { first_name: 'Ada',       last_name: 'Ellis',     invite_code: 'P5BW', is_admin: 0 },
  { first_name: 'Herbert',   last_name: 'Flynn',     invite_code: '6DM3', is_admin: 0 },
  { first_name: 'Beatrice',  last_name: 'Grant',     invite_code: 'R1VK', is_admin: 0 },
  { first_name: 'Stanley',   last_name: 'Holt',      invite_code: 'C7WX', is_admin: 0 },
  { first_name: 'Mabel',     last_name: 'Ingram',    invite_code: 'J4FN', is_admin: 0 },
  { first_name: 'Reginald',  last_name: 'Jennings',  invite_code: '9GP2', is_admin: 0 },
  { first_name: 'Edith',     last_name: 'Kirby',     invite_code: 'T8BH', is_admin: 0 },
  { first_name: 'Clifford',  last_name: 'Lawson',    invite_code: '5KY6', is_admin: 0 },
  { first_name: 'Agnes',     last_name: 'Morton',    invite_code: 'M3QR', is_admin: 0 },
  { first_name: 'Edgar',     last_name: 'Nash',      invite_code: 'L9ZD', is_admin: 0 },
  { first_name: 'Ruth',      last_name: 'Norris',    invite_code: '2FX7', is_admin: 0 },
  { first_name: 'Percival',  last_name: 'Pierce',    invite_code: 'W4PB', is_admin: 0 },
  { first_name: 'Winifred',  last_name: 'Preston',   invite_code: 'H6NK', is_admin: 0 },
  { first_name: 'Rupert',    last_name: 'Reid',      invite_code: '8TM1', is_admin: 0 },
  { first_name: 'Mildred',   last_name: 'Shaw',      invite_code: 'B5GV', is_admin: 0 },
  { first_name: 'Malcolm',   last_name: 'Stone',     invite_code: 'D2RX', is_admin: 0 },
  { first_name: 'Harriet',   last_name: 'Sutton',    invite_code: '9CW4', is_admin: 0 },
  { first_name: 'Basil',     last_name: 'Turner',    invite_code: 'Y7JL', is_admin: 0 },
  { first_name: 'Constance', last_name: 'Vance',     invite_code: 'K3FB', is_admin: 0 },
  { first_name: 'Cecil',     last_name: 'Warren',    invite_code: 'P6NH', is_admin: 0 },
  { first_name: 'Sylvia',    last_name: 'Webb',      invite_code: '4MZ8', is_admin: 0 },
  { first_name: 'Archibald', last_name: 'West',      invite_code: 'R2DK', is_admin: 0 },
  { first_name: 'Florence',  last_name: 'Wheeler',   invite_code: 'T5VY', is_admin: 0 },
  { first_name: 'Mortimer',  last_name: 'White',     invite_code: '6BXG', is_admin: 0 },
  { first_name: 'Ethel',     last_name: 'Wilkins',   invite_code: 'J9WC', is_admin: 0 },
  { first_name: 'Cornelius', last_name: 'Wood',      invite_code: 'N4HF', is_admin: 0 },
  { first_name: 'Doris',     last_name: 'Wright',    invite_code: '3PM7', is_admin: 0 },
  { first_name: 'Alistair',  last_name: 'York',      invite_code: 'W8ZB', is_admin: 0 },
  { first_name: 'Gertrude',  last_name: 'Adams',     invite_code: 'L1KR', is_admin: 0 },
  { first_name: 'Barnaby',   last_name: 'Barton',    invite_code: 'C4YX', is_admin: 0 },
  { first_name: 'Hilda',     last_name: 'Bishop',    invite_code: '8DG5', is_admin: 0 },
  { first_name: 'Desmond',   last_name: 'Bradley',   invite_code: 'H7MN', is_admin: 0 },
  { first_name: 'Vera',      last_name: 'Brady',     invite_code: '2VBK', is_admin: 0 },
  { first_name: 'Nora',      last_name: 'Briggs',    invite_code: 'T9RF', is_admin: 0 },
  { first_name: 'Godfrey',   last_name: 'Brooks',    invite_code: '6ZWJ', is_admin: 0 },
  { first_name: 'Ida',       last_name: 'Bryant',    invite_code: 'B4HD', is_admin: 0 },
  { first_name: 'Horace',    last_name: 'Buckley',   invite_code: 'P3KG', is_admin: 0 },
  { first_name: 'Iris',      last_name: 'Burgess',   invite_code: '9XCN', is_admin: 0 },
  { first_name: 'Aubrey',    last_name: 'Burton',    invite_code: '5FMY', is_admin: 0 },
  { first_name: 'Enid',      last_name: 'Butler',    invite_code: 'K2LB', is_admin: 0 },
  { first_name: 'Jasper',    last_name: 'Campbell',  invite_code: 'D8RV', is_admin: 0 },
  { first_name: 'Muriel',    last_name: 'Carr',      invite_code: '7GWZ', is_admin: 0 },
  { first_name: 'Lionel',    last_name: 'Chapman',   invite_code: 'M4BN', is_admin: 0 },
  { first_name: 'Elsie',     last_name: 'Church',    invite_code: 'R6XH', is_admin: 0 },
  { first_name: 'Hubert',    last_name: 'Clark',     invite_code: '3YKC', is_admin: 0 },
  { first_name: 'Lottie',    last_name: 'Clarke',    invite_code: 'W5FD', is_admin: 0 },
  { first_name: 'Phineas',   last_name: 'Clay',      invite_code: 'T1NP', is_admin: 0 },
  { first_name: 'Kitty',     last_name: 'Clayton',   invite_code: '8MBK', is_admin: 0 },
  { first_name: 'Bertram',   last_name: 'Clifton',   invite_code: 'J3WG', is_admin: 0 },
  { first_name: 'Prudence',  last_name: 'Cobb',      invite_code: 'L7HX', is_admin: 0 },
  { first_name: 'Aldous',    last_name: 'Cochran',   invite_code: '9DRF', is_admin: 0 },
  { first_name: 'Lavinia',   last_name: 'Coffey',    invite_code: 'C5YN', is_admin: 0 },
  { first_name: 'Erasmus',   last_name: 'Collier',   invite_code: 'B2KM', is_admin: 0 },
  { first_name: 'Rowena',    last_name: 'Collins',   invite_code: '6PFT', is_admin: 0 },
  { first_name: 'Thaddeus',  last_name: 'Connell',   invite_code: 'H4VW', is_admin: 0 },
  { first_name: 'Tabitha',   last_name: 'Conway',    invite_code: '7ZBD', is_admin: 0 },
  { first_name: 'Horatio',   last_name: 'Cook',      invite_code: 'N8GJ', is_admin: 0 },
  { first_name: 'Millicent', last_name: 'Cooke',     invite_code: 'K9XR', is_admin: 0 },
  { first_name: 'Cyrus',     last_name: 'Cooley',    invite_code: '3FBL', is_admin: 0 },
  { first_name: 'Wilhelmina', last_name: 'Cooper',   invite_code: 'P4DM', is_admin: 0 },
  { first_name: 'Algernon',  last_name: 'Corbett',   invite_code: 'W7YC', is_admin: 0 },
  { first_name: 'Clementine', last_name: 'Corey',    invite_code: '2HKN', is_admin: 0 },
  { first_name: 'Ptolemy',   last_name: 'Cotter',    invite_code: '9BFX', is_admin: 0 },
  { first_name: 'Araminta',  last_name: 'Cowan',     invite_code: 'T6MR', is_admin: 0 },
  { first_name: 'Ignatius',  last_name: 'Cox',       invite_code: 'L3WP', is_admin: 0 },
  { first_name: 'Josephine', last_name: 'Craig',     invite_code: 'D5GK', is_admin: 0 },
  { first_name: 'Leopold',   last_name: 'Crawford',  invite_code: '8YNH', is_admin: 0 },
  { first_name: 'Sophronia', last_name: 'Croft',     invite_code: 'J7BR', is_admin: 0 },
  { first_name: 'Reginald',  last_name: 'Brennan',   invite_code: 'C4KF', is_admin: 0 },
  { first_name: 'Bertrand',  last_name: 'Cross',     invite_code: '6RXP', is_admin: 0 },
  { first_name: 'Miriam',    last_name: 'Dalton',    invite_code: 'V9MT', is_admin: 0 },
];
// ─────────────────────────────────────────────────────────────────────────────

const insertMany = db.transaction(() => {
  let inserted = 0;
  for (const g of guests) {
    const info = insert.run(g);
    if (info.changes > 0) inserted++;
  }
  return inserted;
});

const count = insertMany();
console.log(`Seed complete: ${count} new guests inserted (${guests.length - count} already existed).`);

db.close();

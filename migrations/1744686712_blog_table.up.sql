-- Write your up sql migration here

CREATE TABLE blog (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  resume TEXT,
  thumbnail TEXT,
  slug TEXT NOT NULL,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  author TEXT NOT NULL
);
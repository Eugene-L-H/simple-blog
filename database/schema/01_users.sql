DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  user_name TEXT PRIMARY KEY NOT NULL,
  user_password TEXT NOT NULL
);
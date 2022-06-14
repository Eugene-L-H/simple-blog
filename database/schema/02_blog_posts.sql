DROP TABLE IF EXISTS blog_posts CASCADE;

CREATE TABLE blog_posts (
  ID SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  -- author TEXT NOT NULL,
  author TEXT REFERENCES users (user_name),
  content TEXT NOT NULL,
  post_date DATE NOT NULL
);
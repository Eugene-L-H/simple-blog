DROP TABLE IF EXISTS blog_posts CASCADE;

CREATE TABLE blog_posts (
  ID SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  post_date DATE NOT NULL
);
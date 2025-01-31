create table if not exists users (
  id VARCHAR(255) primary key,
  username VARCHAR(255) unique ,
  email VARCHAR(255) unique not null,
  password VARCHAR(255) not null
);

select * from users;
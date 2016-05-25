create table ValidUsers (
  id varchar(100) not null unique,
  mail varchar(255) not null unique,
  password_hash varchar(100) not null,
  solt varchar(100) not null,
  createdAt datetime not null,
  primary key (id)
);

create table Users (
  id int not null unique auto_increment,
  mail varchar(255) not null unique,
  password_hash varchar(100) not null,
  solt varchar(100) not null,
  primary key (id)
);

create table Problems (
  id int not null unique auto_increment,
  body text not null,
  memo text,
  resolved boolean not null default false,

  primary key (id)
);

create table Revelations (
  id int not null unique auto_increment,
  pid int not null,
  body text not null,

  primary key (id)
);


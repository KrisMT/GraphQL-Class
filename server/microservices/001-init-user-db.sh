#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE SCHEMA users
    AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS users.users
(
    id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    username character varying(50) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    roles text[] COLLATE pg_catalog."default",
    permissions text[] COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE users.users
    OWNER to postgres;

INSERT INTO users.users(
	id, username, email, password, roles, permissions)
	VALUES (1, 'Test1', 'alice@email.com', 'pAsSWoRd!', '{admin}', '{read:any_account, read:own_account}');
INSERT INTO users.users(
	id, username, email, password, roles, permissions)
	VALUES (2, 'Test2', 'bob@email.com', 'pAsSWoRd!', '{subscriber}', '{read:own_account}');
INSERT INTO users.users(
	id, username, email, password, roles, permissions)
	VALUES (3, 'Test3', 'char@email.com', 'pAsSWoRd!', '{subscriber}', '{read:own_account}');
EOSQL

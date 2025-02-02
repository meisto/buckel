-- author: meisto
-- date: 2025-02-02 19:49:24
-- NOTE: This is very bare code and not at all secure. Please adjust database security for your
-- own usecase.

CREATE DATABASE task_runner;

-- Replace password here. Must be consistent with passwords given in env files.
CREATE USER task_runner WITH PASSWORD 'password';

-- Make the new user owner of the database.
ALTER DATABASE task_runner OWNER TO task_runner;



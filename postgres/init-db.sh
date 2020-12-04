#!/bin/bash

psql --username "postgres" --dbname "postgres" <<-EOSQL
    CREATE ROLE delta WITH LOGIN PASSWORD '$POSTGRES_DELTA_PASSWORD';
    CREATE DATABASE delta;
    CREATE DATABASE delta_shadow;
    GRANT ALL PRIVILEGES ON DATABASE delta TO delta;
    GRANT ALL PRIVILEGES ON DATABASE delta_shadow TO delta;
EOSQL

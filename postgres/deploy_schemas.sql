-- deploy fresh database tables
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/listings.sql'
\i '/docker-entrypoint-initdb.d/tables/messages.sql'


# Supabase Docker

This is a minimal Docker Compose setup for self-hosting Supabase. Follow the steps [here](https://supabase.com/docs/guides/hosting/docker) to get started.

### An error ou might encounter

the vector-db or the db container might be unhealthy cause they can't find pg_notify or vector.yml is a file not a directory.

A manual workaround that worked for me was deleting the volumes, the recreating manually the pg_notify then docker compose down then docker compose up -d again then it worked:

```
mkdir -p ./volumes/db/data/pg_notify
sudo chown 999:999 ./volumes/db/data/pg_notify
sudo chmod 700 ./volumes/db/data/pg_notify

docker compose down
docker compose up -d
```

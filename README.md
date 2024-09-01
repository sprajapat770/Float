docker compose up -d
docker images
docker exec -ti node-postgres-postgresdb-1 /bin/bash
https://www.bezkoder.com/docker-compose-nodejs-postgres/
psql bezkoder_db postgres
SELECT * FROM tutorials;
docker compose down
docker compose down --rmi all
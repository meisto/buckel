compose:
   sudo docker compose \
      -f docker/compose.yml \
      --env-file docker/ollama.env \
      --env-file docker/postgres.env \
      up


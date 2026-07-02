#!/bin/bash
# ===== Deployment Script ==============================================================

mv resources/config/ssl.conf resources/config/ssl.conf.disabled

docker compose up -d

DOMAIN=one-coder.com
EMAIL=roba@one-coder.com
docker compose run --rm certbot certonly \
  --webroot \
  -w /var/www/certbot \
  -d $DOMAIN \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email

mv resources/config/ssl.conf.disabled resources/config/ssl.conf

docker compose down
docker compose up -d

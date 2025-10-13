FROM node:20 AS build
LABEL authors="Roba"

WORKDIR /code
COPY ../.. .

RUN chmod +x manage.sh && \
    bash manage.sh init --prod --front && \
    bash manage.sh build --prod --front

FROM nginx:alpine
LABEL authors="Roba"

EXPOSE 80

#CMD ls /code/frontend

COPY --from=build /code/frontend/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

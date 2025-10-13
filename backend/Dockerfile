FROM python:3.11.12-slim-bookworm
LABEL authors="Roba"

ENV PYTHONUNBUFFERED=1
ENV POETRY_VIRTUALENVS_IN_PROJECT=true

EXPOSE 8000

WORKDIR /code
COPY ../.. .

RUN apt-get update
RUN pip install --upgrade pip && pip install poetry

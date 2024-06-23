# frontend
FROM node:18.20.2-buster-slim as builder

WORKDIR /app

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN echo ${VITE_BACKEND_URL}
COPY ./web/package.json /app/
COPY .env /app/

RUN npm install

COPY ./web ./

RUN npm run build


# fastapi
FROM python:3.12.4 as api

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt


COPY . /app


COPY --from=builder /app/dist /app/public



CMD ["fastapi", "run", "main.py", "--port", "80"]

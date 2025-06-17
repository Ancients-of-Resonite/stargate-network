FROM denoland/deno:alpine

WORKDIR /app

EXPOSE 8000

COPY . .

RUN deno cache src/main.ts

CMD ["run", "--allow-net", "--allow-env", "src/main.ts"]


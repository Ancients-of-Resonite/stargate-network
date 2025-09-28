FROM denoland/deno

WORKDIR /app

COPY ../../ .

RUN deno install

RUN deno install --config apps/sgn-socket/deno.json

RUN deno compile --allow-env --allow-net --output ./sgn-socket apps/sgn-socket/src/main.ts

CMD ["./sgn-socket"]

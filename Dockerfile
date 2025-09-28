FROM denoland/deno AS sgn_dash

WORKDIR /app-dash

COPY . .

RUN deno install

RUN deno install --config apps/sgn-dash/deno.json

RUN deno task --cwd apps/sgn-dash build

EXPOSE 3000

CMD ["deno", "run", "-A", "apps/sgn-dash/.output/server/index.mjs"]

FROM denoland/deno AS sgn_socket

WORKDIR /app-sgn_socket

COPY . .

RUN deno install

RUN deno install --config apps/sgn-socket/deno.json

RUN deno compile --allow-env --allow-net --output ./sgn-socket apps/sgn-socket/src/main.ts

CMD ["./sgn-socket"]

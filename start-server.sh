cd packages/database

if bun run db:migrate | grep -q 'migrations applied successfully!'; then
    echo Successfully migrated schema to database... Starting websocket

    cd ../../apps/sgn-socket

    bun run build/main.js
fi

{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  env = {
    DB_HOST = "127.0.0.1";
    # DB_USER = "reality"; # NOTE: Set this as your user in `./devenv.local.nix`
    DB_PASS = "postgres";
    DB_DATABASE = "postgres";
    DB_PORT = 5432;
  };

  packages = [ pkgs.bun ];

  languages.javascript.enable = true;

  processes = {
    server-dev = {
      exec = "${lib.getExe pkgs.bun} --bun run ./src/main.ts";
      cwd = "./apps/sgn-socket/";
    };
    dash-dev = {
      exec = "${lib.getExe pkgs.bun} --bun run dev";
      cwd = "./apps/sgn-dash/";
    };
  };

  tasks = {
    "db:migrate" = {
      exec = # bash
        ''
          exec bun --bun install
          exec bun --bun db:generate
          exec bun --bun db:migrate
        '';
      cwd = "./packages/database";
      after = [ "devenv:processes:postgres@ready" ];
      before = [
        "devenv:processes:server-dev"
        "devenv:processes:dash-dev"
      ];
    };
  };

  services.postgres = {
    enable = true;
    listen_addresses = "*";
    port = config.env.DB_PORT;
    initialDatabases = [
      {
        name = config.env.DB_DATABASE;
        user = config.env.DB_USER;
        pass = config.env.DB_PASS;
      }
    ];
  };
}

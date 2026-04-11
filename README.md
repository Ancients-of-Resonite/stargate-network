# Ancients of Resonite Stargate Network Backend
The full backend server including the dashboard

## Development
**Requirements**
- (Bun)[https://bun.sh]

*Recommended*
- (Devenv)[https://devenv.sh]
  - This lets you quickly spin up a dev environment

### Setup
Create `devenv.local.nix` with the following content
```nix
{
  env = {
    DB_USER = "user"; # NOTE: Replace user with your username
  };
}
```

### Startup Devenv
Running this command will spin up a dev environment
```bash
devenv up
```
You will be able to access the websocket at `ws://localhost:8000` and the dash at `http://localhost:3000`.

## Contributing
Create a new branch corresponding with what you are doing.
Eg: Adding something new for the dash would be `a-dash_<new feature>` and a fix for the dash would be `f-dash_<fix>`.


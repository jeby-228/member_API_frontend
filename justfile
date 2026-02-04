default:
    @just --list

init:
    npm install

build:
    npm build

lint:
    npm run lint

fmt:
    npm run format

test:
    npm test

check:
    npm run check

local-ci:
    npm ci
    just check
    just lint
    just build
    just test
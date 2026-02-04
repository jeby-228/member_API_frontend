default:
    @just --list

init:
    npm install

build:
    npm run build
lint:
    npm run lint

fmt:
    npm run format

test:
    npm run test

check:
    npm run check

ci:
    npm ci
    just check
    just lint
    just build
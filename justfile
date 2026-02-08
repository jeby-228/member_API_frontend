default:
    @just --list
run:
    npm run dev

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
    just test
    just check
    just lint
    just build


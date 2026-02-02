default:
    @just --list

init:
    npm install

run:
    npm run dev

build:
    npm run build

preview:
    npm run preview

test:
    npm run test

test-ui:
    npm run test:ui

test-coverage:
    npm run test:coverage

fmt:
    npx prettier --write .

fmt-check:
    npx prettier --check .

check:
    npm run check

check-svelte:
    npx svelte-check --tsconfig ./tsconfig.json

lint-test:
    just test
    just fmt-check
    just check

fix:
    just fmt
    just check

deploy:
    just lint-test
    npx vercel --prod

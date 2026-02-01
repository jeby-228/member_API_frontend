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

fmt:
    npx prettier --write .

fmt-check:
    npx prettier --check .

check:
    npm run check

check-svelte:
    npx svelte-check --tsconfig ./tsconfig.json

lint:
    just fmt-check
    just check

fix:
    just fmt
    just check

deploy:
    just lint
    npx vercel --prod
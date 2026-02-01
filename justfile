default:
    @just --list

run:
    npm run dev

build:
    just fmt
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
    npm run check

loacl_CI:
    just lint
    just build
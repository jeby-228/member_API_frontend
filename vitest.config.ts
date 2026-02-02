import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
test: {
globals: true,
environment: 'jsdom',
setupFiles: ['./src/__tests__/setup.ts'],
include: ['src/**/*.{test,spec}.ts'],
exclude: ['**/node_modules/**', '**/dist/**', '**/components/**']
},
resolve: {
alias: {
$lib: resolve(__dirname, './src/lib'),
$app: resolve(__dirname, './src/__tests__/mocks/$app')
}
}
});

module.exports = {
  root: true,
  env: { node: true },
  globals: {
    __dirname: true,
    module: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:unicorn/all',
  ],
  rules: {
    'id-length': 'error',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['*.js', '*.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
};

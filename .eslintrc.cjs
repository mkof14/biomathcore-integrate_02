module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'prettier'
  ],
  ignorePatterns: ['node_modules','.next','dist','coverage'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    '@next/next/no-img-element': 'off'
  },
  overrides: [
    {
      files: [
        'src/app/member/**',
        'src/app/admin/**',
        'src/app/monitoring/**',
        'src/app/control-center/**',
        'src/app/services/**',
        'src/app/investors/**',
        'src/app/legal/**',
        'src/app/internal/**',
        'src/app/**/_backup/**',
        'src/app/**/page.backup.*.tsx',
        'src/app/**/page.mono.tsx'
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-empty': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@next/next/no-img-element': 'off'
      }
    }
  ]
};

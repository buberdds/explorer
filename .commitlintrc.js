module.exports = {
  defaultIgnores: false,
  rules: {
    'body-max-line-length': [2, 'always', 80],
    'body-min-length': [2, 'always', 20],
    'header-max-length': [2, 'always', 72],
    'title-must-not-contain-word': [2, 'always', ['fixup!', 'wip']],
  },
  plugins: [
    {
      rules: {
        'title-must-not-contain-word': ({ header }, applicable, value) => {
          return [
            !value.some(s => header.includes(s)),
            `Your commit title should not contain one of: ${value.toString()} words`,
          ]
        },
      },
    },
  ],
}

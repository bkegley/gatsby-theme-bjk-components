module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
  verbose: true,
}

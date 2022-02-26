module.exports = {
  moduleNameMapper: {
    '@\/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|less)$': '<rootDir>/src/__mocks__/css.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/assets.ts',
  },
  setupFiles: ['<rootDir>/src/__setups__/index.ts']
};

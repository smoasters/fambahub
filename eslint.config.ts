//  @ts-check
import { tanstackConfig } from '@tanstack/eslint-config';
import oxlint from 'eslint-plugin-oxlint';

export default [
  ...tanstackConfig,
  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),
];

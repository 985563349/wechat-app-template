const ci = require('miniprogram-ci');
const path = require('path');

const version = require('../package.json').version;
const appid = require('../project.config.json').appid;

(async () => {
  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath: path.resolve(__dirname, '..'),
    privateKeyPath: path.resolve(__dirname, '../private.key'),
    ignores: ['node_modules/**/*'],
  });

  await ci.packNpmManually({
    packageJsonPath: path.resolve(__dirname, '../package.json'),
    miniprogramNpmDistDir: path.resolve(__dirname, '../miniprogram'),
  });

  await ci.preview({
    project,
    version,
    setting: {
      es6: true,
      es7: true,
    },
  });
})();

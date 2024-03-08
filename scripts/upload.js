const ci = require('miniprogram-ci');
const path = require('path');
const utils = require('./utils');

const version = require('../package.json').version;
const appid = require('../project.config.json').appid;
const {
  token,
  message,
  mentioned_mobile_list,
} = require('../webhook.config.json');

(async () => {
  const options = utils.parseArgumentsIntoOptions(process.argv.slice(2));

  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath: path.resolve(__dirname, '..'),
    privateKeyPath: path.resolve(__dirname, '..', 'private.key'),
    ignores: ['node_modules/**/*'],
  });

  await ci.packNpmManually({
    packageJsonPath: path.resolve(__dirname, '../package.json'),
    miniprogramNpmDistDir: path.resolve(__dirname, '../miniprogram'),
  });

  await ci.upload({
    project,
    version,
    setting: {
      es6: true,
      es7: true,
      minifyWXML: true,
      minifyWXSS: true,
      minifyJS: true,
      minify: true,
      autoPrefixWXSS: true,
    },
  });

  if (options.notify) {
    const qrcode = await utils.generateAppQRCode(appid);
    const formatter = [[/\{v}/g, version]];

    const content = formatter.reduce(
      (prev, [regexp, value]) => prev.replace(regexp, value),
      message
    );

    await utils.webhook(token, {
      msgtype: 'text',
      text: {
        content,
        mentioned_mobile_list,
      },
    });

    await utils.webhook(token, {
      msgtype: 'image',
      image: qrcode,
    });
  }
})();

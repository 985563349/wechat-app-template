const path = require('path');
const fs = require('fs');
const qrcode = require('qrcode');
const md5 = require('md5');

const webhook = (token, data) => {
  return fetch(
    `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
};

const generateAppQRCode = async (appid) => {
  const url = `https://open.weixin.qq.com/sns/getexpappinfo?appid=${appid}&path=pages/index/index.html`;
  const outputPath = path.resolve(__dirname, `${Date.now()}.png`);

  await qrcode.toFile(outputPath, url);

  const buffer = fs.readFileSync(outputPath);
  const base64 = Buffer.from(buffer, 'binary').toString('base64');

  fs.unlinkSync(outputPath);

  return {
    base64,
    md5: md5(buffer),
  };
};

const parseArgumentsIntoOptions = (args) => {
  const parsedArgs = {};

  args.forEach((arg) => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      parsedArgs[key] = value || true;
    } else if (arg.startsWith('-')) {
      arg
        .slice(1)
        .split('')
        .forEach((char) => {
          parsedArgs[char] = true;
        });
    } else {
      parsedArgs._ = parsedArgs._ || [];
      parsedArgs._.push(arg);
    }
  });

  return parsedArgs;
};

module.exports = { webhook, generateAppQRCode, parseArgumentsIntoOptions };

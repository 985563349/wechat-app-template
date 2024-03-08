const config = {
  develop: {
    baseURL: 'http://192.168.0.1:8080',
  },

  trial: {
    baseURL: 'http://192.168.0.1:8082',
  },

  release: {
    baseURL: 'http://192.168.0.1:8083',
  },
};

const env = wx.getAccountInfoSync().miniProgram.envVersion;

module.exports = { ...config[env], env };

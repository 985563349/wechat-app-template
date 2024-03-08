Component({
  options: {
    multipleSlots: true,
  },

  properties: {
    titleText: String,
    textStyle: String,
    backgroundColor: {
      type: String,
      value: '#ffffff',
    },
    homeButton: {
      type: Boolean,
      value: true,
    },
    show: {
      type: Boolean,
      value: true,
      observer: 'showChange',
    },
    animated: {
      type: Boolean,
      value: true,
    },
  },

  lifetimes: {
    attached() {
      const rect = wx.getMenuButtonBoundingClientRect();
      const { platform, windowWidth, safeArea } = wx.getSystemInfoSync();
      const isAndroid = platform === 'android';
      const isDevtools = platform === 'devtools';

      const isStackLow = getCurrentPages().length <= 1;

      this.setData({
        ios: !isAndroid,
        innerPaddingRight: `padding-right: ${windowWidth - rect.left}px;`,
        leftWidth: `width: ${windowWidth - rect.left}px;`,
        safeAreaTop:
          isDevtools || isAndroid
            ? `height: calc(var(--height) + ${safeArea.top}px); padding-top: ${safeArea.top}px;`
            : '',
        showBack: !isStackLow,
      });
    },
  },

  methods: {
    navigateBack() {
      wx.navigateBack();
    },

    showChange(show) {
      const animated = this.data.animated;
      let displayStyle = '';

      if (animated) {
        displayStyle = `opacity: ${
          show ? '1' : '0'
        }; transition: opacity 0.5s;`;
      } else {
        displayStyle = `display: ${show ? '' : 'none'};`;
      }

      this.setData({ displayStyle });
    },
  },
});

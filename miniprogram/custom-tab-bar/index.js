Component({
  data: {
    selected: 0,
    color: '#7a7e83',
    selectedColor: '#12C276',
    list: [
      {
        pagePath: '/pages/index/index',
        text: 'Home',
      },
      {
        pagePath: '/pages/about/about',
        text: 'About',
      },
    ],
  },

  lifetimes: {
    // enable in webview rendering mode
    // ready() {
    //   const currentPage = getCurrentPages().at(-1);
    //   const selected = this.data.list.findIndex(({ pagePath }) =>
    //     new RegExp(currentPage.route).test(pagePath)
    //   );
    //   this.setData({ selected });
    // },
  },

  methods: {
    switchTab(e) {
      const url = e.currentTarget.dataset.path;
      const selected = e.currentTarget.dataset.index;

      wx.switchTab({ url });
      this.setData({ selected }); // delete this line of code in webview rendering mode
    },
  },
});

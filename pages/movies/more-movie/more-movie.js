var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    navigateTitle: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case '正在热映':
        dataUrl = "https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=20&page_start=0";
        break;
      case '即将上映':
        dataUrl = "https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=20&page_start=1";
        break;
      case '豆瓣Top250':
        dataUrl = "https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=20&page_start=0";
        break;
    }
    util.http(dataUrl, this.processDoubanData);
  },

  onScrollLower:function(event) {
     console.log("加载更多");
     wx.showNavigationBarLoading();
  },

  processDoubanData: function(moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        average: subject.rate,
        coverageUrl: subject.cover,
        movieId: subject.id
      }
      movies.push(temp);
    }
    // var readyData = {};
    // readyData[settedKey] = {
    //   catetoryTitle: catetoryTitle,
    //   movies: movies
    // }
    // this.setData(readyData);
    this.setData({
      movies:movies
    })
  },

  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }

})
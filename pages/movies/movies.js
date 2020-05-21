var util = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
     inTheaters:{},
     comingSoon:{},
     top250:{},
     containerShow:true,
     searchPanelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=3&page_start=0'; //正在热映
    var comingSoonUrl = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=3&page_start=1'; //即将上映
    var top250Url = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=3&page_start=0'; //排行榜
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },

  getMovieListData: function (url, settedKey, catetoryTitle) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      methods: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function(res) {
        // console.log(res.data.subjects, '接口数据');
        that.processDoubanData(res.data, settedKey, catetoryTitle);
      },
      fail: function(error) {
        console.log(error);
      }
    })
  },

  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:{}
    })
  },
 
  onBindFocus: function(event) {
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },

  onBindChange: function(event) {
     var text = event.detail.value;
  },

  processDoubanData: function (moviesDouban, settedKey, catetoryTitle) {
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
    var readyData = {};
    readyData[settedKey] = {
      catetoryTitle: catetoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },

  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },

  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
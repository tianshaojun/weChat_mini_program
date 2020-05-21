var postData = require('../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts_key: []
    //小程序总是会读取data对象来做数据绑定，这个动作我们成为动作A
    //而这个动作A的执行，是在onLoad事件执行之后发生的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    // this.data.postList = postData.postList;
    // console.log(this.data.postList,'2222222222222');

    this.setData({
      posts_key: postData.postList
    });

  },

  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },

  onSwiperTap: function(event) {
    //target指的是image, 而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    // console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }

})
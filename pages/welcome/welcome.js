Page({

  onTap: function(event) {
    //  console.log(event);
    //  wx.navigateTo({
    //    url: '../posts/posts',   //相对路径
    //   //  url: '/pages/posts/posts' //绝对路径
    //  })

    wx.switchTab({
      url: '../posts/posts',   //相对路径
      //  url: '/pages/posts/posts' //绝对路径
    })

    //  wx.redirectTo({
    //    url: '../posts/posts'
    //  })
  }

})
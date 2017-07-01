
const app = getApp()

Page({
  data:{
    list: [],
    id: 1
  },
  onLoad: function ({id}) {
    const books = ['第一册', '第二册', '第三册', '第四册']
    wx.setNavigationBarTitle({
      title: '新概念英语' + books[id - 1]
    })
    app.audio.book = +id
    this.setData({
      id: id,
      list: app.audio.nceList[id - 1]
    })
  },
  onReady () {
    console.log('list ready')
  },
  onShow () {
    console.log('list show')
  },
  onHide () {
    console.log('list hide')
  },
  onUnload () {
    console.log('list unload')
  }
})
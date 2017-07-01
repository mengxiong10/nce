//app.js
const nce1 = require('/assets/nce1')
const nce2 = require('/assets/nce2')
const nce3 = require('/assets/nce3')
const nce4 = require('/assets/nce4')
 
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var res  = wx.getSystemInfoSync()
    console.log(res)
  },
  audio: {
    id: 1, // 第几课
    book: 1, // 第几册
    nceList: [nce1, nce2, nce3, nce4],
    status: 'pause', // 播放状态
    mode: 0, // 循环模式 : 0. 列表循环; 1. 单曲循环
    currentTime: 0,
    duration: 0,
    ctx: null, // 播放器 上下文 context
    get list () {
      return this.nceList[this.book - 1].map(v => +v.lesson)
    },
    get index () {
      return this.list.indexOf(+this.id)
    },
    get nextId () {
      return this.index === (this.list.length - 1) ? this.list[0] : this.list[this.index + 1]
    },
    get prevId () {
      return this.index === 0 ? this.list[this.list.length - 1] : this.list[this.index - 1]
    },
    get src () {
      //  http://www.tingclass.net/show-5044-771-1.html 
      return `http://online1.tingclass.net/lesson/shi0529/0000/${this.book + 42}/${this.id}.mp3`
    }
  }
})
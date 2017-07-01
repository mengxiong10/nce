//index.js
//获取应用实例
var app = getApp()

Page({
  data: {

  },
  cbPlay () {
    const pages = getCurrentPages()
    if (pages.length === 3) {
      pages[2].cbPlay()
    }
  },
  cbPause () {
    const pages = getCurrentPages()
    if (pages.length === 3) {
      pages[2].cbPause()
    }
  },
  cbTimeupdate (event) {
    const pages = getCurrentPages()
    app.audio.currentTime = event.detail.currentTime
    app.audio.duration = event.detail.duration
    if (pages.length === 3) {
      pages[2].cbTimeupdate(event.detail)
    }
  },
  cbEnded () {
    const pages = getCurrentPages()
    if (pages.length === 3) {
      pages[2].cbEnded()
    }
  },
  onLoad: function () {
    console.log('index onLoad')
  },
  onReady () {
    app.audio.ctx = wx.createAudioContext('audio')
  },
  onUnload () {
    console.log('index unload')
  }
})

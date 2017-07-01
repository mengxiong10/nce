
// 秒转化为'分:秒'
function formatTime (second) {
  const m = ~~(second / 60) + ''
  const s = ~~(second % 60) + ''
  return ('00' + m).slice(m.length) + ':' + ('00' + s).slice(s.length)
}

// mode : 0 列表循环; 1 单曲循环;

// 筛选当前播放列表
const app = getApp()

let audioId = 1 // 当前播放的lesson id

Page({
  data: {
    status: app.audio.status,
    mode: app.audio.mode,
    totalTime: '00:00', // 所有时间
    currentTime: '00:00', // 当前播放的时间
    progress: 0,  // 当前进度百分比
  },
  selectProgress (event) {
    const offsetLeft = event.currentTarget.offsetLeft  // progress组件的offsetLeft的px值  15%
    const progressWidth = offsetLeft / 15 * 70
    const position = event.touches[0].pageX
    const ratio =  (position - offsetLeft) / progressWidth
    app.audio.ctx.seek(Math.ceil(app.audio.duration * ratio))
  },
  playAudio (id) {
    app.audio.id = id
    app.audio.ctx.setSrc(app.audio.src)
    app.audio.ctx.play()
  },
  clickPlay () {
    if (app.audio.status === 'play') {
      app.audio.ctx.pause()
    } else {
      app.audio.ctx.play()
    }
  },
  clickPrev () {
    this.playAudio(app.audio.prevId)
  },
  clickNext () {
    this.playAudio(app.audio.nextId)
  },
  clickMode () {
    app.audio.mode = app.audio.mode ^ 1 
    this.setData({ mode : app.audio.mode })
  },
  cbPlay () {
    app.audio.status = 'play'
    this.setData({ status: 'play' })
  },
  cbPause () {
    app.audio.status = 'pause'
    this.setData({ status: 'pause' })
  },
  cbTimeupdate (data) {
    this.setData({
      progress: data.currentTime / data.duration * 100,
      totalTime: formatTime(data.duration),
      currentTime: formatTime(data.currentTime)
    })
  },
  cbEnded () {
    if (app.audio.mode === 1) {
      app.audio.ctx.play()
    } else {
      this.clickNext()
    }
  },
  onLoad (options) {
    audioId = +options.id
  },
  onReady () {
    if (app.audio.status === 'play' && app.audio.id === audioId) {
      return this.cbPlay()
    }
    this.playAudio(audioId)
  },
  onUnload () {
    console.log('plaer unload')
  }
})
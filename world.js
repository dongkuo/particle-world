/**
 * 世界
 */
(function () {

  var DEFAULT_CONFIG = {

  }

  var DEFAULT_STYLE = {
    width: '300px',
    height: '300px',
    background: 'black'
  }

  /**
   * 合并多个对象。
   * 当属性相同时，靠后的参数对象的属性值会覆盖靠前的属性值
   * 
   * @param {Object} obj 
   */
  function merge(obj) {
    var i = 1
      , target
      , key;

    for (; i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }

    return obj;
  }

  /**
   * 创建画布，并添加到选择器对应的元素中
   * 
   * @param {String} selector 
   * @param {Object} style 
   * @returns {Canvas} canvas
   */
  function createCanvasAndAppendTo(selector, style) {
    var canvas = document.createElement('canvas')
    document.querySelector(selector).appendChild(canvas)
    // 设置style
    merge(canvas.style, merge({}, DEFAULT_STYLE, style))
    // 设置画布真实大小和缩放比，避免出现模糊问题
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    canvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio)
    return canvas
  }

  /**
   * 世界类
   */
  function World(selector, style, config) {
    this.canvas = createCanvasAndAppendTo(selector, style)
    this.ctx = this.canvas.getContext('2d')
    this.style = merge({}, DEFAULT_STYLE, style)
    this.config = merge({}, DEFAULT_CONFIG, config)
    this.particleList = []
    this.forceFieldList = []
  }

  World.prototype = {

    constructor: World,

    /**
     * 添加粒子
     * 
     * @param {Particle} particle 粒子
     */
    appendParticle: function (particle) {
      this.particleList.push(particle)
    },

    /**
     * 添加力场
     * 
     * @param {ForceField} forceField 力场
     */
    appendForceField: function (forceField) {
      this.forceFieldList.push(forceField)
    },

    /**
     * 渲染
     */
    render: function () {

      // 调用监听者

      if(this.listeners.render){
        for(var i = 0; i < this.listeners.render.length; i++){
          this.listeners.render[i]()
        }
      }

      // 清除画布
      this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight)
      // 绘制粒子
      const deltaTime = this.lastRenderTime ? Date.now() - this.lastRenderTime : 0
      for (let i = 0; i < this.particleList.length; i++) {
        if (i == 0) {
          this.lastRenderTime = Date.now()
        }
        this.particleList[i].draw(this.ctx)
        this.particleList[i].move(this.forceField, deltaTime / 1000, this.canvas.offsetWidth, this.canvas.offsetHeight)
      }
    },

    /**
     * 运行
     */
    run: function () {
      this.isRunning = true
      const self = this
      requestAnimationFrame(function callback() {
        self.render()
        if (self.isRunning) {
          requestAnimationFrame(callback)
        }
      })
    },

    /**
     * 停止
     */
    stop: function () {
      this.isRunning = false
    },

    on: function(event, callback){
      this.listeners = this.listeners || {}
      this.listeners[event] = this.listeners[event] || []
      this.listeners[event].push(callback)
    }
  }

  this.World = World

}).call(window)
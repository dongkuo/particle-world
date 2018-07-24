// ======================= 粒子 ======================= \\
(function () {

  function toInt(num) {
    var rounded;
    rounded = (0.5 + num) | 0;
    // A double bitwise not.
    rounded = ~~(0.5 + num);
    // Finally, a left bitwise shift.
    rounded = (0.5 + num) << 0;
    return rounded;
  }

  /**
   * 粒子
   * 
   * @param {Number} x x轴坐标
   * @param {Number} y  y轴坐标
   * @param {String} color 颜色
   * @param {Number} vx 水平速度。单位：px/s
   * @param {Number} vy 垂直速度。单位：px/s
   */
  function Particle(x, y, radius, vx, vy, color) {
    this.x = x || 0
    this.y = y || 0
    this.vx = vx || 0
    this.vy = vy || 0
    this.radius = radius || 1;
    this.color = color || '#FFFFFF'
  }

  Particle.prototype = {

    constructor: Particle,

    /**
   * 移动
   * 
   * @param {} forceFieldList 力场列表
   * @param {} deltaTime 两次move调用之前的时差
   */
    move: function (forceFieldList, deltaTime, xScope, yScope) {

      // 计算下一时刻的位置
      const deltaX = this.vx * deltaTime
      const deltaY = this.vy * deltaTime
      let nextX = this.x + deltaX
      let nextY = this.y + deltaY

      // 边缘碰撞检测
      if (nextX < 0 || nextX >= xScope) {
        nextX = this.x - deltaX
        this.vx = -this.vx
      }
      if (nextY < 0 || nextY >= yScope) {
        nextY = this.y - deltaY
        this.vy = -this.vy
      }

      this.x = nextX
      this.y = nextY
    },

    /**
     * 绘制
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw: function (ctx) {
      ctx.fillStyle = this.color
      if (this.radius < 5) {
        // 当粒子半径小于5像素时，用矩形代替圆
        ctx.fillRect(this.x - 1, this.y - 1, 2, 2)
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 6.2831853071796, false);
        ctx.fill()
      }
    }

  }

  this.Particle = Particle

}).call(window)
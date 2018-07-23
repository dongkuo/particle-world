// ======================= 世界 ======================= \\
class World {

  constructor() {
    this.particleList = []
    this.forceFieldList = []
  }

  /**
   * 添加粒子
   * 
   * @param {Particle} particle 粒子
   */
  appendParticle(particle) {

  }

  /**
   * 添加力场
   * 
   * @param {ForceField} forceField 力场
   */
  appendForceField(forceField) {

  }
}

// ======================= 力场 ======================= \\
class ForceField {

  /**
   * 
   * @param {Number} value 大小
   * @param {Number} direction 方向
   */
  constructor(value = 0, direction = 0) {
    this.value = value
    this.direction = direction
  }

}

// ======================= 粒子 ======================= \\
class Particle {

  /**
   * 
   * @param {Number} x x轴坐标
   * @param {Number} y  y轴坐标
   * @param {String} color 颜色
   * @param {Number} vx 水平速度 
   * @param {Number} vy 垂直速度
   */
  constructor(x = 0, y = 0, color = '#FFFFFF', vx = 0, vy = 0) {
    this.x = x
    this.y = y
    this.color = color
    this.vx = vx
    this.vy = vy
  }

}
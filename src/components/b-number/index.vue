<template>
  <div class="b-number">
    <div class="b-number-before">
      {{ config.beforeText }}
    </div>
    <div class="b-number-content">
      <span v-for="(item, index) in config.num.toString().split('')" :key="index">
        {{ item }}
      </span>    
    </div>
    <div class="b-number-after">
      {{ config.afterText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'b-number',
  data() {
    return {
      baseConfig: {
        beforeText: '已有',
        num: '1333676',
        afterText: '人领取成功',
        mode: 1, // 0: 递减, 1: 递增
        time: 3000,// 单位毫秒
        step: 3, // 步长,
        maxNum: 999999, // 最大数值
        minNum: 0 // 最小数值
      },
      timer: null
    }
  },
  computed: {
    config() {
      return this.value ? this.value : this.baseConfig 
    }
  },
  props: {
    value: {
      type: Object
    }
  },
  created() {
    this.initTimer()
  },
  methods: {
    initTimer() {
      const { mode, time, step, minNum, maxNum } = this.config
      !this.timer && (this.timer = setInterval(() => {
        this.config.num = mode ? Number(this.config.num) + step : Number(this.config.num) - step
        if (this.config.num <= minNum) {
          this.config.num = minNum
          clearInterval(this.timer)
        } else if (this.config.num >= maxNum){
          this.config.num = maxNum
          clearInterval(this.timer)
        }
      }, time))
    }
  }
}
</script>

<style lang="scss" scoped>
.b-number {
  display: flex;
  font-size: 28px;
  justify-content: center;
  align-items: center;
  height: 50px;
  line-height: 50px;
  &-before,
  &-after {
    font-size: 24px;
    color: #999999;
  }
  &-content {
    color: #FF8E0A;
    font-size: 32px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    span {
      margin: 0 1px;
    }
  }
}
</style>
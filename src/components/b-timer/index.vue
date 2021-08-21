<template>
  <!-- 倒计时组件 -->
  <div class="b-timer">
    <div class="b-timer-content" v-show="!isShow">
      <span class="b-timer-before" v-if="config.beforeText">{{ config.beforeText }}</span>
      <div class="b-timer-item" v-if="showDay">
        <span class="num">{{ myDay }}</span>
        <span class="space" v-if="dayText">{{ dayText }}</span>
      </div> 
      <div class="b-timer-item" v-if="showHours">
        <span class="num">{{ myHours }}</span>
        <span class="space" v-if="hoursText">{{ hoursText }}</span>
      </div>
      <div class="b-timer-item" v-if="showMinutes">
        <span class="num">{{ myMinutes }}</span>
        <span class="space" v-if="minuteText">{{ minuteText}}</span>
      </div>
      <div class="b-timer-item" v-if="showSeconds">
        <span class="num">{{ mySeconds }}</span>
        <span class="space" v-if="secondsText">{{ secondsText}}</span>
      </div>
      <span class="b-timer-after" v-if="config.afterText">{{ config.afterText }}</span>
      <div class="b-timer-item" v-if="showMs">
        <span class="num" id="timehs">00</span>
      </div>
    </div>
    <!-- 这里是显示结束后的内容 -->
    <span class="b-timer-end--text" v-show="isShow">{{clocker}}</span>
  </div>
</template>

<script>
export default {
  name: 'downTime',
  props: {
    value: {
      type: Object
    }
  },
  computed: {
    config() {
      return Object.prototype.toString.call(this.value) === '[object Object]' && Object.prototype.hasOwnProperty.call(this.value, 'time') && Object.prototype.hasOwnProperty.call(this.value, 'format') ? this.value : this.baseConfig
    }
  },
  data () {
    return {
      baseConfig: {
        beforeText: '限时',
        time: 9000000, // 单位毫秒
        endMsg: '',
        format: 'm|:,s|:,ms|'
      },
      isShow: false, // 控制显示结束或还未结束显示的内容
      clocker: '', // 结束后显示的内容
      timeObj: null, // 时间对象,下方会用到
      myDay: 0, // 我定义来接收计算出来的 天 的
      myHours: 0, // 我定义来接收计算出来的 小时 的
      myMinutes: 0, // 我定义来接收计算出来的 分钟 的
      mySeconds: 0,// 我定义来接收计算出来的 秒钟 的
      dayText: '',
      hoursText: '',
      minuteText: '',
      secondsText: '',
      showDay: false,
      showHours: false,
      showMinutes: false,
      showSeconds: false,
      showMs: false,
      timer1: null,
      timer2: null
    }
  },
  created() {
    this.initTimer()
  },
  methods: {
    initTimer() {
      if (this.config.format) {
        const formatArr = this.config.format.split(',')
        formatArr.forEach(x => {
          let item = x.split('|')
          if (item[0] === 'd') {
            this.dayText = item[1]
            this.showDay = true
          } else if (item[0] === 'h') {
            this.hoursText = item[1]
            this.showHours = true
          } else if (item[0] === 'm') {
            this.showMinutes = true
            this.minuteText = item[1]
          } else if (item[0] === 's') {
            this.showSeconds = true
            this.secondsText = item[1]
          } else if (item[0] === 'ms') {
            this.showMs = true
            this.$nextTick(() => {
              this.timeDt()
            })
          }
        })
      }
    },
    option () {
      // 计算时间差
      let timeLag = this.config.time / 1000
      // 判断当前是否时分秒的值是否大于10
      const add = num => {
        return num < 10 ? '0' + num : num
      }
      // 时间倒计时运算的方法
      const timeFunction = () => {
        const time = timeLag--
        this.timeObj = { // 时间对象
          seconds: Math.floor(time % 60),
          minutes: Math.floor(time / 60) % 60,
          hours: Math.floor(time / 60 / 60) % 24,
          days: Math.floor(time / 60 / 60 / 24)
        }
        // 计算出时分秒
        this.myDay = `${add(this.timeObj.days)}`
        this.myHours = `${add(this.timeObj.hours)}`
        this.myMinutes = `${add(this.timeObj.minutes)}`
        this.mySeconds = `${add(this.timeObj.seconds)}`
        // 当时间差小于等于0时,停止倒计时
        if (time <= 0) {
          this.isShow = true
          this.clocker = this.config.endMsg
          clearInterval(go)
          clearInterval(this.timer1)
          clearInterval(this.timer2)
        }
      }
      // 开始执行倒计时
      timeFunction()
      // 每一秒执行一次
      const go = setInterval(() => {
        timeFunction()
      }, 1000)
    },
    timeDt() {
      this.timer1 = setTimeout(function () {
        var haomiao = 99
        document.getElementById('timehs').innerHTML = haomiao
        this.timer2 = setInterval(function () {
          const timehs = document.getElementById('timehs')
          if (timehs) {
            timehs.innerHTML = `${haomiao < 10 ? `0${haomiao}` : haomiao}`
          }
          haomiao--
          if (haomiao < 0) {
            haomiao = 99
          }
        }, 10)
      }, 1000)
    }
  },
  watch: {
    'config.endTime': {
      handler () {
        this.option()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.b-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;

  &-before,
  &-after {
    font-size: 24px;
    color: #D49438;
    font-weight: 500;
    margin-right: 20px;
  }

  &-item {
    display: inline-block;
    .num {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 0;
      font-size: 24px;
      color: #333;
      background: #FFD69A;
      border-radius: 6px;
      font-weight: 500;
    }
    .space {
      font-size: 24px;
      color: #D49438;
      margin: 0 8px;
      font-weight: 500;
    }
  }

  &-end--text {
    font-size: 24px;
    color: #fff;
  }
}
</style>

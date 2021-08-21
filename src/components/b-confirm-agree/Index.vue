<template>
  <md-popup
    v-if="visible"
    class="popup-confirm-agreement"
    v-model="visible"
    position="bottom"
    ref="popup"
    :mask-closable="!confirm"
  >
    <div class="inner">
      <div class="tab-bar">
        <div :class="['tab-bar-item', {'active': currentTab === item.name}]" v-for="(item, index) in data" :key="index">{{ item.label }}</div>
      </div>
      <div class="body">
        <template v-if="currentData.fileUrl">
          <component :is="pdfViewer" :href="currentData.fileUrl"></component>
        </template>
        <template v-if="!currentData.fileUrl && currentData.children">
          <div class="list">
            <template v-for="(item, index) in currentData.children">
              <div
                class="item"
                :key="index"
                @click="onShowItem(item)"
              >
                {{ item.fileName }}
              </div>
            </template>
          </div>
        </template>
      </div>
      <template v-if="confirm">
        <div class="confirm">
          <template v-if="currentData.label === '健康告知'">
            <div class="fbar">
              <div class="fbar-item" @click="onHide(false)">
                <img class="icon icon-close" src="https://images.vrm.cn/2x/2021/05/12/close.svg"/>
                <span>部分为是</span>
              </div>
              <div class="fbar-item" @click="onNext">
                <img class="icon icon-success" src="https://images.vrm.cn/2x/2021/05/12/gou.svg"/>
                <span>以上全否</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="next" @click="onNext">我已阅读并同意</div>
          </template>
        </div>
      </template>
    </div>
  </md-popup>
</template>

<script>
import Vue from 'vue'
import { Popup } from 'mand-mobile'

export default {
  name: 'BConfirmAgree',
  components: {
    [Popup.name]: Popup
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    /**
     * 显示确认按钮
     */
    confirm: {
      type: Boolean,
      default: false
    },
    /**
     * tab的内容列表
     */
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: this.value,
      currentTab: 1,
      pdfViewer: null,
      currentData: {}
    }
  },
  watch: {
    value: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.visible = val
        }
      },
      immediate: true
    },
    data: {
      handler(val) {
        if (val && val.length) {
          this.onChange(val[0])
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onHide(val = false) {
      this.visible = false
      this.$emit('input', this.visible)
      this.$emit('hide', val)
    },
    async onChange(item) {
      if (item.fileUrl && !this.pdfViewer) {
        const { BPdfViewer } = await import('@/components/b-pdf-viewer')
        Vue.component(BPdfViewer.name, BPdfViewer)
        this.pdfViewer = BPdfViewer.name
      }
      this.currentTab = item.name
      this.currentData = item
      this.$emit('change', item)
    },
    onNext() {
      const index = this.data.findIndex(o => o.name === this.currentTab)
      if (index < this.data.length - 1) {
        this.onChange(this.data[index + 1])
      } else {
        this.onHide(true)
      }
    },
    onShowItem(item) {
      item.fileUrl && window.open(item.fileUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-confirm-agreement {

  &.md-popup {
    z-index: 9999;
  }

  .inner {
    background-color: #fff;
    overflow: hidden;
  }

  .tab-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    &-item {
      flex: 1;
      font-size: 36px;
      height: 120px;
      line-height: 120px;
      &.active {
        position: relative;
        &::after {
          content: "";
          display: inline-block;
          width: 80%;
          height: 3px;
          background: #FD8333;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
  }

  .body {
    height: 50vh;
    overflow-x: hidden;
  }

  .confirm {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #eee;
  }

  .next {
    width: 540px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    background: linear-gradient(269deg, #FD8333 0%, #FFA251 100%);
    color: #fff;
    border-radius: 9999px;
    font-size: 40px;
    font-weight: 500;
    margin: auto;
    cursor: pointer;
  }

  .item {
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-size: 28px;
    color: #333;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }

  .fbar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 330px;
      height: 90px;
      background: #FFFFFF;
      border-radius: 6px;
      border: 1px solid #FF8900;
      font-size: 34px;
      font-weight: 500;
      color: #FF8E0A;
      box-sizing: border-box;

      &:last-child {
        background: linear-gradient(269deg, #FD8333 0%, #FFA251 100%);
        color: #fff;
      }

      .icon {
        margin: 0 10px;
        width: 21px;
        height: auto;

        &-success {
          width: 30px;
        }
      }
    }
  }
}
</style>

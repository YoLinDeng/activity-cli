<template>
  <div ref="pdfViewer" class="b-pdf-viewer" :class="{ fullscreen }"></div>
</template>

<script>
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'

export default {
  name: 'BPdfViewer',
  props: {
    /**
     * pdf文件地址
     */
    href: {
      required: true,
      type: String,
      default: ''
    },
    /**
     * 全屏显示
     */
    fullscreen: {
      type: Boolean,
      default: false
    },
    /**
     * 配置，参考pdfh5插件的options配置项
     */
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pdfViewer: null
    }
  },
  watch: {
    href: {
      handler(val, oldVal) {
        if (val && val !== oldVal) {
          this.init()
        }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.pdfViewer = new Pdfh5(this.$refs.pdfViewer, {
        ...this.options,
        pdfurl: this.href
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.b-pdf-viewer.fullscreen {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999999;
}
</style>

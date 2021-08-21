<template>
  <section class="b-pdf-preview" id="bPdfPreview">
    <Popup
      v-model="visible"
      @hide="hidePreview"
      position="bottom"
    >
      <div class="pdf-main" :style="{height: `${options.screenPercent || 70}vh`}">
        <md-popup-title-bar
          only-close
          large-radius
          :title="options.pdfname || ''"
          title-align="left"
          @cancel="hidePreview"
        ></md-popup-title-bar>
        <div id="demo" class="pdf-main-content">
        </div>
      </div>
    </Popup>
  </section>
</template>

<script>
import { Popup, Icon, PopupTitleBar } from 'mand-mobile'
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'

export default {
  name: 'b-pdf-preview',
  components: {
    Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      visible: true,
      bodyEl: document.body,
      top: window.scrollY
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.initPdf()
    this.stopBodyScroll(true)
  },
  methods: {
    initPdf() {
      this.pdfh5 = new Pdfh5('#demo', {
        pdfurl: this.options.url
      })
    },
    hidePreview() {
      this.visible = false
      this.$emit('hide')
      this.stopBodyScroll(false)
    },
    stopBodyScroll(isFixed) {
      if (isFixed) {
        this.top = window.scrollY
        this.bodyEl.style.position = 'fixed'
        this.bodyEl.style.top = -this.top + 'px'
        this.bodyEl.style.left = 0
        this.bodyEl.style.right = 0
        this.bodyEl.style.margin = 'auto'
      } else {
        this.bodyEl.style.position = ''
        this.bodyEl.style.top = ''
        window.scrollTo(0, this.top) // 回到原先的top
      }
    }
  }
}
</script>

<style lang="scss">
.pdfPreview {
  .md-popup {
    z-index: 99999;
  }
}
.md-popup-title-bar {
  height: auto !important;
  .title-bar-title {
    p.title {
      white-space: normal !important;
      line-height: 1.3;
    }
  }
}
.pdf {
  &-preview {
    img {
      width: 100%;
    }
  }
  .title-bar-title {
    p.title {
      width: 100%!important;
    }
  }
  &-main {
    background: white;
    width: 750px;
    max-width: 640PX;
    height: 70vh;
    display: flex;
    flex-direction: column;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    &-content {
      flex: 1;
      overflow-y: hidden;
    }
  }
}
</style>

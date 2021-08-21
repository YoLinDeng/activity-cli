<template>
  <div class="b-agree-box">
    <template v-if="checkbox">
      <md-agree
        v-if="agreeFiles.length"
        v-model="checked"
        @change="onChange(checked, $event)"
      >
        <agree-child
          :prepend="prepend"
          :append="append"
          :agree-files="agreeFiles"
        >
          <template slot="prepend">
            <slot name="prepend"></slot>
          </template>
          <template slot="append">
            <slot name="append"></slot>
          </template>
        </agree-child>
      </md-agree>
    </template>
    <template v-else>
      <agree-child
        :prepend="prepend"
        :append="append"
        :agree-files="agreeFiles"
      >
        <template slot="prepend">
          <slot name="prepend"></slot>
        </template>
        <template slot="append">
          <slot name="append"></slot>
        </template>
      </agree-child>
    </template>
  </div>
</template>

<script>
import AgreeChild from './agree-child.vue'
import { Agree } from 'mand-mobile'

export default {
  name: 'BAgree',
  components: {
    [Agree.name]: Agree,
    AgreeChild
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * 选中状态
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * 显示checkbox
     */
    checkbox: {
      type: Boolean,
      default: false
    },
    /**
     * 往前追加内容
     */
    prepend: {
      type: String,
      default: '我已阅读并同意'
    },
    /**
     * 往后追加内容
     */
    append: {
      type: String,
      default: ''
    },
    /**
     * 协议文件列表
     */
    agreeFiles: {
      required: true,
      type: Array,
      default: () => []
    },
    /**
     * 是否使用pdf加载器
     */
    isUsePdfLoader: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      isUsePdfLoader: this.isUsePdfLoader
    }
  },
  data() {
    return {
      checked: false
    }
  },
  watch: {
    value: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.checked = val
        }
      },
      immediate: true
    }
  },
  methods: {
    onChange(checked, e) {
      this.checked = checked
      this.$emit('change', checked, e)
    }
  }
}
</script>

<style lang="scss">
.md-popup {
  z-index: 9999;
}
.b-agree-box {
  .md-agree-icon {
    width: auto;
    margin-top: -7px;
    margin-right: 5px;

    .md-icon.md-icon-check {
      color: #979797;
    }

    &.checked .md-icon-checked,
    &.checked .md-icon-check {
      color: #ff8155;
    }
  }
}
.md-action-sheet-item {
  height: auto !important;
  line-height: 1.5 !important;
  font-size: 28px !important;
  .md-action-sheet-item-wrapper {
    padding: 20px 10px !important;
  }
}
</style>

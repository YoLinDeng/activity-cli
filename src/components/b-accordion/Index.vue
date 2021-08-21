<template>
  <div class="b-accordion" :class="{ shadow, round }">
    <div class="b-accordion-inner" :class="{ border }">
      <div class="b-accordion-bar" :class="{ hr: border || hr }">
        <div class="b-accordion-title">
          <!-- @slot 标题-->
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <md-button v-if="showExpandButton" type="link" class="b-accordion-button" @click.native="onChange">
          <!-- @slot 按钮-->
          <slot name="button">
            <span class="b-accordion-text" v-if="buttonText">{{ buttonText }}</span>
            <img class="b-accordion-arrow--icon" :class="{ up: visible }" :src="icon" />
          </slot>
        </md-button>
      </div>
      <div class="b-accordion-content">
        <!-- @slot  -->
        <slot name="append"></slot>
        <!-- @slot 默认-->
        <slot v-if="visible"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'mand-mobile'
/**
 * 手风琴
 * @displayName b-accordion
 */
export default {
  name: 'BAccordion',
  components: {
    [Button.name]: Button
  },
  model: {
    prop: 'expand',
    event: 'change'
  },
  props: {
    /**
     * 标题
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 是否展开
     * @values true of false
     */
    expand: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示工具栏下边线
     */
    hr: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示边框
     */
    border: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示阴影
     */
    shadow: {
      type: Boolean,
      default: false
    },
    /**
     * 圆角
     */
    round: {
      type: Boolean,
      default: false
    },
    /**
     * 图标
     */
    icon: {
      type: String,
      default: 'https://images.vrm.cn/bjb/icons/arrow-right.svg'
    },
    /**
     * 是否显示折叠按钮，默认显示
     */
    showExpandButton: {
      type: Boolean,
      default: true
    },
    expandText: {
      type: String,
      default: ''
    },
    unexpandText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: this.expand
    }
  },
  computed: {
    buttonText() {
      return this.visible ? this.expandText : this.unexpandText
    }
  },
  watch: {
    expand: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.visible = val
        }
      }
    }
  },
  methods: {
    onChange() {
      this.visible = !this.visible
      /**
       * change事件
       * @events change
       * @property {boolean} expand 是否展开
       */
      this.$emit('change', this.visible)
    }
  }
}
</script>

<style lang="scss" scoped>
.b-accordion {
  background: #fff;
  position: relative;

  &.shadow {
    box-shadow: 0 0 0.26667rem 0 rgb(107 107 107 / 13%);
  }

  &.round {
    border-radius: 20px;
  }

  &-inner.border {
    border: 1px solid rgba(243, 244, 245, 1);
  }

  &-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 34px 30px;

    &.hr {
      border-bottom: 1px solid rgba(243, 244, 245, 1);
    }
  }

  &-title {
    font-size: 38px;
    font-weight: 500;
    color: #333;
    line-height: 40px;
  }

  ::v-deep .md-button-content {
    padding-left: 0;
    padding-right: 0;
    vertical-align: top;
  }

  &-arrow--icon {
    width: 36px;
    height: 36px;
    color: #bbb;
    transform: rotate(90deg);
    transition: all 0.25s ease;

    &.up {
      transform: rotate(-90deg);
    }
  }
}
</style>

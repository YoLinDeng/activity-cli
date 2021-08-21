<template>
  <div class="b-agree">
    <div class="b-agree-prepend" v-if="prepend || $slots.prepend">
      <!-- @slot 前追加内容 -->
      <slot name="prepend" v-if="$slots.prepend"></slot>
      <span v-if="prepend">{{ prepend }}</span>
    </div>
    <div class="b-agree-content">
      <div class="b-agree-content--inner" v-for="(item, index) in agreeFiles" :key="index">
        <template v-if="item.before">
          <span class="b-agree-item--before">{{ item.before }}</span>
        </template>
        <template v-if="item.fileUrl && !item.children">
          <template v-if="isUsePdfLoader">
            <span
              class="b-agree-item"
              @click="initPdfPreview(item.fileUrl || item.assetLink, item.fileName || item.assetName)"
            >
              《{{ item.fileName || item.assetName }}》
            </span>
          </template>
          <template v-else>
            <a
              class="b-agree-item"
              :href="item.fileUrl || item.assetLink"
              target="_blank"
            >
              《{{ item.fileName || item.assetName }}》
            </a>
          </template>
        </template>
        <template v-else>
          <span
            class="b-agree-item"
            @click="onShowChildAgree(item)"
          >
            《{{ item.fileName || item.assetName }}》
          </span>
        </template>
         <template v-if="item.after">
          <span class="b-agree-item--after">{{ item.after }}</span>
        </template>
      </div>
    </div>
    <div class="b-agree-append" v-if="append || $slots.append">
      <!-- @slot 后追加内容 -->
      <slot name="append">{{ append }}</slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mand-mobile'

/**
 * 协议文件组件
 * @displayName b-agree
 */
export default {
  name: 'AgreeChild',
  inject: ['isUsePdfLoader'],
  props: {
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
    }
  },
  methods: {
    async onShowChildAgree(item) {
      const options = item.children.map((o, i) => {
        return {
          label: o.fileName || o.assetName,
          value: i,
          url: o.fileUrl || o.assetLink
        }
      })
      if (this.$actionSheet) {
        this.$actionSheet.value = true
        this.$actionSheet.options = options
      } else {
        this.$actionSheet = await this.createActionSheet(options, true)
      }
    },
    async createActionSheet(options, value = false) {
      const $el = document.createElement('div')
      document.body.appendChild($el)
      const ActionSheet = (await import('mand-mobile/lib/action-sheet')).default
      const that = this
      return new Vue({
        data() {
          return {
            value: value,
            options: options || []
          }
        },
        components: {
          [ActionSheet.name]: ActionSheet
        },
        render: function(h) {
          return h(ActionSheet.name, {
            class: 'b-agree-action-sheet',
            props: {
              value: this.value,
              cancelText: '关闭',
              options: this.options
            },
            on: {
              hide: () => {
                this.value = false
              },
              selected: ({ url, label }) => {
                if (that.isUsePdfLoader) {
                  that.initPdfPreview(url, label)
                } else {
                  url && window.open(url)
                }
              }
            }
          })
        }
      }).$mount($el)
    },
    async initPdfPreview(url, pdfname) {
      Toast.loading()
      const $el = document.createElement('div')
      document.body.appendChild($el)
      const pdfPreview = (await import('./pdf-preview')).default
      return new Vue({
        data() {
          return {
            options: {
              url,
              pdfname
            }
          }
        },
        components: {
          [pdfPreview.name]: pdfPreview
        },
        render: function(h) {
          return h(pdfPreview.name, {
            props: {
              options: this.options
            },
            on: {
              hide: () => {
                const pdfPreview = document.querySelector('#bPdfPreview')
                pdfPreview.parentNode.removeChild(pdfPreview)
              }
            }
          })
        },
        mounted() {
          Toast.hide()
        }
      }).$mount($el)
    }
  }
}
</script>

<style lang="scss">
.b-agree {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  font-size: 26px;
  color: #666;

  &-prepend,
  &-content,
  &-append {
    display: inline;
    line-height: 45px;
  }

  &-content--inner {
    display: inline-flex;
    flex-wrap: wrap;
  }

  &-item {
    font-size: 28px;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    color: #4088eb;
  }

  .md-action-sheet-item {
    display: flex;
    align-items: center;
    height: auto;
    line-height: 1.5;
    color: #4088eb;
  }

  .md-action-sheet-item-section {
    padding: 10px 0;
  }
}
</style>

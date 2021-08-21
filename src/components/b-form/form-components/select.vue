<template>
  <div>
    <input :value="value" :placeholder="config.placeholder" readonly @click="visible = true" />
    <md-selector
      v-model="visible"
      :data="optionsList"
      :default-value="value"
      max-height="320px"
      :title="config.placeholder"
      large-radius
      @choose="confirm"
    ></md-selector>
  </div>
</template>

<script>
import { Selector } from 'mand-mobile'

export default {
  components: {
    [Selector.name]: Selector
  },
  props: {
    value: {},
    config: {}
  },
  inheritAttrs: false,
  data() {
    return {
      visible: false,
      optionsList: [],
      optionsData: [
        {
          dataType: 'CertiType',
          options: [
            {
              value: '身份证',
              text: '身份证'
            }
          ],
          value: '身份证'
        },
        {
          dataType: 'Nationality',
          options: [
            {
              value: '中国',
              text: '中国'
            }
          ],
          value: '中国'
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { options, code } = this.config
      const data = this.optionsData.find((x) => code.includes(x.dataType)) || {}
      this.optionsList = options || data.options
    },
    confirm(e) {
      const { value } = e
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.md-date-picker {

  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .md-popup-box {
    max-width: 750px;
    margin: 0 auto;
  }
}
</style>

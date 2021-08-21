<template>
  <div>
    <md-radio-group v-model="radioValue">
      <md-radio-box
        v-for="(radio, index) in optionsList"
        :key="index"
        :name="radio.value"
        :disabled="config.disabled"
      >
        {{ radio.text }}
      </md-radio-box>
    </md-radio-group>
  </div>
</template>

<script>
import { RadioBox, RadioGroup } from 'mand-mobile'

export default {
  components: {
    [RadioBox.name]: RadioBox,
    [RadioGroup.name]: RadioGroup
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String
    },
    config: {}
  },
  data() {
    return {
      optionsList: [],
      radioValue: '',
      options: [
        { text: '男', value: '男' },
        { text: '女', value: '女' }
      ]
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    radioValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.radioValue = val
    },
    config(val) {
      const { options } = val
      this.optionsList = options || this.options
    }
  },
  methods: {
    init() {
      const { options, value } = this.config
      this.optionsList = options || this.options
      const val = value || this.options[0].value
      this.radioValue = val
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.md-radio-group {
  display: flex;
  align-items: center;
}

.md-radio-box {
  font-size: 28px;
  border-color: #e6e6e6;

  &:not(:first-child) {
    margin-left: 15px;
  }

  .md-tag {
    display: none;
  }
}
</style>

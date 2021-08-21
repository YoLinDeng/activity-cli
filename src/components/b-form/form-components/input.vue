<template>
  <div>
    <input
      :type="config.type"
      :placeholder="config.placeholder"
      :maxlength="config.maxlength || 200"
      :value="value"
      @input="onInput"
    />
    <span class="unit" v-if="config.Unit">{{config.Unit}}</span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {},
    config: {}
  },
  data() {
    return {}
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.unit {
  display: inline-block;
  margin-left: 10px;
  font-size: 36px;
}
</style>

<template>
  <div class="b-form-item">
    <label v-if="label" class="b-form-item__label">{{ label }}</label>
    <div class="b-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  name: 'b-form-item',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop]
      if (rules) {
        const value = this.form.formData[this.prop]
        const descriptor = { [this.prop]: rules }
        const schema = new Schema(descriptor)
        return new Promise((resolve, reject) => {
          schema.validate(
            {
              [this.prop]: value
            },
            errors => {
              !errors ? resolve() : reject(errors)
            }
          )
        })
      }
    }
  }
}
</script>

<style lang="scss">
.b-form-item__label {
  color: #666;
  font-size: 32px;
  padding-right: 20px;
}

.b-form-item__content {
  flex: 1;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>

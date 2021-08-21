<template>
  <form class='b-form'>
    <section class="b-form-block">
      <div class="dynamic-form__content">
        <template v-for="(field, index) in config.fields">
          <template v-if="!field.hide">
            <template v-if="field.type !== 'other-fields'">
              <c-form-item :label="field.name" :prop="field.code" :key="index">
                <component
                  :is="`f-${field.type}`"
                  :config="options(field)"
                  v-bind="$attrs"
                  v-model="formData[field.code]"
                ></component>
                <button
                  v-if="field.code === 'mobileCode'"
                  :disabled="formData.mobile ==='' || formData.mobile.length < 11 || disabled"
                  :class="{'send-code-btn': true, disabled: formData.mobile ==='' || formData.mobile.length < 11 || disabled}"
                  @click.prevent="getTestCode"
                >{{disabled ? `${timer}s` : '获取验证码'}}</button>
              </c-form-item>
            </template>
            <template v-else>
              <div class="other-item" :key="index">
                <div class="other-item" :key="index">
                  <c-form-item
                    v-if="options(field).options.length > 4"
                    :prop="field.code"
                    :key="index"
                  >
                    <component :is="`f-select`" :config="options(field)" v-model="form[field.code]"></component>
                  </c-form-item>
                  <f-radio
                    v-else
                    :key="index"
                    :config="options(field)"
                    v-bind="$attrs"
                    v-model="form[field.code]"
                  ></f-radio>
                </div>
              </div>
            </template>
          </template>
        </template>
      </div>
    </section>
    <div class="agreement" v-if="config.agreement">
      <div class="agreement-icon" :class="{'checked': this.config.agreement.isCheckService}" @click="this.config.agreement.isCheckService = !this.config.agreement.isCheckService">
        <img src="https://images.vrm.cn/3u/2021/03/09/gou.png" class="agreement-icon__img" v-show="this.config.agreement.isCheckService">
      </div>
      <div class="agreement-content">
        <span class="agreement-begin-text">{{ config.agreement.beginText }}</span>
        <div
          v-for="(item, index) in config.agreement.list"
          :key="index"
          class="agreement-list"
        >
          <span class="agreement-list__front">{{ item.front }}</span>
          <a :href="item.link">{{ item.content }}</a>
          <span class="agreement-list__back">{{ item.back }}</span>
        </div>
      </div>
    </div>
    <div class="submit-box" @click="submit" v-if="config.submitBtn">
      <img :src="config.submitBtn.content" v-if="config.submitBtn.type === 'image'" class="submit-image">
      <div class="submit-text" v-else>{{ config.submitBtn.content }}</div>
    </div>
  </form>
</template>

<script>
import cFormItem from './form-item'
import { validate } from './validate'
import fInput from './form-components/input'
// import fSelect from './form-components/select'
// import fRadio from './form-components/radio'
import { Toast } from 'mand-mobile'

export default {
  name: 'b-form',
  provide() {
    return {
      form: this
    }
  },
  props: {
    /**
     * 表单自定义配置
     */
    value: {
      type: Object
    }
  },
  components: {
    cFormItem,
    fInput,
    // fSelect,
    // fRadio
  },
  computed: {
    disabled() {
      return +this.timer > 0
    },
    config() {
      return this.value ? this.value : this.baseConfig
    }
  },
  data() {
    return {
      formData: {
        name: '',
        mobile: '',
        mobileCode: ''
      },
      rules: {},
      timer: 0,
      baseConfig: {
        fields: [{
          code: 'name',
          name: '姓名',
          type: 'input',
          hide: 0
        },
        {
          code: 'mobile',
          name: '手机号',
          type: 'input'
        },
        {
          code: 'mobileCode',
          name: '验证码',
          type: 'input'
        },
        {
          code: 'idcard',
          name: '身份证',
          type: 'input'
        },
        {
          code: 'age',
          name: '年龄',
          type: 'select',
          options: [
            {
              text: '18',
              value: '18'
            },
            {
              text: '19',
              value: '19'
            },
            {
              text: '20',
              value: '20'
            }
          ]
        }],
        showOtherItemByMobileInfo: false,
        agreement: {
          check: true,
          isCheckService: true,
          beginText: '我已阅读并同意',
          list: [
            {
              front: '',
              content: '《服务协议》',
              back: '',
              link: ''
            }
          ]
        },
        submitBtn: {
          type: 'text',
          content: '提交表单'
        }
      }
    }
  },
  mounted() {
    // 初始化设置默认值、校验规则
    this.config.fields.forEach((field) => {
      const { code } = field
      this.rules[code] = validate(field)
    })
  },
  methods: {
    formValidate (cb) {
      const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
      let flag = false
      Promise.all(tasks).then(() => {
        flag = true
        cb(flag)
      }).catch(([error]) => {
        flag = false
        Toast.info(error.message)
        cb(flag)
      })
    },
    submit() {
      this.formValidate(valid => {
        if (valid) {
          const { check, isCheckService } = this.config.agreement
          if (check && !isCheckService) {
            Toast.info('请勾选服务协议')
          } else {
            this.$emit('submit', this.formData)
          }
        }
      })
    },
    // 初始化各组件配置
    options(field) {
      const { type, name, code, placeholder, maxlength } = field
      const text = type === 'input' ? '请输入' : '请选择'
      let placeholderText = placeholder ? placeholder : `${text}${name}`
      return {
        ...field,
        placeholder: placeholderText,
        type: type === 'input' ? (code.includes('mobile') ? 'tel' : 'text') : type,
        maxlength: maxlength || ''
      }
    },
    getTestCode () {
      this.testPhone()
    },
    // 短信接口
    sendCode() {
      this.$emit('sendCode')
      this.countDown()
    },
    countDown() {
      this.timer = 60
      this._timer = setInterval(() => {
        this.timer--
        this.timer === 0 && clearInterval(this._timer)
      }, 1000)
    },
    testPhone () {
      const pattern = /^0?((13[0-9])|(14[0-9])|(15([0-3]|[5-9]))|(166)|(18[0-9])|(17[0-9])|(19[8-9]))[0-9]{8}$/
      const reg = new RegExp(pattern)
      if (this.formData.mobile !== '') {
        if (!this.disabled && reg.test(this.formData.mobile)) {
          this.sendCode()
        } else {
          Toast.info('手机号格式错误')
        }
      } else {
        Toast.info('请输入您的手机号')
      }
    }
  }
}
</script>

<style lang="scss">
.b-form {
  padding: 20px;

  .other-item {
    padding: 20px 0;
  }

  &-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 26px 20px;
    border: 1px solid #ccc;
    background: #fff;
    margin: 20px 0;
    border-radius: 8px;
    input {
      display: block;
      width: 100%;
      height: 100%;
      color: #333;
      text-align: left;
      font-size: 32px;
      border: 0;
      outline: none;
      background: none;
    }

    .send-code-btn {
      color: #db9c55;
      border: 1px solid #e3ba8a;
      background-color: #fff;
      width: 200px;
      height: 80%;
      border-radius: 5px;
      font-size: 32px;
      text-align: center;
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;
      outline: none;

      &.disabled {
        background: #EBEBEB!important;
        border: 1px solid #EBEBEB!important;
        color: #999999;
      }
    }
  }

  .submit-box {

    .submit-text {
      height: 90px;
      line-height: 90px;
      text-align: center;
      border-radius: 50px;
      background: #fe9103;
      color: #fff;
      font-weight: 500;
      margin: 30px auto;
      font-size: 30px;
    }

    .submit-image {
      height: 123px;
      margin: 20px auto;
      display: block;
    }
  }

  .agreement {
    line-height: 0;
    margin: 20px;
    display: flex;
    align-items: center;
    font-size: 26px;

    &-icon {
      width: 30px;
      height: 30px;
      background: #d5d5d5;
      border-radius: 50%;
      display: inline-block;
      position: relative;

      &.checked {
        background: #d9985d;
      }

      &__img {
        width: 18px;
        height: 13px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }

    &-content {
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      line-height: 40px;
    }

    &-begin-text {
      color: #999999;
      margin-left: 10px;
    }

    &-list {
      color: #999999;
      margin-left: 10px;

      a {
        color: #d9985d;
      }
    }
  }
}
</style>
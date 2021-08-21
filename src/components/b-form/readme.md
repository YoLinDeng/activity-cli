### 默认
**默认配置**
```js
baseConfig = {
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
  },
  {
    code: 'relationship',
    type: 'other-fields',
    options: [
      {
        text: '本人',
        value: '本人'
      },
      {
        text: '配偶',
        value: '配偶'
      },
      {
        text: '父母',
        value: '父母'
      },
      {
        text: '子女',
        value: '子女'
      }
    ],
    value: '本人'
  }],
  agreement: {
    check: true,
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
```
#### 配置说明：
**fields**

fields为字段数组对象,每一项包含code（字段英文）、name（字段中文）、type（类型）、options（多选项）、hide（是否隐藏）
* code：name、mobile、mobileCode、idcard具有特定的样式或校验规则，则可自定义字段。另外当使用ohter-fields时，会自动判断options的项，如果大于4则为选择框（select）否则为单选项。
* name：为字段的中文名称，用于表单项的label文案展示
* type：包括input、select、radio，后期需要还可定义其他，可在form-components目录中扩展
* options：当type为slect或radio时候需要传入，options为一个数组对象，对象包括text(展示值)、value(实际值)
* hide：是否隐藏该项，1为隐藏，0为展示

**showOtherItemByMobileInfo**
开启手机号填写完毕后展示其他项，默认值为false

**agreement** 

agreement用于配置协议内容, 包含check、beginText、list
* check：表示提交表单时是否校验勾选，校验为true，否则为false
* beginText: 协议开头的文案描述
* list：表示协议列表数组对象，其中每一项都包含front(协议开头文案)、back(协议结尾文案)、content(协议文案)、link(协议链接)

**submitBtn**

submitBtn为按钮配置内容，包含type和content
* type：为按钮类型，可取text(文本类型)、image（图片类型）
* content: 按钮内容，如果为text类型，值为文案内容，若为image类型，值为按钮图片cdn地址。

```html
<b-form v-model="config" @submit="submit"></b-form>
```
<template>
  <div class="popup-wrapper" v-if="visiblePopup">
    <md-popup
      ref="popup"
      :position="position"
      v-model="visible"
      :mask-closable="isMaskClose"
      @hide="hide">
      <div class="md-popup-center">
        <slot></slot>
      </div>
      <md-icon v-if="showCloseBtn" name="close" size="lg"  @click="hide"></md-icon>
    </md-popup>
  </div>
</template>

<script>
import { Popup, Icon } from 'mand-mobile'

export default {
  name: 'BPopup',
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon
  },
  props: {
    value: {},
    position: {
      type: String,
      default: 'center'
    },
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    isMaskClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: true,
      visiblePopup: this.value || false
    }
  },
  methods: {
    hide () {
      this.visible = true,
      this.visiblePopup = false
      this.$emit('closePopup')
    }
  },
  watch: {
    value (val) {
      this.visiblePopup = val
    }
  }
}
</script>

<style lang="scss">
.close {
  display: block;
  text-align: center;
  color: #fff;
  margin: 50px auto!important;
}
</style>

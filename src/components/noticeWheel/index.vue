<template>
  <div class="notice-wheel-wrapper">
    <md-swiper
      class="swiper-container"
      :default-index="1"
      :dragable="false"
      :autoplay="3000"
      :has-dots="false"
      transition="slideY">
      <md-swiper-item :key="$index" v-for="(item, $index) in value" class="swiper-item">
        {{ item.text }}
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'mand-mobile'

export default {
  name: 'notice-wheel',
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        loop: true,
        autoplay: true,
        observer: true,
        observeParents: true,
        slidesPerView: 1
      }
    }
  },
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-wheel-wrapper {
  text-align: center;
  overflow: hidden;
  display: flex;
  color: #666666;
  justify-content: space-between;
  .swiper-container {
    height: 50px;
    line-height: 50px;
    .swiper-item {
      font-size: 24px;
      line-height: 50px;
        &-info {
        display: inline-block;
        vertical-align: middle;
        font-size: 26px;
      }
    }
  }
}
</style>
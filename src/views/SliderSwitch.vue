<script setup lang="ts">

defineProps({
  //接收isChecked作为prop（Vue3用法）
  isChecked: {
    type: Boolean,
    default: false,
  },
})


//定义update:isChecked事件，用于把新值传递给父组件
const emit = defineEmits(['update:isChecked'])

//当input发生变化时，emit出新值
function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:isChecked', input.checked)
}


</script>
<template>
  <div>
    <label class="switch">
      <input type="checkbox" :checked="isChecked" @change="onChange" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

/* 将实际的checkbox隐藏(display:none;) */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* 用span的背景色变换模拟滑块轨道 */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc; /* 关闭状态下的底色 */
  border-radius: 34px; /* 圆角效果 */
  transition: 0.4s; /* 动画过渡时间 */
}

/* 滑块的小圆点，使用::before伪元素 */
.slider::before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: #fff; /* 小圆点的颜色 */
  border-radius: 50%;
  transition: 0.4s;
}

/* 当checkbox被选中时，让轨道的背景、圆点的位置产生变化 */
.switch input:checked + .slider {
  background-color: #27ae60;
}
.switch input:checked + .slider::before {
  transform: translateX(26px); /* 打开开关 */
}
</style>

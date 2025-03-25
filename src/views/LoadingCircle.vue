<template>
  <div>
    <div class="rotateAnimation w-4 h-4 border-[3px] border-[#ccc] border-t-[#3a6bea] border-r-[#3a6bea] rounded-full"></div>
  </div>
</template>

<style scoped> 

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    } 
    100% {
      transform: rotate(360deg);
    }
  }
  .rotateAnimation {
    animation: rotate 1s linear infinite;
  }

</style>
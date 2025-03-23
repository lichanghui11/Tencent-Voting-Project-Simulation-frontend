<template>
  <div>
    <h1 class="text-center h-[50px] my-0 font-bold pt-2 text-black">腾讯投票</h1>

    <div class="bg-[#f2f4f7]">
      <RouterLink
        to="/create?type=single"
        class="flex flex-col mb-4 text-white hover:text-[#00bd73] bg-white h-[250px]"
      >
        <span class="text-center text-[100px] my-3">📗</span>
        <div class="flex items-center justify-center">
          <span class="px-10 py-2 bg-[#3a6bea] rounded text-white text-center w-4/6">创建单选</span>
        </div>
      </RouterLink>
      <RouterLink
        to="create?type=multiple"
        class="flex flex-col text-white hover:text-[#00bd73] bg-white h-[250px]"
      >
        <span class="text-center text-[100px] my-3">📚</span>
        <div class="flex items-center justify-center">
          <span class="px-10 py-2 bg-[#3a6bea] rounded text-white text-center w-4/6">创建多选</span>
        </div>
      </RouterLink>
    </div>

    <div class="text-[#bcc1cb] text-[14px] leading-8 flex items-center justify-center">
      <el-icon :size="20"><MostlyCloudy /></el-icon>
      没有人提供计算服务
    </div>
  </div>
</template>

<script setup lang="ts"></script>

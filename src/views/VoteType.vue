<template>
  <div class="flex flex-col ">
    <RouterLink to="/create?type=single" class="flex flex-col mb-[80px] text-white hover:text-[#00bd73]">
      <span class="text-center text-[100px] ">📗</span>
      <span class="px-10 py-2 bg-[#2196f3] rounded  text-center">创建单选</span>
    </RouterLink >
    <RouterLink to="create?type=multiple" class="flex flex-col text-white hover:text-[#00bd73]">
      <span class="text-center text-[100px]">📚</span>
      <span class="px-10 py-2 bg-[#2196f3]  rounded  text-center">创建多选</span>
    </RouterLink >
  </div>
</template>
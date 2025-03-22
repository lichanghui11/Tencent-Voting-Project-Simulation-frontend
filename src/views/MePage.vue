

<template>
  <div class="h-[20vh] flex items-center">
    <span class="grow-1 text-[85px] text-center">🐹</span>
    <div class="grow-4">昵称</div>
  </div>
  <div class="flex flex-col ">
    <RouterLink to="/my-votes" class="hover:text-[#00bd73] border-b-[1px] leading-[40px] mb-[10px]">
      我的投票 
      <span class="absolute right-[40px]">&gt;</span>
    </RouterLink >
    <RouterLink to="" class="hover:text-[#00bd73] border-b-[1px] leading-[40px] mb-[10px]">
      个人设置 
      <span class="absolute right-[40px]">&gt;</span>
    </RouterLink >
    <RouterLink to="" class="hover:text-[#00bd73] border-b-[1px] leading-[40px] mb-[10px]">
      反馈建议 
      <span class="absolute right-[40px]">&gt;</span>
    </RouterLink>


  </div>
</template>
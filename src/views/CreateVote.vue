<template>
  <div>
    <div class="bg-white">
      <div class="text-center px-4 pt-[5px]">
        <NavBar
          :title="`创建${type}投票`"
          left-arrow
          @click-left="onClickLeft"
          class=""
        />
        <!-- <RouterLink to="/vote-type" class="flex items-center justify-center">
          <span class="flex leading-4">
            <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
          </span>
          <span class="flex items-center justify-center font-bold"
            >创建{{ type }}投票</span
          >
        </RouterLink> -->
      </div>

      <div class="flex flex-col space-y-2 pl-4 pr-4">
        <input
          class="focus:ring border-b-[1px] my-2 text-[30px] border-[#dddfe7] leading-[50px]"
          type="text"
          placeholder="投票标题"
          v-model="title"
        />
        <input
          class="focus:ring border-b-[1px] my-2 text-[] border-[#dddfe7] leading-[50px]"
          type="text"
          placeholder="补充描述(选填)"
          v-model="description"
        />
        <div
          class="flex items-center gap-[10px] w-full"
          v-for="(option, i) of options"
          :key="i"
        >
          <span
            @click="deleteOption(i)"
            class="pseudo-delete cursor-pointer relative inline-block w-[20px] h-[20px] bg-red-600 rounded-full"
          ></span>
          <input
            class="focus:ring w-full border-b-[1px] text-xl border-[#dddfe7] leading-[50px]"
            type="text"
            placeholder="选项"
            v-model="options[i]"
          />
        </div>
        <div
          class="text-[#3a6bea] flex items-center gap-[10px] w-full cursor-pointer h-[50px]"
          @click="addOption"
        >
          <span
            class="pseudo-add cursor-pointer relative inline-block w-[20px] h-[20px] rounded-full bg-[#3a6bea]"
          ></span>
          <button class="w-full text-left cursor-pointer">添加选项</button>
        </div>
      </div>
    </div>

    <div class="分割线 h-[40px] bg-[#f2f4f7]"></div>

    <div class="space-y-2 bg-white pl-4 pr-4">
      <div
        class="h-[50px] border-b-[1px] border-[#dddfe7] flex justify-between items-center"
      >
        截止日期

        <button @click="show = true">
          {{ deadDate.join("-") }} {{ deadTime.join(":") }}
        </button>
        <Popup round :show="show" position="bottom">
          <PickerGroup
            title="截止时间"
            :tabs="['选择日期', '选择时间']"
            @confirm="show = false"
          >
            <DatePicker v-model="deadDate" />
            <TimePicker v-model="deadTime" />
          </PickerGroup>
        </Popup>

        <!-- <el-date-picker·
          class=""
          v-model="deadline"
          type="datetime"
          placeholder="请选择截止时间"
          :editable="false"
          :popper-append-to-body="true"
          format="YYYY-MM-DD HH:mm"
          style="width: 175px"
        /> -->
      </div>
      <div
        class="h-[50px] border-b-[1px] border-[#dddfe7] flex justify-between items-center"
      >
        匿名投票
        <SliderSwitch
          :isChecked="anonymous"
          @update:isChecked="($event) => (anonymous = $event)"
          v-model="anonymous"
        />
      </div>
    </div>

    <div class="分割线 h-[40px] bg-[#f2f4f7]"></div>

    <div class="text-center bg-[#f2f4f7] pb-[20px]">
      <button
        class="cursor-pointer px-10 py-2 bg-[#3a6bea] !text-white rounded mt-[30px] w-7/8 mx-auto ml-auto"
        @click="create"
      >
        完成
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import SliderSwitch from "./SliderSwitch.vue";
import axios from "axios";
import { useLogin } from "../hooks.ts";
import { TimePicker, Popup, DatePicker, PickerGroup, NavBar } from "vant";

const route = useRoute();
const router = useRouter();
const type = computed(() => (route.query.type === "single" ? "单选" : "多选"));

const options = ref([""]);
const title = ref("");
const description = ref("");
//根据vant组件库调整日期显示格式
function getDateArray() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  // 月份从0开始，所以要加1
  const day = String(today.getDate()).padStart(2, "0");

  return [year, month, day];
}
function getTimeArray() {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, "0"); // 获取小时并格式化为两位
  const minutes = String(today.getMinutes()).padStart(2, "0"); // 获取分钟并格式化为两位

  return [hours, minutes];
}
const date = getDateArray();
// const deadDate = ref(date)
const deadDate = ref(date);
const time = getTimeArray();
const deadTime = ref(time);

const deadline = computed(() => {
  //return new Date('2022-02-22 02:22') 这种方式更简便
  const year = Number(deadDate.value[0]);
  const month = Number(deadDate.value[1]) - 1; // JavaScript 中的月份从 0 开始
  const day = Number(deadDate.value[2]);
  const hours = Number(deadTime.value[0]);
  const minutes = Number(deadTime.value[1]);
  return new Date(year, month, day, hours, minutes);
});

const anonymous = ref(false);
function addOption() {
  options.value.push("");
}
function deleteOption(i: number) {
  options.value.splice(i, 1);
}

const multiple = computed(() => type.value === "多选");

const isLogin = useLogin();
async function create() {
  //判断标题、选项是否为空？ 是否只有一个选项？这两种情况都不允许提交
  //title.value options.value
  if (title.value.trim() === "") {
    alert("标题不能为空！");
    return;
  }
  if (options.value.length < 2) {
    alert("选项不能只有一个！");
    return;
  }
  if (options.value[0] === "" || options.value[1] === "") {
    alert("选项内容不能为空！");
    return;
  }
  const voteInfo = {
    title: title.value,
    desc: description.value,
    deadline: deadline.value,
    anonymous: anonymous.value,
    multiple: multiple.value,
    options: options.value,
  };
  const res = await axios.post("/vote", voteInfo);
  if (isLogin) {
    //登录成功
    const id = res.data.result.voteId;
    router.replace("/vote/" + id);
  } else {
    router.push("/login?next=" + route.fullPath);
  }
}

//自定义vant的日期选择器
const show = ref(false);
const onClickLeft = () => history.back();
//顶部导航栏
</script>

<style>
:root {
  --van-padding-md: 0;
  --van-nav-bar-icon-color: #3a6bea;
}
</style>

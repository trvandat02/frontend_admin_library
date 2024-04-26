<script setup>
const props = defineProps({
    book: Object
});

const isOverdue = (returnDate) => {
  const currentDate = new Date();
  const returnDateObj = new Date(returnDate);
  return currentDate > returnDateObj;
};
</script>
<template>
      <div class="w-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <router-link :to="``">
          <img class="w-52 h-60 rounded-t-lg" :src="`http://localhost:3001/${props.book.img}`" alt="" />
          <div class="p-2">
            <p class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-wrap">
              {{ props.book.title }}
            </p>
            <p class="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400 text-left">
              Số lượng: {{ props.book.quantity}}
            </p>
            <p class="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400 text-left">
              Ngày mượn: {{ props.book.borrowDate.slice(0, 10)}}
            </p>
            <p class="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400 text-left">
              Ngày trả: {{ props.book.returnDate.slice(0, 10)}}
            </p>
            <!-- <p class="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400 text-left">
              Trạng thái: {{ props.book.returned ? 'Đã trả' : 'Chưa trả' }}
            </p> -->
            <p class="mb-2 font-normal text-sm text-left">
          Trạng thái:
          <span v-if="props.book.returned" class="text-green-500">Đã trả</span>
          <span v-else-if="isOverdue(props.book.returnDate)" class="text-red-500">Quá hạn</span>
          <span v-else class="text-yellow-500">Chưa trả</span>
        </p>
          </div>
        </router-link>
      </div>
  </template>
  
  
  
<script setup>
import { ref } from 'vue';
import { ItemCard } from '.';
import ItemPublisher from './itemPublisher.vue';

const props = defineProps({
    data: []
})
const data = props.data.slice();
const result = ref(data.slice(0, 3));
const closed = ref(false);

const handleChange = (e) => {
    const input = e.target.value;
    result.value = data.filter(
        f => f.email ? f.email.toLowerCase().includes(input.toLowerCase())
            : f.title ? f.title.toLowerCase().includes(input.toLowerCase())
                : f.name.toLowerCase().includes(input.toLowerCase())) ;

}

const emit = defineEmits(['sendClosed'])
const notifyClosed = () => {
    closed.value = true;
    emit('sendClosed', true);
}

</script>

<template>
    <div v-if="!closed" class="w-full absolute z-50 p-4 bg-gray-200 rounded-lg dark:bg-gray-800">
        <button type="button" @click="notifyClosed"
            class="absolute z-50 top-0 end-2.5 text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
        </button>
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Tìm kiếm
        </label>
        <div class="relative mt-6">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input type="search" id="default-search" @change="handleChange"
                class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tìm kiếm..." />
        </div>
        <ul class="divide-y divide-gray-200 border dark:divide-gray-700 bg-gray-100 rounded-md dark:border-gray-600">
            <ItemCard v-if="result[0].email || result[0].title" v-for="item in result" :key="item._id" :item="item" />
            <ItemPublisher v-if="!result[0].email && !result[0].title" v-for="item in result" :key="item._id" :item="item"/>
        </ul>
    </div>

</template>
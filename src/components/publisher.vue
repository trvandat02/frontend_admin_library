<script setup>
import { ItemPublisher } from '.'

const props = defineProps({
    title: String,
    data: Array
})

</script>

<template>
    <div v-if="props.data.length > 0"
        class=" relative p-2 rounded-lg dark:bg-gray-900 dark:border dark:border-gray-600">
        <h1 class=" text-blue-500 text-center font-bold text-2xl dark:text-white mb-5">
            {{ props.title }}
        </h1>
        <div class="flex">
            <router-link :to="data[0].title ? '/borrowbook/add' : '/publisher/add'" class="ml-auto">
                <button type="button"
                    class="flex gap-3 text-white bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                            clip-rule="evenodd" />
                    </svg>
                    Thêm
                </button>
            </router-link>
        </div>

        <ul class="divide-y divide-gray-200 border dark:divide-gray-700 bg-gray-100 rounded-md dark:border-gray-600">
            <ItemPublisher v-for="item in props.data" :key="item._id" :item="item" />
        </ul>
    </div>
</template>
<script setup>
import { ItemBorrow } from '../components'

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
            <router-link :to="data[0].title ? '/borrowbook/add' : ''" class="ml-auto">
            </router-link>
        </div>

        <ul class="divide-y divide-gray-200 border dark:divide-gray-700 bg-gray-100 rounded-md dark:border-gray-600">
            <ItemBorrow v-for="item in props.data" :key="item._id" :item="item" />
        </ul>
    </div>
</template>
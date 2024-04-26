<script setup>
import { ref } from 'vue';
import { Delete } from '../components';
import axios from 'axios';
const props = defineProps({
    item: Object
})

const showDeletePopUp = ref(false);

const handleShowDeletePopUp = () => {
    showDeletePopUp.value = true;
}

const handleClosed = (e) => {
    showDeletePopUp.value = !e;
}

const handleDeleted = (e) => {
   axios.delete(import.meta.env.VITE_SERVER_URL + `${props.item.email? 'api/users': 'api/books'}/${props.item._id}`)
    .then(res => {
        alert("Đã xóa!")
        window.location.reload();
    })
    .catch(err => console.log(err))
}

</script>

<template>
       <li class="relative flex justify-between p-4 hover:bg-blue-100 hover:cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700">
                <router-link :to="`${props.item.email? '/profile': '/book'}/${props.item._id}`">
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-shrink-0">
                            <img class="w-8 h-8 rounded-full"
                                :src="`http://localhost:3001/${props.item.img}`"
                                alt="book">
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {{ props.item.name? props.item.email: props.item.title }}
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                               {{ props.item.email? props.item.name: props.item.author }}
                            </p>
                        </div>
                        
                    </div>
                </router-link>
                <div class="flex bg-gray-100 border rounded-lg border-blue-100 dark:border-gray-600 dark:bg-gray-900">
                    <button class="p-1.5 rounded-s-lg hover:bg-gray-300 dark:hover:bg-gray-800">
                        <router-link :to="`${props.item.email? '/profile': '/book'}/${props.item._id}`">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                    clip-rule="evenodd" />
                                <path fill-rule="evenodd"
                                    d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </router-link>
                    </button>
                    <button @click="handleShowDeletePopUp"
                        class="p-1.5 border-s rounded-e-lg hover:bg-gray-300 dark:hover:bg-gray-800">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="absolute top-10 left-[30%] z-50">
                    <Delete v-if="showDeletePopUp" @sendClosed="handleClosed" @sendDeleted="handleDeleted"/>
                </div>
            </li>
</template>
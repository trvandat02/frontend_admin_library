<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref('');
const uid = ref('');
const data = ref({});
const title = ref('');
const quantity = ref('');
const email = ref('');
const borrowDate = ref('');
const returnDate = ref('');
const returned = ref(false);
const stored = ref({});

id.value = route.params.id;

onMounted(() => {
    axios.get(import.meta.env.VITE_SERVER_URL + `api/borrowedbooks/${id.value}`)
        .then(res => {
            data.value = res.data;
            const values = data.value;
            uid.value = values.uid;
            title.value = values.title;
            quantity.value = values.quantity;
            email.value = values.email;
            borrowDate.value = values.borrowDate;
            returnDate.value = values.returnDate;
            returned.value = values.returned;
        })
        .catch(err => console.error(err));
});

const handleUpdateReturned = async () => {
    try {
        const res = await axios.post(import.meta.env.VITE_SERVER_URL + `api/borrowedbooks/${id.value}`, { returned: returned.value });
        if (res.status === 200) {
            alert("Đã cập nhật!");
            window.location.reload();
        }
        console.log("stored.value before:", stored.value);
        stored.value.returned = true;
        stored.value.quantity += parseInt(quantity.value);;
    } catch (err) {
        console.error(err);
    }
}
</script>

<template>
    <div class="p-5">
        <h1 class="text-blue-500 text-center font-bold text-2xl dark:text-white">
            Chi tiết thông tin mượn sách
        </h1>
        <div class="p-5 mx-auto max-w-lg">
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Người mượn</label>
                <p class="text-gray-700 dark:text-white">{{ uid }}</p>
            </div>
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sách</label>
                <p class="text-gray-700 dark:text-white">{{ title }}</p>
            </div>
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
                <p class="text-gray-700 dark:text-white">{{ quantity }}</p>
            </div>
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày mượn</label>
                <p class="text-gray-700 dark:text-white">{{ borrowDate.slice(0, 10) }}</p>
            </div>
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày trả</label>
                <p class="text-gray-700 dark:text-white">{{ returnDate.slice(0, 10) }}</p>
            </div>
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Đã trả</label>
                <input type="checkbox" id="returned" v-model="returned"
                    class="rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div class="mb-6">
                <button @click="handleUpdateReturned"
                    class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                    Cập nhật
                </button>
            </div>
        </div>
    </div>
</template>

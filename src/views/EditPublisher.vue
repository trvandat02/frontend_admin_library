<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref('');
const data = ref({});
const name = ref('');
const address = ref('');
id.value = route.params.id;

onMounted(() => {
    axios.get(import.meta.env.VITE_SERVER_URL + `api/publishers/${id.value}`)
        .then(res => {
            data.value = res.data;

            const values = data.value;
            name.value = values.name;
            address.value = values.address;
        })
        .catch(err => console.log(err));
});

const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
        'name': name.value,
        'address': address.value,
    }

    axios.post(import.meta.env.VITE_SERVER_URL + `api/publishers/${id.value}`, values)
        .then(res => {
            if (res.status === 200) {
                alert("Cập nhật thành công!");
                document.location.reload();
            }
        })
        .catch(err => console.log(err))
}
</script>

<template>
    <div class="p-5">
     <h1 class="text-blue-500 text-center font-bold text-2xl dark:text-white">
         Thêm thông tin nhà xuất bản
     </h1>
     
 <form @submit="handleSubmit" class="p-5 mx-auto max-w-lg">
     <div class="mb-6">
         <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên nhà xuất bản</label>
         <input type="text" id="name" v-model="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kim Đồng" required />
     </div>
     <div class="mb-6">
         <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
         <input type="text" id="address" v-model="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ấp Hiệp Lợi, xã Hòa Bình, huyện Trà Ôn, tỉnh Vĩnh Long" required />
     </div> 
     <div class="flex items-center justify-center">
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</div> </form>
 
    </div>
 </template>
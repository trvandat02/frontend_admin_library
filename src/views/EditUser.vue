<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref('');
const data = ref({});
const showDeleted = ref(false);
const password = ref('');
const comfirmPassword = ref('');
const user = ref({
    name: '',
    email: '',
    img: '',
    password: '',
    permission: '',
    address: '',
});
id.value = route.params.id;

onMounted(() => {
    axios.get(import.meta.env.VITE_SERVER_URL + `api/users/${id.value}`)
        .then(res => {
            data.value = res.data;
            user.value = data.value;
        })
        .catch(err => console.log(err));
});

let file = null;

let error = {
    "name": '',
    "email": '',
    "password": '',
    "repeatPassword": '',
}
const validation = () => {
    const emailRegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordRedExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   
    if (!emailRegExp.test(user.value.email)) {
        error.email = 'Email không hợp lệ.';
    } else error.email = '';

    if (!passwordRedExp.test(password.value)) {
        error.password = 'Mật khẩu phải gồm ký tự HOA, thường, chữ số và ký tự đặc biệt.';
    } else error.password = '';

    if (password.value.trim() !== comfirmPassword.value.trim()) {
        error.repeatPassword = 'Mật khẩu không khớp.';
    } else error.repeatPassword = '';

}

const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
        const data = new FormData();
        data.append("file", file);

        axios.post(import.meta.env.VITE_SERVER_URL + 'api/file/upload', data)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            })
            .catch(err => console.log(err))
    }

    const values = {
        'name': user.value.name,
        'email': user.value.email,
        'img': file? file.name : user.value.img,
        'password': password.value.length > 0? password.value : user.value.password,
        'address': user.value.address,
    }
    
    axios.post(import.meta.env.VITE_SERVER_URL + `api/users/${id.value}`, values)
        .then(res => {
            if (res.status === 200) {
                alert("Cập nhật thành công!");
                router.push(`/profile/${id.value}`);
                
            }
        })
        .catch(err => console.log(err))
}
</script>

<template>
    <div class="p-5">
     <h1 class="text-blue-500 text-center font-bold text-2xl dark:text-white">
         Chỉnh sửa thông tin người dùng
     </h1>
 <form @submit="handleSubmit" class="p-5 mx-auto max-w-lg">
     <div class="mb-6">
         <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
         <input type="text" id="name"  v-model="user.name" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Trần Văn A" required />
         <p class="text-sm text-red-500 dark:text-red-600">{{ error.name }}</p>
     </div>
     <div class="mb-6">
         <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
         <input type="text" id="email" v-model="user.email" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
    </div> 
     <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
        <input type="password" id="password" v-model="password" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
        <p class="text-sm text-red-500 dark:text-red-600">{{ error.password }}</p>
    </div> 
    <div class="mb-6">
        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
        <input type="password" id="confirm_password" v-model="confirm_password" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
        <p class="text-sm text-red-500 dark:text-red-600">{{ error.confirm_password }}</p>
    </div> 
    <div class="mb-6">
         <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
         <input type="text" id="address" v-model="user.address" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hiệp Lơi, Hòa Bình, Trà Ôn, Vĩnh Long" required min="0"/>
    </div>
    <div class="mb-6">
         <label for="file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thêm ảnh đại diện</label>
         <input type="file" id="file" accept="image/*" @change="validation" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
    </div>  
    <div class="flex items-center justify-center">
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</div> </form>
 
    </div>
 </template>

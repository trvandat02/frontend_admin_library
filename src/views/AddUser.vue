<script setup>
import { ref } from 'vue';
import axios from 'axios';

let file = null;
const name = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const address = ref('');

let uploaded = '';
const handleChange = (e) => {
    file = e.target.files[0];
    uploaded = URL.createObjectURL(file);
}


let error = {
    "name": '',
    "email": '',
    "password": '',
    "confirm_password": '',
}
const validation = () => {
    const emailRegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordRedExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (name.value.length > 50) {
        error.name = 'Tên không dài hơn 50 ký tự.';
    }
   
    if (!emailRegExp.test(email.value)) {
        error.email = 'Email không hợp lệ.';
    } else error.email = '';

    if (!passwordRedExp.test(password.value)) {
        error.password = 'Mật khẩu phải gồm ký tự HOA, thường, chữ số và ký tự đặc biệt.';
    } else error.password = '';

    if (password.value.trim() !== confirm_password.value.trim()) {
        error.confirm_password = 'Mật khẩu không khớp.';
    } else error.confirm_password = '';

}


const handleSubmit = (e) => {
        e.preventDefault();

        const values = {
            "name": name.value,
            "email": email.value,
            "password": password.value,
            "address": address.value,
            "permission": 'user',
        }
        let fileStatus = 0;
        if (file) {
            const data = new FormData();
            data.append("file", file);

            values.img = file.name;
             axios.post(import.meta.env.VITE_SERVER_URL + 'api/file/upload', data)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    fileStatus = 200;
                }
            })
            .catch (err => console.log(err))
        }
        
        axios.post(import.meta.env.VITE_SERVER_URL + 'api/users', values)
            .then(res => {
                if (res.status === 200 && fileStatus === 200) {
                    alert("Thêm thành công!");
                    document.location.reload();
                }})
            .catch(err => console.log(err))
}

</script>

<template>
    <div class="p-5">
     <h1 class="text-blue-500 text-center font-bold text-2xl dark:text-white">
         Thêm người dùng
     </h1>
     
 <form @submit="handleSubmit" class="p-5 mx-auto max-w-lg">
     <div class="mb-6">
         <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
         <input type="text" id="name" v-model="name" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Trần Văn A" required />
         <p class="text-sm text-red-500 dark:text-red-600">{{ error.name }}</p>
     </div>
     <div class="mb-6">
         <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
         <input type="text" id="email" v-model="email" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
         <p class="text-sm text-red-500 dark:text-red-600">{{ error.email }}</p>
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
         <input type="text" id="address" v-model="address" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hiệp Lơi, Hòa Bình, Trà Ôn, Vĩnh Long" required min="0"/>
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

<template>
  <div class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
	<div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">ĐĂNG NHẬP</h1>
		<form @submit="handleSubmit">
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
				<input type="email" id="email" v-model="email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required>
			</div>
			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mật khẩu</label>
				<input type="password" id="password" v-model="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required>
				<a href="#"
					class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Quên mật khẩu
        </a>
			</div>
			<div class="flex items-center justify-between mb-4">
				<div class="flex items-center">
					<input type="checkbox" id="remember" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked>
					<label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Nhớ tôi</label>
				</div>
				<a href="#"
					class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Tạo tài khoản
				</a>
			</div>
			<button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">ĐĂNG NHẬP</button>
		</form>
	</div>
</div>
</template>

<style>
.error-message {
  background-color: #FFE4E1; /* Màu đỏ */ 
  padding: 8px 12px; /* Padding */
  border-radius: 4px; /* Bo tròn góc */
  margin-top: 8px; /* Khoảng cách với các phần tử khác */
}
</style>

<script setup>
import router from "@/router";
import axios from "axios";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errorMessage = ref(null);

const handleSubmit = (e) => {
  e.preventDefault();
  const values = {
    email: email.value,
    password: password.value,
  };

  axios.defaults.withCredentials = true;
  axios
    .post(import.meta.env.VITE_SERVER_URL + "api/log/admin/login", values)
    .then((res) => {
      if (res.data.permission === "admin") {
        router.push("/admin");
        // window.location.reload();
      } else {
        errorMessage.value = res.data;
        //alert(res.data);
      }
    })
    .catch((err) => console.log(err));
};
</script>
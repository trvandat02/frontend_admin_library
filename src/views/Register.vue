<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const name = ref('');
const email = ref('');
const password = ref('');
const repeatPassword = ref('');
const address = ref('');

let error = {
  "name": '',
  "email": '',
  "password": '',
  "repeatPassword": '',
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

  if (password.value.trim() !== repeatPassword.value.trim()) {
    error.repeatPassword = 'Mật khẩu không khớp.';
  } else error.repeatPassword = '';

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

  const data = new FormData();

  axios.post('http://localhost:3001/api/users', values)
    .then(res => {
      alert("Đăng ký thành công!");
      router.push('/login');
    })
    .catch(err => console.log(err))
}

</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  ĐĂNG KÝ
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" @submit="handleSubmit">
                <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                      <input type="text" name="name" id="name" v-model="name" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Trần Văn A" required="">
                      <p class="text-sm text-red-500 dark:text-red-600">{{ error.name }}</p>
                    </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" v-model="email" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                      <p class="text-sm text-red-500 dark:text-red-600">{{ error.email }}</p>
                    </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                      <input type="password" name="password" id="password" v-model="password" @change="validation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                      <p class="text-sm text-red-500 dark:text-red-600">{{ error.password }}</p>
                    </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                      <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                      <p class="text-sm text-red-500 dark:text-red-600">{{ error.repeatPassword }}</p>
                    </div>
                  <div>
                      <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                      <input type="text" name="address" id="address" v-model="address" @change="validation" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Trà Ôn, Vĩnh Long" required="">
                  </div>
                  <div class="flex justify-center"> <!-- Thêm lớp flex và justify-center -->
              <button type="submit" class="w-1/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                ĐĂNG KÝ
              </button>
            </div>
                </form>
          </div>
      </div>
  </div>
</section>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

const email = ref('');
const auth = ref({});
axios.defaults.withCredentials = true;
axios.get("http://localhost:3001/api/log/user/token")
  .then(res => {
    if (res.data.Status === "Success") {
      email.value = res.data.email;
      axios.get(`http://localhost:3001/api/users/email/${email.value}`)
        .then(res => {
          if (res.status === 200) {
            auth.value = res.data;
          } else { console.log(res.status); }
        })
        .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))

const handleLogout = () => {
  axios.get("http://localhost:3001/api/log/user/logout")
      .then(res => {
         auth.value = null;
         router.push('/');
      }).catch(err => console.log(err));
}
</script>

<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Library</span>
            </a>
            <div class="flex items-center lg:order-2">
                <div v-if="!(auth && auth.email)">
                  <router-link to="/login">
                      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Đăng nhập
                      </button>
                  </router-link>
                  <router-link to="/register" class="ml-4">
                      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Đăng ký
                      </button>
                  </router-link>
              </div>
              <div v-if="auth && auth.email" class="ml-auto flex gap-4 justify-end">
                <div class="text-black font-medium rounded-lg text-sm px-4 py-2 text-center" style="font-size: 16px;">
                  Hello, {{ auth.name }}
                </div>
                  <button type="button" @click="handleLogout" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                      Đăng xuất
                  </button>
              </div>
              
            </div>
            <div class="hidden items-center w-full justify-center lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        <li>
          <router-link to="/" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Trang chủ</router-link>
        </li>
        <!-- <li>
          <router-link to="/book" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Sách</router-link>
        </li> -->
        <li>
          <router-link to="/borrowbooks" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Lịch sử mượn</router-link>
        </li>
    </ul>
</div>

        </div>
    </nav>
</header>
</template>

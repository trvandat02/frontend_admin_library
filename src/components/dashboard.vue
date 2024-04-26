<!-- <script setup>
import { SideBar, Card, Publisher,Borrow } from '../components'
import { ref } from 'vue';

const props = defineProps({
   auth: Object,
});

const users = ref([]);
axios.get(import.meta.env.VITE_SERVER_URL + `api/users`)
   .then(res =>
      users.value = res.data
   )
   .catch(err => console.log(err))

const books = ref([]);
axios.get(import.meta.env.VITE_SERVER_URL + `api/books`)
   .then(res =>
      books.value = res.data
   )
   .catch(err => console.log(err))

const publishers = ref([]);
axios.get(import.meta.env.VITE_SERVER_URL + `api/publishers`)
   .then(res =>
      publishers.value = res.data
   )
   .catch(err => console.log(err))

const borrowbooks = ref([]);
axios.get(import.meta.env.VITE_SERVER_URL + `api/borrowedbooks`)
   .then(res =>
      borrowbooks.value = res.data
   )
   .catch(err => console.log(err))

   const dataFromChild = ref('1');
</script>

<template>
   <div v-if="props.auth.email">
      <SideBar @event-name="handleDataFromChild"></SideBar>
      <div class="w-2/3 mx-auto">
         <Card v-if="dataFromChild == '1'" :title="'Quản lý Sách'" :data="books"/>
         <Publisher v-if="dataFromChild == '2'" :title="'Quản lý Nhà xuất bản'" :data="publishers"/>
         <Card v-if="dataFromChild == '3'" :title="'Quản lý người dùng'" :data="users"/>
         <Borrow v-if="dataFromChild == '4'" :title="'Quản lý mượn sách'" :data="borrowbooks"/>
      </div>
   </div>

</template>

<script>
import axios from 'axios';
export default {

   data() {
      return {
         dataFromChild: '',
      };
   },
   methods: {
      handleDataFromChild(data) {
         this.dataFromChild = data;
      },

   }
}
</script> -->

<script setup>
import axios from 'axios';
import { SideBar, Card, Publisher, Borrow } from '../components'
import { ref } from 'vue';

const props = defineProps({
   auth: Object,
});

const users = ref([]);
axios.get(import.meta.env.VITE_SERVER_URL + `api/users`)
   .then(res =>
      users.value = res.data
   )
   .catch(err => console.log(err))

const books = ref([]);
axios.get(import.meta.env.VITE_SERVER_URL + `api/books`)
   .then(res =>
      books.value = res.data
   )
   .catch(err => console.log(err))

const publishers = ref([]);
axios.get(import.meta.env.VITE_SERVER_URL + `api/publishers`)
   .then(res =>
      publishers.value = res.data
   )
   .catch(err => console.log(err))

const borrowbooks = ref([]);
axios.get(import.meta.env.VITE_SERVER_URL + `api/borrowedbooks`)
   .then(res =>
      borrowbooks.value = res.data
   )
   .catch(err => console.log(err))

const dataFromChild = ref('1'); // Set default value to '1'

const handleDataFromChild = (data) => {
   dataFromChild.value = data;
}

</script>

<template>
   <div v-if="props.auth.email">
      <SideBar @event-name="handleDataFromChild"></SideBar>
      <div class="w-2/3 mx-auto">
         <Card v-if="dataFromChild === '1'" :title="'Quản lý Sách'" :data="books"/>
         <Publisher v-else-if="dataFromChild === '2'" :title="'Quản lý Nhà xuất bản'" :data="publishers"/>
         <Card v-else-if="dataFromChild === '3'" :title="'Quản lý người dùng'" :data="users"/>
         <Borrow v-else-if="dataFromChild === '4'" :title="'Quản lý mượn sách'" :data="borrowbooks"/>
      </div>
   </div>
</template>

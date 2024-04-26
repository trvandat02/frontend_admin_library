<script setup>
import { ref } from 'vue';
import {BorrowCard } from '../components';
import { useRoute } from 'vue-router';

const route = useRoute();
const bbooks = route.meta.bbooks;

</script>

<template>
     <div class="text-center">
        <h1 class="text-3xl font-bold mb-6">Lịch sử mượn</h1>
        <div class="mb-6 flex flex-wrap justify-center gap-4">
            <BorrowCard v-for="book in bbooks" :key="book._id" :book="book" />
        </div>
    </div>
</template>
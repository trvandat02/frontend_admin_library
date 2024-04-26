<script setup>
import { RouterView } from 'vue-router'
import { Header, Footer } from './components'

</script>

<template>
  <Header></Header>
  <div class="mt-5 mx-5">
    <RouterView />
  </div>
  <Footer></Footer>
</template>
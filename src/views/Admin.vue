<script setup>
import axios from 'axios';

import { DashBoard } from '../components'
import { ref } from 'vue';

const auth = ref({})
const email = ref('');
axios.defaults.withCredentials = true;
axios.get(import.meta.env.VITE_SERVER_URL + "api/log/admin/token")
    .then(res => {
        if (res.data.Status === "Success") {
            email.value = res.data.email;
            axios.get(import.meta.env.VITE_SERVER_URL + `api/admin/email/${email.value}`)
                .then(res => {
                    if (res.status === 200) {
                        auth.value = res.data;
                    } else { console.log(res.status); }
                })
                .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))

</script>

<template>
    <div>
        <DashBoard :auth="auth"></DashBoard>
    </div>
</template>
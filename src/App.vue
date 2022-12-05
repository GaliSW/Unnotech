<template>
    <header>
        <router-link to="/books">
            <i class="fa-solid fa-chevron-left" v-if="route.path !== '/books'"></i>
        </router-link>
        <h1>{{ book.title }}</h1>
        <i class="fa-solid fa-plus" v-if="route.path == '/books'"></i>
        <i class="fa-sharp fa-solid fa-file-pen" v-else></i>
    </header>
    <router-view></router-view>
    <AddPop></AddPop>
</template>

<script setup>
import AddPop from "@/components/AddBook.vue"
import EditPop from "@/components/EditBook.vue"
import { bookStore } from "@/store/book"
import { useRoute } from 'vue-router'
const route = useRoute()
const book = bookStore()

</script>
<style lang="scss">
@import "@/assets/scss/style";
</style>
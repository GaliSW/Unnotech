<template>
    <header>
        <router-link to="/books">
            <i class="fa-solid fa-chevron-left" v-if="route.path !== '/books'"></i>
        </router-link>
        <h1>{{ book.bookInfo.title }}</h1>
        <i class="fa-solid fa-plus" @click="popup(1)" v-if="route.path == '/books'"></i>
        <i class="fa-sharp fa-solid fa-file-pen" @click="popup(2)" v-else></i>
    </header>
    <router-view></router-view>
    <Pop v-if="pop === 1 || pop === 2" :pop="pop" @close-pop="closePop"></Pop>
</template>

<script setup>
import Pop from "@/components/Popup.vue";
import { ref } from "vue";
import { bookStore } from "@/store/book";
import { useRoute } from "vue-router";
const route = useRoute();
const book = bookStore();
const pop = ref(0);

const popup = (type) => {
    pop.value = type;
};

const closePop = () => {
    pop.value = 0;
};
</script>
<style lang="scss">
@import "@/assets/scss/style";
</style>

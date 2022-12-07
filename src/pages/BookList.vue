<template>
    <section id="book_list">
        <div
            class="card"
            v-for="(item, index) in booklist"
            @click="toBook(item.id)"
        >
            <div class="banner">
                <img
                    :src="item.image ? item.image : 'https://img.onl/N7lQ9o'"
                    alt=""
                />
            </div>
            <div class="card_info">
                <h3>{{ item.title }}</h3>
                <p>{{ item.author }}</p>
            </div>
        </div>
    </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getBookListApi } from "@/api/api";
import { useRouter } from "vue-router";
import { bookStore } from "@/store/book";

const book = bookStore();
const router = useRouter();
const booklist = ref("");

onMounted(() => {
    book.bookInfo.title = "書籤列表";
    getBookListApi().then((res) => {
        booklist.value = res.data;
    });
});

const toBook = (id) => {
    router.push({
        path: `/books/${id}`,
    });
};
</script>

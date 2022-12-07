<template>
    <section id="book_detail">
        <div class="thumbnail">
            <img
                :src="
                    book.bookInfo.image
                        ? book.bookInfo.image
                        : 'https://img.onl/N7lQ9o'
                "
                alt=""
            />
        </div>
        <div>
            <h3>名稱</h3>
            <p>{{ book.bookInfo.title }}</p>
        </div>
        <div>
            <h3>作者</h3>
            <p>{{ book.bookInfo.author }}</p>
        </div>
        <div class="description">
            <h3>備註</h3>
            <p>{{ book.bookInfo.description }}</p>
        </div>
    </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getBookApi } from "@/api/api";
import { useRoute, useRouter } from "vue-router";
import { bookStore } from "@/store/book";

const book = bookStore();
const route = useRoute();
const router = useRouter();

router.beforeEach(async (to, from) => {
    book.bookInfo.image = "";
});

onMounted(() => {
    getBookApi(route.params.id).then((res) => {
        book.bookInfo.title = res.data.title;
        book.bookInfo.bookId = res.data.id;
        book.bookInfo.author = res.data.author;
        book.bookInfo.description = res.data.description;
        book.bookInfo.image = res.data.image;
    });
});
</script>

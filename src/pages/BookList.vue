<template>
    <section id="book_list">
        <div
            class="card"
            v-for="(item, index) in bookList"
            @click="toBook(item.id)"
        >
            <div class="loader" v-if="!isLoad"></div>
            <div class="banner">
                <img
                    class="lazy"
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
const bookList = ref("");
const isLoad = ref(false);

onMounted(async () => {
    book.bookInfo.title = "書籤列表";
    await getBookListApi().then((res) => {
        bookList.value = res.data;
    });

    const classImg = document.querySelectorAll(".lazy");
    const length = classImg.length;
    let count = 0;
    classImg.forEach((item) => {
        count++;
        if (count === length) {
            item.addEventListener("load", () => {
                isLoad.value = true;
            });
        }
    });
});

const toBook = (id) => {
    router.push({
        path: `/books/${id}`,
    });
};
</script>

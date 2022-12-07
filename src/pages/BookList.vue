<template>
    <section id="book_list">
        <div
            class="card"
            v-for="(item, index) in book.bookList"
            @click="toBook(item.id)"
        >
            <div class="loader" v-if="!isLoad"></div>
            <div class="banner">
                <img
                    :class="item.image ? '' : 'lazy'"
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
const isLoad = ref(false);

onMounted(async () => {
    book.bookInfo.title = "書籤列表";
    const getBooks = getBookListApi().then((res) => {
        return new Promise((resolve, reject) => {
            book.bookList = res.data.reverse();
            resolve();
        });
    });
    if (book.bookList.length === 0) {
        await getBooks;
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
    } else {
        isLoad.value = true;
    }
});

const toBook = (id) => {
    router.push({
        path: `/books/${id}`,
    });
};
</script>

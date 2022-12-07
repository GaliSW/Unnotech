<template>
    <section id="book_detail">
        <div class="thumbnail">
            <img
                v-show="isLoad"
                class="lazy"
                :src="book.bookInfo.image"
                alt="book_thumbnail"
            />
            <div class="lds-roller" v-if="!isLoad">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
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
const isLoad = ref(false);

router.beforeEach((to, from) => {
    book.bookInfo.image = "";
});

onMounted(() => {
    getBookApi(route.params.id).then((res) => {
        book.bookInfo.title = res.data.title;
        book.bookInfo.bookId = res.data.id;
        book.bookInfo.author = res.data.author;
        book.bookInfo.description = res.data.description;
        if (res.data.image) {
            book.bookInfo.image = res.data.image;
        } else {
            book.bookInfo.image =
                "https://cdn.kingstone.com.tw/book/images/product/20186/2018630448367/2018630448367m.jpg";
        }
        return;
    });
    const classImg = document.querySelector(".lazy");
    classImg.addEventListener("load", () => {
        isLoad.value = true;
    });
});
</script>

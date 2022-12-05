<template>
    <section id="book_detail">
        <div class="thumbnail">
            <img :src="bookInfo.image ? bookInfo.image : 'https://img.onl/f7yYXv'" alt="">
        </div>
        <div>
            <h3>名稱</h3>
            <p>{{ bookInfo.title }}</p>
        </div>
        <div>
            <h3>作者</h3>
            <p>{{ (bookInfo.author) }}</p>
        </div>
        <div class="description">
            <h3>備註</h3>
            <p>{{ bookInfo.description }}
            </p>
        </div>
    </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getBookApi } from '@/api/api';
import { useRoute } from 'vue-router'

const route = useRoute()
const bookInfo = ref("")
onMounted(() => {
    getBookApi(route.params.id).then((res) => {
        bookInfo.value = res.data
        console.log(res)
    })
})
</script>
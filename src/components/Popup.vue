<template>
    <div id="popup">
        <div class="wrapper">
            <div class="pop_head">
                <i class="fa-solid fa-chevron-left" @click="fnCancel"></i>
                <h1 v-if="props.pop === 1">新增書籍</h1>
                <h1 v-else>修改書籍</h1>
            </div>
            <div class="add_blk">
                <div class="upload">
                    <div>
                        <img
                            :src="book.bookInfo.image"
                            alt=""
                            id="imgSrc"
                            v-if="isFilesReady"
                        />
                        <i class="fa-sharp fa-solid fa-image" v-else></i>
                    </div>
                    <label for="file">{{ status }}</label>
                    <input
                        id="file"
                        type="file"
                        accept="image/jpeg, image/png"
                        @change="fnImgPreview($event)"
                    />
                </div>
                <div>
                    <h3>名稱</h3>
                    <input type="text" placeholder="請輸入書名" id="title" />
                </div>
                <div>
                    <h3>作者</h3>
                    <input type="text" placeholder="請輸入作者" id="author" />
                </div>
                <div class="description">
                    <h3>備註</h3>
                    <textarea
                        placeholder="請輸入書本簡介"
                        id="description"
                    ></textarea>
                </div>
            </div>
            <div class="action">
                <div class="cancel" @click="fnCancel">取消</div>
                <div
                    class="confirm"
                    @click="fnAddandPatch(1)"
                    v-if="props.pop === 1"
                >
                    新增
                </div>
                <div class="confirm" @click="fnAddandPatch(2)" v-else>修改</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { bookStore } from "@/store/book";
import { useRoute } from "vue-router";
import {
    addBookApi,
    patchBookApi,
    getBookApi,
    getBookListApi,
} from "@/api/api";

const book = bookStore();
const route = useRoute();

const status = ref("上傳封面");
const isFilesReady = ref(false);
const emit = defineEmits(["closePop"]);
const props = defineProps(["pop"]);

onMounted(() => {
    if (props.pop === 2) {
        const author = document.getElementById("author");
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        author.value = book.bookInfo.author;
        title.value = book.bookInfo.title;
        description.value = book.bookInfo.description;
        status.value = "修改封面";
        isFilesReady.value = true;
    }
});

const fnCancel = () => {
    emit("closePop");
};

const fnAddandPatch = (type) => {
    if (!isFilesReady.value) {
        alert("請上傳書本封面");
        return;
    }
    const img = document.getElementById("imgSrc");
    const author = document.getElementById("author");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    if (author.value !== "" && title.value !== "" && description.value !== "") {
        const json = JSON.stringify({
            image: img.src,
            title: title.value,
            author: author.value,
            description: description.value,
        });
        if (type === 1) {
            addBookApi(json).then(() => {
                alert("新增成功");
                getBookListApi().then(() => {
                    fnCancel();
                });
            });
        } else {
            patchBookApi(book.bookInfo.bookId, json).then(() => {
                alert("修改成功");
                getBookApi(book.bookInfo.bookId).then((res) => {
                    book.bookInfo.title = res.data.title;
                    book.bookInfo.author = res.data.author;
                    book.bookInfo.description = res.data.description;
                    book.bookInfo.image = res.data.image;
                    fnCancel();
                });
            });
        }
    } else {
        alert("請輸入書本必要資訊");
    }
};

const fnImgPreview = (e) => {
    isFilesReady.value = false;
    const files = e.target.files;
    const filePromises = Object.entries(files).map((item) => {
        return new Promise((resolve, reject) => {
            const [index, file] = item;
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function () {
                const url = reader.result;
                isFilesReady.value = true;
                resolve(url);
            };
            reader.onerror = function () {
                alert("圖片格式有誤");
                reject();
            };
        });
    });

    Promise.all(filePromises)
        .then((url) => {
            document.getElementById("imgSrc").src = url;
            status.value = "重新上傳";
        })
        .catch(() => {
            status.value = "重新上傳";
        });
};
</script>

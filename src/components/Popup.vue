<template>
    <div id="popup">
        <div class="wrapper">
            <div class="pop_head">
                <i class="fa-solid fa-chevron-left" @click="cancel"></i>
                <h1>新增書籍</h1>
            </div>
            <div class="add_blk">
                <div class="upload">
                    <div>
                        <img src="" alt="" id="imgSrc" v-if="isFilesReady" />
                        <i class="fa-sharp fa-solid fa-image" v-else></i>
                    </div>
                    <label for="file">{{ status }}</label>
                    <input
                        id="file"
                        type="file"
                        accept="image/jpeg, image/png"
                        @change="imgPreview($event)"
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
                <div class="action">
                    <div class="cancel" @click="cancel">取消</div>
                    <div class="confirm" @click="add" v-if="props.pop === 1">
                        新增
                    </div>
                    <div class="confirm" @click="add" v-else>修改</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";

const status = ref("上傳封面");
const myFiles = ref("true");
const isFilesReady = ref(false);
const emit = defineEmits(["closePop"]);
const props = defineProps(["pop"]);

const cancel = () => {
    emit("closePop");
};

const add = () => {
    if (!isFilesReady.value) {
        alert("請上傳書本封面");
        return;
    }
    const img = document.getElementById("imgSrc");
    const author = document.getElementById("author");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    console.log(img.src, author.value, title.value, description.value);
    if (author.value !== "" && title.value !== "" && description.value !== "") {
        alert("ok");
    } else {
        alert("請輸入書本必要資訊");
    }
};

const imgPreview = (e) => {
    myFiles.value = {};
    isFilesReady.value = false;
    const files = e.target.files;
    const filePromises = Object.entries(files).map((item) => {
        return new Promise((resolve, reject) => {
            const [index, file] = item;
            const reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = function (event) {
                myFiles["picture"] = btoa(event.target.result);
                isFilesReady.value = true;
                resolve();
            };
            reader.onerror = function () {
                alert("圖片格式有誤");
                reject();
            };
        });
    });

    Promise.all(filePromises)
        .then(() => {
            document.getElementById("imgSrc").src = URL.createObjectURL(
                files[0]
            );
            status.value = "重新上傳";
        })
        .catch((error) => {
            status.value = "重新上傳";
        });
};
</script>

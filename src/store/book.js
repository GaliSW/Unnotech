import { defineStore } from "pinia";
import { ref } from "vue";

export const bookStore = defineStore("store", () => {
    const title = ref("書籤列表");
    const bookId = ref(0);
    return { title, bookId };
});

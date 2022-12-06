import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const bookStore = defineStore("store", () => {
    const bookInfo = reactive({
        title: "書籤列表",
        bookId: 0,
        author: "",
        description: "",
        image: "",
    });
    return { bookInfo };
});

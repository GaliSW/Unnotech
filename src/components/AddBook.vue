<template>
    <div id="popup">
        <div class="wrapper">
            <div class="pop_head">
                <i class="fa-solid fa-chevron-left"></i>
                <h1>新增書籍</h1>
            </div>
            <div class="add_blk">
                <div class="upload">
                    <i class="fa-sharp fa-solid fa-image"></i>
                    <label for="file">上傳圖片</label>
                    <input id="file" type="file" accept="image/jpeg, image/png" onchange="" />
                </div>
                <div>
                    <h3>名稱</h3>
                    <input type="text">
                </div>
                <div>
                    <h3>作者</h3>
                    <input type="text">
                </div>
                <div class="description">
                    <h3>備註</h3>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
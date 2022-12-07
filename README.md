# 執行

請用連結進入專案
連結 ：https://galisw.github.io/Unnotech/#/books

# 架構邏輯說明

### 組件劃分

本專案依據需求製作兩個主元件，分別為 **BookList & BookDetail**，
**新增與修改頁面**因 POP 視窗的結構差異不大，因此共用一個 **POP 組件**，並依照傳參不同切換 POP 內的值。
**Header**的部分也是因為共用性高，因此將 Heade 寫在 APP.vue 中，頁面不必重新渲染。

# Library 說明

#### API.instance

使用 axios.instance 進行 api 的管理，以便後續要進行測試與正式分離，也便於進行 api 的調整。

#### Pinia

使用 pinia 創建 store，是因資料共用性高，因此使用 store 存取並監聽 ，可以減少元件之間的傳遞參數的複雜性也便於維護。

#### Font Awesome

使用 cdn 引用 Font Awesome library，其簡單且豐富的 icon 設計庫，可以有效提高開發效率。

# 問題與解決辦法

**問題：** 因 Get 的 API 沒有 page 或 order 的控制，沒辦法使用滾動式載入或分頁載入的功能，因此同時載入資料或渲染頁面的時候，會造成網頁 loading 的負擔。

**解決：** 使用 skeleton 的方式，讓使用者知道資料正在載入中並可以優先看到 DOM 架構渲染後，待圖片資源都載入後才顯示所有資料，稍提升使用者體驗，但個人認為還是做到分頁載入等方式較佳。

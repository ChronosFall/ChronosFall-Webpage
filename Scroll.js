let isScrolling = false;

window.addEventListener('wheel', function (e) {
    if (isScrolling) return;

    isScrolling = true;
    PageSize = 1100; // 1ページの高さを設定

    if (e.deltaY > 0) {
        // 下スクロール
        NextPage();
    } else {
        // 上スクロール
        PrevPage();
    }
    console.log(e.deltaY);

    setTimeout(() => isScrolling = false, 100);
});


function NextPage() {
    scrollBy(0, PageSize);
}

function PrevPage() {
    scrollBy(0, -PageSize);
}
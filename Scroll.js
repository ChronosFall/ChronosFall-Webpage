let isScrolling = false;

window.addEventListener('wheel', function (e) {
    if (isScrolling) return;

    isScrolling = true;

    if (e.deltaY > 0) {
        // 下スクロール
       // nextSection();
    } else {
        // 上スクロール
       // prevSection();
    }
    console.log(e.deltaY);

    setTimeout(() => isScrolling = false, 100);
});

function nextSection() {
    const currentSection = document.querySelector('.section.active');
    const nextSection = currentSection.nextElementSibling;

    if (nextSection) {
        currentSection.classList.remove('active');
        nextSection.classList.add('active');
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}
function prevSection() {
    const currentSection = document.querySelector('.section.active');
    const prevSection = currentSection.previousElementSibling;

    if (prevSection) {
        currentSection.classList.remove('active');
        prevSection.classList.add('active');
        prevSection.scrollIntoView({ behavior: 'smooth' });
    }
}
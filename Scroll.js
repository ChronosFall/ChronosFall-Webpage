
class ResponsiveSlideshow {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 5;
        this.isScrolling = false;
        this.sectionsContainer = document.querySelector('.sections-container');
        this.scrollDots = document.querySelectorAll('.scroll-dot');

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateIndicator();
    }

    bindEvents() {
        // マウスホイールイベント
        window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

        // キーボードイベント
        window.addEventListener('keydown', (e) => this.handleKeydown(e));

        // タッチイベント
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });

        window.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSection();
                } else {
                    this.prevSection();
                }
            }
        });

        // スクロールインジケータークリック
        this.scrollDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSection(index));
        });

        // リサイズイベント
        window.addEventListener('resize', () => this.handleResize());
    }

    handleWheel(e) {
        if (this.isScrolling) return;

        e.preventDefault();

        if (e.deltaY > 0) {
            this.nextSection();
        } else {
            this.prevSection();
        }
    }

    handleKeydown(e) {
        if (this.isScrolling) return;

        switch (e.key) {
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                this.nextSection();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.prevSection();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSection(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSection(this.totalSections - 1);
                break;
        }
    }

    nextSection() {
        if (this.currentSection < this.totalSections - 1) {
            this.currentSection++;
            this.updateView();
        }
    }

    prevSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.updateView();
        }
    }

    goToSection(index) {
        if (index >= 0 && index < this.totalSections && index !== this.currentSection) {
            this.currentSection = index;
            this.updateView();
        }
    }

    updateView() {
        if (this.isScrolling) return;

        this.isScrolling = true;
        const translateY = -this.currentSection * 100;

        this.sectionsContainer.style.transform = `translateY(${translateY}vh)`;
        this.updateIndicator();

        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }

    updateIndicator() {
        this.scrollDots.forEach((dot, index) => {
            if (index === this.currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    handleResize() {
        // リサイズ時の調整が必要な場合はここに実装
        this.updateView();
    }
}

// DOMが読み込まれたらスライドショーを初期化
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveSlideshow();
});
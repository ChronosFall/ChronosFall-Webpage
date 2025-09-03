class ResponsiveSlideshow {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 5;
        this.isScrolling = false;
        this.sectionsContainer = document.querySelector('.sections-container');
        this.scrollDots = document.querySelectorAll('.scroll-dot');

        // セクション名とインデックスのマッピング
        this.sectionMap = {
            '': 0,
            'main': 0,
            'news': 1,
            'characters': 2,
            'information': 3,
            'world': 4
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.handleInitialHash();
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

        // ハッシュ変更イベント
        window.addEventListener('hashchange', () => this.handleHashChange());

        // ページ読み込み時のスクロール位置をリセット
        window.addEventListener('load', () => {
            window.scrollTo(0, 0);
            this.handleInitialHash();
        });

        // ヘッダーのロゴクリック時の処理
        const mainLink = document.getElementById('Main');
        if (mainLink) {
            mainLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSection(0);
                // URLのハッシュも更新
                window.history.pushState(null, null, '#main');
            });
        }
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
            this.updateURL();
        }
    }

    prevSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.updateView();
            this.updateURL();
        }
    }

    goToSection(index) {
        if (index >= 0 && index < this.totalSections && index !== this.currentSection) {
            this.currentSection = index;
            this.updateView();
            this.updateURL();
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
        // リサイズ時の調整
        window.scrollTo(0, 0); // スクロール位置をリセット
        this.updateView();
    }

    // 初期ハッシュ処理
    handleInitialHash() {
        const hash = window.location.hash.substring(1);
        const sectionIndex = this.sectionMap[hash];

        if (sectionIndex !== undefined) {
            this.currentSection = sectionIndex;
            this.updateView();
        }

        // 通常のスクロールを防ぐ
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }

    // ハッシュ変更時の処理
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        const sectionIndex = this.sectionMap[hash];

        if (sectionIndex !== undefined) {
            this.currentSection = sectionIndex;
            this.updateView();
        }

        // 通常のスクロールを防ぐ
        window.scrollTo(0, 0);
    }

    // URLハッシュを更新
    updateURL() {
        const sectionNames = ['main', 'news', 'characters', 'information', 'world'];
        const sectionName = sectionNames[this.currentSection];

        // ハッシュ変更イベントを発生させずにURLを更新
        window.history.replaceState(null, null, `#${sectionName}`);
    }
}

// DOMが読み込まれたらスライドショーを初期化
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveSlideshow();
});
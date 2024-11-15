document.addEventListener('DOMContentLoaded', function() {
    // スクロールイベントによるアクティブなリンクのハイライト
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {  // 60pxの余白を考慮
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // ハンバーガーメニューのクリックイベントを追加
    document.querySelector('.hamburger').addEventListener('click', function() {
        const header = document.querySelector('header');
        header.classList.toggle('nav-open'); // nav-open クラスをトグル
    });

    // 「閉じる」ボタンのクリックイベントを追加
    document.querySelector('.close-btn').addEventListener('click', function() {
        const header = document.querySelector('header');
        header.classList.remove('nav-open'); // nav-open クラスを削除してメニューを閉じる
    });

    // ナビゲーションリンクのクリックイベントを追加
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            const header = document.querySelector('header');
            header.classList.remove('nav-open'); // メニューを閉じる
        });
    });
});
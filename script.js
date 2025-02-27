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

    // ページ内リンクのスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault(); // デフォルトのリンク動作を無効化

            let href = this.getAttribute("href");
            let targetElement = href === "#" ? document.documentElement : document.querySelector(href);

            if (targetElement) {
                let position = targetElement.offsetTop;
                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        });
    });

    // スクロールイベント（初回実行も追加）
    function checkFadeIn() {
        let scrollTop = $(window).scrollTop();  
        let windowHeight = $(window).height();  

        $('.fade-section').each(function(){
            let sectionTop = $(this).offset().top; 
            
            // セクションが画面に入ったら .fade-in を追加
            if (scrollTop + windowHeight > sectionTop + 100) {
                if (!$(this).hasClass('fade-in')) {
                    console.log("フェードイン適用: " + $(this).attr('id')); // デバッグ用
                    $(this).addClass('fade-in');
                }
            }
        });
    }

    // 初回チェック
    $(document).ready(checkFadeIn);

    // スクロール時に適用
    $(window).on('scroll', checkFadeIn);

});
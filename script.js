document.addEventListener('DOMContentLoaded', function() {
    
    // ローディングアニメーション
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hide'); // フェードアウト + display: none;
    }, 2000); // 2秒後にフェードアウト

    //スクロール時にヘッダーを半透明に
    const header = document.querySelector("header");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {  // 50px以上スクロールしたら
            header.classList.add("scrolled");  // クラスを追加
            console.log("スクロール: scrolled クラス追加"); // デバッグ確認
        } else {
            header.classList.remove("scrolled");  // クラスを削除
            console.log("スクロール: scrolled クラス削除"); // デバッグ確認
        }
    });
    
    // スクロールイベントによるアクティブなリンクのハイライト
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // ヘッダーの高さ分を考慮
            if (window.scrollY >= sectionTop) {  
                currentSection = section.getAttribute('id');
            }
        });

        // メインビジュアルより上にいる場合、アクティブを解除
        const mainVisual = document.querySelector('.main-visual');
        if (mainVisual && window.scrollY < mainVisual.offsetHeight - 80) {
            currentSection = ''; // 何もアクティブにしない
        }

        console.log(`Current Section: ${currentSection}`); // デバッグ用


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href').includes(currentSection)) {
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

    // トップに戻るボタンのクリックイベント
    $('#top-button').click(function(event) {
        event.preventDefault(); // デフォルト動作を防ぐ
        console.log("トップボタンがクリックされました！"); // デバッグ確認用
        $('html, body').animate({ scrollTop: 0 }, 800, 'swing'); // スムーズスクロール
    });

    // **トップへ戻るボタンのフェードイン・アウト**
    const topButton = document.getElementById("top-button");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {  // 100pxスクロールしたら表示
            topButton.classList.remove("fade-out");
            topButton.classList.add("fade-in");
        } else {
            topButton.classList.remove("fade-in");
            topButton.classList.add("fade-out");
        }
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

     // Slick スライダーの初期化
     $(document).ready(function(){
        $('.slider').slick({
            arrows: false,  // 矢印なし
            autoplay: true,  // 自動スライド
            autoplaySpeed: 5000,  // 自動スライドの間隔（3秒）
            speed: 1500,  // スライドの速度
            infinite: true,  // ループするか
            pauseOnHover: false,  // ホバー時に停止しない
            pauseOnFocus: false,  // フォーカス時に停止しない
            cssEase: 'ease-in-out',  // アニメーションの種類
            slidesToShow: 2,  // 画面に表示するスライド数
            slidesToScroll: 1,  // スクロールするスライド数
            responsive: [
                {
                    breakpoint: 769,  // 画面幅769px以下の設定
                    settings: {
                        slidesToShow: 1,  // 1枚表示
                    }
                },
                {
                    breakpoint: 426,  // 画面幅426px以下の設定
                    settings: {
                        slidesToShow: 1,  // 1枚表示
                    }
                }
            ]
        });
    });

});

 (() => {
    const init = () => {
        buildHTML();
        buildCSS();
        getProducts();
        setEvents();
    };

    const buildHTML = () => {
        const html = `
            <div class="product-carousel">
                <div class="product-carousel-title">
                    <h2>Sevebileceğin Ürünler</h2>
                </div>
                <div class="carousel-elements-container">
                    <button class="test-carousel-arrow left">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                            <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                        </svg>
                    </button>
                    <div class="test-carousel">
                        <div class="carousel-slider">
                            <div class="carousel-track"></div>
                        </div>
                    </div>
                    <button class="test-carousel-arrow right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                            <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        $('.product-detail').after(html);
    };

    const buildCSS = () => {
        const css = `
            .product-carousel {
                margin-top: 20px;
                font-family: Arial, sans-serif;
                width: 100%;
                background: #FAF9F7;
                padding: 1rem 0;
            }
            .product-carousel-title{ 
                width: 80%;
                margin: 0 auto 20px auto;
                padding: 0 3rem;
            }
            .carousel-elements-container{
                display: flex;
                align-items: center;
                width: 100%;
            }
            .test-carousel {
                display: flex;
                align-items: center;
                overflow: hidden;
                position: relative;
                width: 80%;
                margin: 0 auto;
            }
            .carousel-track {
                display: flex;
                transition: transform 0.3s ease-in-out;
                gap: 20px;
                padding: 0 20px;
                width: 100%;
            }
            .carousel-slider{
                padding: 0 1rem;
                width: 100%;
            }
            .carousel-item {
                flex: 0 0 calc(100% / 6);
                min-width: calc(100% / 6);
                box-sizing: border-box;
                transition: all 0.3s ease;
                background: white;
            }
            .test-carousel-arrow {
                background: transparent;
                cursor: pointer;
                z-index: 1;
                border: none;
                width: 10%;
                transition: opacity 0.3s ease;
            }
            .test-carousel-arrow.left {
                text-align: end;
            }
            .test-carousel-arrow.right {
                text-align: end;
                transform: rotate(180deg);
            }
            .carousel-product-card{
                color: #555;
            }
            .carousel-product-card__image-wrapper{
                position: relative;
            }
            .product-image {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
            .carousel-product-card-like-button {
                position: absolute;
                width: 34px;
                height: 34px;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 10px;
                right: 10px;
                cursor: pointer;
                background: white;
                border-radius: 5px;
                border:solid .5px #b6b7b9;
                box-shadow:0 3px 6px 0 rgba(0,0,0,.16);
            }
            .carousel-product-card-like-button.active path {
                fill: #0047ba;
                stroke: #0047ba;
            }
            .product-card-info-box{
                padding:0 10px;
            }
            .product-card-info-box-title{
                margin: 5px 0 -10px 0;
                font-size: 14px;
            }
            .product-card-info-box-title a{
                color: #302e2b !important;
            }
            .price__current-price{
                font-size: 18px;
                font-weight: 600;
                color: #193db0;
            }

            /*Responsive Design Queries*/

            @media (min-width: 1441px) {
                .carousel-item {
                    flex: 0 0 calc(100% / 7);
                    min-width: calc(100% / 7);
                }
            }

            @media (max-width: 1440px) and (min-width: 1025px) {
                .carousel-item {
                    flex: 0 0 calc(100% / 6);
                    min-width: calc(100% / 6);
                }
            }

            @media (max-width: 1024px) and (min-width: 769px) {
                .carousel-item {
                    flex: 0 0 calc(100% / 4);
                    min-width: calc(100% / 4);
                }
            }

            @media (max-width: 768px) and (min-width: 481px) {
                .carousel-item {
                    flex: 0 0 calc(100% / 3);
                    min-width: calc(100% / 3);
                }
                .product-carousel-title {
                    width: 95%;
                }
                .test-carousel {
                    width: 95%;
                }
            }

            @media (max-width: 480px) {
                .carousel-item {
                    flex: 0 0 calc(100%);
                    min-width: calc(100%);
                }
                .product-carousel-title {
                    width: 100%;
                    padding: 0 0.5rem;
                }
                .test-carousel {
                    width: 100%;
                }
                .carousel-track {
                    gap: 10px;
                    padding: 0 10px;
                }
                .carousel-slider {
                    padding: 0 0.5rem;
                }
                .test-carousel-arrow {
                    width: 8%;
                }
            }
        `;
        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const getProducts = () => {
        const apiUrl = 'https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json';
        let products = JSON.parse(localStorage.getItem('products'));
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (!products) {
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                products = data;
                localStorage.setItem('products', JSON.stringify(products));
                renderProducts(products, favorites);
                console.log(products);
            });
        } else {
            renderProducts(products, favorites);
        }
    };

    const renderProducts = (products, favorites) => {
        const carouselTrack = $('.carousel-track');
        products.forEach(product => {
            const isFavorite = favorites.includes(product.id);
            const productItem = $(`
                <div class="carousel-item" data-product-id="${product.id}">
                    <div class="carousel-product-card__image-wrapper">
                        <a href="${product.url}" target="_blank">
                            <img class="product-image" alt="${product.name}" src="${product.img}">
                        </a>
                        <div class="carousel-product-card-like-button ${isFavorite ? 'active' : ''}" data-product-id="${product.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                                <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="product-card-info-box">
                        <div class="product-card-info-box-title">
                            <a href="${product.url}" target="_blank">
                                <p class="product-name">${product.name}</p>
                            </a>
                        </div>
                        <div class="carousel-product-card__price">
                            <div class="price__current-price">${product.price} TL</div>
                        </div>
                    </div>
                </div>
            `);
            carouselTrack.append(productItem);
        });

        $('.carousel-product-card-like-button').on('click', function(e) {
            e.preventDefault();
            const productId = $(this).data('product-id');
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            
            if (favorites.includes(productId)) {
                const index = favorites.indexOf(productId);
                favorites.splice(index, 1);
                $(this).removeClass('active');
            } else {
                favorites.push(productId);
                $(this).addClass('active');
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    };

    const setEvents = () => {
        $('.test-carousel-arrow.left').on('click', () => {
            const track = $('.carousel-track');
            const trackWidth = track[0].scrollWidth;
            const containerWidth = $('.test-carousel').width();
            const currentTransform = parseInt(track.css('transform').split(',')[4]) || 0;
            const newPosition = getNewPosition(track, 'left');
            
            if (currentTransform < 0) {
                track.css('transform', `translateX(${newPosition}px)`);
            }
        });
        $('.test-carousel-arrow.right').on('click', () => {
            const track = $('.carousel-track');
            const trackWidth = track[0].scrollWidth;
            const containerWidth = $('.test-carousel').width();
            const newPosition = getNewPosition(track, 'right');
            
            if (Math.abs(newPosition) <= (trackWidth - containerWidth)) {
                track.css('transform', `translateX(${newPosition}px)`);
            }
        });
    };

    const getNewPosition = (track, direction) => {
        const currentTransform = parseInt(track.css('transform').split(',')[4]) || 0;
        const itemWidth = $('.carousel-item').outerWidth(true);
        const trackWidth = track[0].scrollWidth;
        const containerWidth = $('.test-carousel').width();
        const remainingWidth = direction === 'left' ? 
            Math.abs(currentTransform) :
            trackWidth - (Math.abs(currentTransform) + containerWidth);

        if (direction === 'left') {
            return currentTransform + (remainingWidth < itemWidth ? remainingWidth : itemWidth);
        } else {
            return currentTransform - (remainingWidth < itemWidth ? remainingWidth : itemWidth);
        }
    }

    init();
    
})();

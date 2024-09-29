class CustomSwiper {
    constructor ( target ) {
        let swiper = null;

        const handler = {};
        const method = {};

        
        const setProperty = () => {
            swiper = new Swiper( target , {
                speed: 400,
                loop: false,
                spaceBetween: 10,
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 10
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    640: {
                        slidesPerView: 5,
                        spaceBetween: 10
                    }
                }
            });
        }
        const init = () => {
            setProperty();
        }
        init();
    }
}

export default CustomSwiper;
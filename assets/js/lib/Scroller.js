import data from '../../data.json' with {type: 'json'};
class CustomScroller {
    constructor ( target ) {

        const el = {
            target              : target,
            items               : null,
            circle              : null
        };

        const selector = {
            items               : 'section',
            circle              : '#circle'
        };

        const params = {
            deltaY: 0
        };

        const handler = {
            wheeler: (event) => {
                if (window.isEnabled) {
                    return;
                }

                const index = Number(Array.from(el.items).indexOf(event.currentTarget));
                params.deltaY+=event.deltaY;
                if (params.deltaY > 300) {
                    if (index < el.items.length-1) {
                        method.go('down', event.currentTarget);
                        method.changeCircleLocation(index+1);
                    } else { params.deltaY = 0; }
                }

                if (params.deltaY < -300) {
                    if (index > 0) {
                        method.go('up', event.currentTarget);
                        method.changeCircleLocation(index-1);
                    } else { params.deltaY = 0; }
                }
                
            }
        };
        const method = {
            isMobile: () => {
                return /Android/i.test(navigator.userAgent) ? "android" : /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "ios" : !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            },
            go: (direction, element) => {

                window.isEnabled = true;
                if (direction == 'down') {
                    gsap.to(document.body, { duration: 1, scrollTo: {y: element.offsetTop + window.innerHeight}, ease: "power2", onComplete: method.onComplete });
                } else {
                    gsap.to(document.body, { duration: 1, scrollTo: {y: element.offsetTop - window.innerHeight}, ease: "power2", onComplete: method.onComplete });
                }
            },
            onComplete: () => {
                params.deltaY = 0;
                window.isEnabled = false;
            },
            changeCircleLocation: (index) => {
                if (!method.isMobile()) {
                    const position = data.desktop[index];
                    el.circle.style.left = position.x + '%';
                    el.circle.style.top = position.y + '%';
                    el.circle.style.scale = position.scale;
                }
            }
        };

        
        const setProperty = () => {
            el.items = document.querySelectorAll(selector.items);
            el.circle = document.querySelector(selector.circle);
        }
        const bind = () => {
            el.target.onwheel = handler.wheeler;
            if (!window.isEnabled) { window.isEnabled = false; }
        };

        const init = () => {
            setProperty();
            bind();
        }
        init();
    }
}

export default CustomScroller;
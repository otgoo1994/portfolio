
const el = {
  menu          : null,
  sections      : null,
  swiper        : null,
  circle        : null,
  logo          : null,
  modal         : null,
  closeBtn      : null,
  hamburger     : null,
  elMoLink      : null
};

const params = {
  trigger       : false,
  circle        : [
    {x: 50, y: 20, scale: 1},
    {x: 60, y: 25, scale: 0.8},
    {x: 50, y: 20, scale: 1.5},
    {x: 50, y: 20, scale: 1.2}
  ],
  moCircle      : [
    {x: 38, y: 45, scale: 3},
    {x: -20, y: 40, scale: 4},
    {x: 70, y: 20, scale: 1},
    {x: 10, y: 40, scale: 3}
  ]
}

const method = {
  isMobile: () => {
    return /Android/i.test(navigator.userAgent) ? "android" : /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "ios" : !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
  }
};

const handler = {
  hrefLinkClick: (evt) => {
    const index = evt.currentTarget.getAttribute('idx');
    if (!index) {
      return;
    }

    if (el.modal) {
      el.modal.style.display = 'none';
      if (method.isMobile()) { document.body.style.overflow = 'auto'; }
    }

    document.body.scrollTop = index * window.innerHeight;
  },
  menuClick: (evt) => {
    const index = evt.currentTarget.getAttribute('idx');
    if (!index) {
      return;
    }
    params.trigger = true;
    if (el.modal) {
      el.modal.style.display = 'none';
      if (method.isMobile()) { document.body.style.overflow = 'auto'; }
    }

    if (!method.isMobile()) {
      gsap.to(document.body, { duration: 1, scrollTo: {y: index * window.innerHeight}, ease: "power2" })
      gsap.to(el.circle, { duration: 0.7, x: (window.innerWidth/100*params.circle[index].x), y: (index*window.innerHeight)+(window.innerHeight/100*params.circle[index].y), scale: params.circle[index].scale});
      return;
    }

    gsap.to(el.circle, { duration: 0.7, x: (window.innerWidth/100*params.moCircle[index].x), y: (index*window.innerHeight)+(window.innerHeight/100*params.moCircle[index].y), scale: params.moCircle[index].scale});
  },
  clickCloseBtn: function(evt) {
    if (!el.modal) {
      return;
    }

    el.modal.style.display = 'none';
    if (method.isMobile()) { document.body.style.overflow = 'auto'; }
  },
  clickHamburger: function() {
    if (!el.modal) {
      return;
    }

    document.body.style.overflow = 'hidden';
    el.modal.style.display = 'block';
  }
};

const setProperty = () => {
  el.menu = document.querySelectorAll('td.link');
  el.elMoLink = document.querySelectorAll('#modal a.title');
  el.sections = document.querySelectorAll('section');
  el.circle = document.querySelector('#circle');
  el.logo = document.querySelector('#logo');
  el.modal = document.querySelector('#modal');
  el.closeBtn = document.querySelector('#modal .close-btn');
  el.hamburger = document.querySelector('#hamburger');
}

const bind = () => {
  // document.body.scrollTop = 0;

  el.logo.addEventListener('click', handler.menuClick);
  el.menu.forEach((element, idx) => {
    element.setAttribute('idx', idx);
    element.addEventListener('click', handler.menuClick);
  });

  el.elMoLink.forEach((element, idx) => {
    element.setAttribute('idx', idx);
    element.addEventListener('click', handler.hrefLinkClick);
  });

  el.sections.forEach((element, idx) => {
    ScrollTrigger.create({
      id: 'slide-scroll' + idx,
      trigger: element,
      start:  'top 50%',
      end: 'bottom 80%',
      onEnter: () => {
        // !params.trigger ? gsap.to(document.body, { duration: 1, scrollTo: {y: idx * window.innerHeight}, ease: "power2" }) : null;
        if (!params.circle[idx]) {
          return;
        }
        if (!method.isMobile()) {
          gsap.to(el.circle, { duration: 0.7, x: (window.innerWidth/100*params.circle[idx].x), y: (idx*window.innerHeight)+(window.innerHeight/100*params.circle[idx].y), scale: params.circle[idx].scale});
          return;
        }

        gsap.to(el.circle, { duration: 0.7, x: (window.innerWidth/100*params.moCircle[idx].x), y: (idx*window.innerHeight)+(window.innerHeight/100*params.moCircle[idx].y), scale: params.moCircle[idx].scale});
      },
      onEnterBack: () => {
        // !params.trigger ? gsap.to(document.body, { duration: 1, scrollTo: {y: idx * window.innerHeight}, ease: "power2" }) : null;
        if (!params.circle[idx]) {
          return;
        }

        if (!method.isMobile()) {
          gsap.to(el.circle, { duration: 0.7, x: (window.innerWidth/100*params.circle[idx].x), y: (idx*window.innerHeight)+(window.innerHeight/100*params.circle[idx].y), scale: params.circle[idx].scale});
          return;
        }
        gsap.to(el.circle, { duration: 0.7, x: (window.innerWidth/100*params.moCircle[idx].x), y: (idx*window.innerHeight)+(window.innerHeight/100*params.moCircle[idx].y), scale: params.moCircle[idx].scale});
      }
    });
  });


  el.swiper = new Swiper('.swiper', {
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

  el.closeBtn.addEventListener('click', handler.clickCloseBtn);
  el.hamburger.addEventListener('click', handler.clickHamburger);

  if (!method.isMobile()) { document.body.style.overflow = 'hidden'; }
}

const contentReady = () => {
  setProperty();
  bind();
}


const checkState = () => {
  return document.readyState === 'complete'
}


let loader = null;
'loading' === document.readyState
? loader = setInterval(() => {
  checkState() ? (clearInterval(loader), contentReady()) : null;
}, 100) : contentReady();
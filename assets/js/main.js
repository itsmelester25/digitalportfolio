  (function() {
  "use strict";

  /**
   * Light-Dark Mode
   */

  document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const toggleText = document.getElementById('toggle-text');
    const stars = document.getElementById('stars');

    if (currentTheme) {
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            stars.style.display = 'block';
            toggleSwitch.checked = true;
            toggleText.textContent = 'Dark Mode';
        }
    }

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            stars.style.display = 'block';
            toggleText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            stars.style.display = 'none';
            toggleText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'light');
        }
    });
});

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    const progressCircle = document.querySelector('.progress-circle circle');
    const circumference = 2 * Math.PI * 18;
  
    window.addEventListener('scroll', function() {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercent = (scrollPosition / scrollTotal) * 100;
  
      const offset = circumference - (scrollPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = scrollPosition === 0 ? circumference : offset;
  
      if (scrollPosition > 100) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
  
    backToTopButton.addEventListener('click', function(event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });  

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = document.querySelector('#preloader');
  let loadingCounter = document.querySelector('#loading-counter');
  if (preloader && loadingCounter) {
    window.addEventListener('load', () => {
      let counter = 0;
      setTimeout(() => {
        loadingCounter.style.opacity = 1;
      }, 100);
      let interval = setInterval(() => {
        if (counter < 100) {
          counter++;
          loadingCounter.textContent = counter + '%';
        } else {
          clearInterval(interval);
          setTimeout(() => {
            preloader.remove();
          }, 1500);
        }
      }, 30);
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Certifications 
   */
  document.addEventListener("DOMContentLoaded", function() {
    var showMoreBtn = document.getElementById("show-more-btn");
    var showMoreText = document.getElementById("show-more-text");
    var chevronIcon = document.getElementById("chevron-icon");
    var certItems = document.querySelectorAll(".cert-item");
    var isOpen = false;
  
    certItems.forEach(function(item, index) {
      if (index >= 3) {
        item.style.display = "none";
      }
    });
  
    showMoreBtn.addEventListener("click", function() {
      certItems.forEach(function(item, index) {
        if (index >= 3) {
          if (isOpen) {
            item.style.display = "none";
            showMoreText.textContent = "Show More";
            chevronIcon.classList.remove("fa-chevron-up");
            chevronIcon.classList.add("fa-chevron-down");
          } else {
            item.style.display = "block";
            showMoreText.textContent = "Show Less";
            chevronIcon.classList.remove("fa-chevron-down");
            chevronIcon.classList.add("fa-chevron-up");
          }
        }
      });
      isOpen = !isOpen;
    });
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

  /**
   * Contact Form 
   */

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    let valid = true;
  
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
      const errorDiv = field.nextElementSibling;
      if (!field.value.trim()) {
        errorDiv.textContent = `${field.placeholder} is required.`;
        errorDiv.style.display = 'block';
        valid = false;
      } else if (field.type === "email" && !validateEmail(field.value)) {
        errorDiv.textContent = 'Please enter a valid email address.';
        errorDiv.style.display = 'block';
        valid = false;
      } else {
        errorDiv.style.display = 'none';
      }
    });

    const recaptchaResponse = form.querySelector('[name="g-recaptcha-response"]').value;
    if (!recaptchaResponse) {
      document.getElementById('recaptcha-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('recaptcha-error').style.display = 'none';
    }
  
    if (valid) {
      document.getElementById('loading').style.display = 'block';
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        document.getElementById('loading').style.display = 'none';
        if (response.ok) {
          document.getElementById('form-message').style.display = 'block';
          form.reset();
        } else {
          alert('There was a problem with your submission. Please try again.');
        }
      })
      .catch(error => {
        document.getElementById('loading').style.display = 'none';
        alert('There was an error submitting the form. Please try again.');
      });
    }
  });
  
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  document.querySelectorAll('input[required], textarea[required]').forEach(field => {
    field.addEventListener('input', () => {
      const errorDiv = field.nextElementSibling;
      if (field.value.trim() && (field.type !== "email" || validateEmail(field.value))) {
        errorDiv.style.display = 'none';
      } else {
        if (!field.value.trim()) {
          errorDiv.textContent = `${field.placeholder} is required.`;
        } else if (field.type === "email" && !validateEmail(field.value)) {
          errorDiv.textContent = 'Please enter a valid email address.';
        }
        errorDiv.style.display = 'block';
      }
    });
  });

  document.addEventListener('input', function(event) {
    if (event.target.name === 'g-recaptcha-response') {
      if (event.target.value) {
        document.getElementById('recaptcha-error').style.display = 'none';
      } else {
        document.getElementById('recaptcha-error').style.display = 'block';
      }
    }
  });

function saveFormData() {
  const form = document.getElementById('contact-form');
  const formData = new FormData(form);
  
  formData.forEach((value, key) => {
      localStorage.setItem(key, value);
  });
}

function loadFormData() {
  const form = document.getElementById('contact-form');
  
  form.querySelectorAll('input, textarea').forEach(field => {
      const savedValue = localStorage.getItem(field.name);
      if (savedValue !== null) {
          field.value = savedValue;
      }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadFormData();
});

document.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('input', () => {
      saveFormData();
  });
});

document.getElementById('contact-form').addEventListener('submit', () => {
  localStorage.clear();
});

  /**
   * Service Worker  
   */
  
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('assets/js/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
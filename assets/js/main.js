(function ($) {
  "use strict";

  /*
  |=====================================================================
  | Template Name: Axisbuilt
  | Author: Laralink
  | Version: 1.0.0
  |=====================================================================
  |=====================================================================
  | TABLE OF CONTENTS:
  |=====================================================================
  |
  | 01. Preloader
  | 02. Mobile Menu
  | 03. Sticky Header
  | 04. Dynamic Background
  | 05. Swiper Slider
  | 06. Search Modal Toggle
  | 07. Smooth Page Scroll(Lenis)
  | 08. Counter Animation
  | 09. Modal Video
  | 10. Review
  | 11. Tabs
  | 12. Progress Bar
  | 13. Accordian
  | 14. Service Steps Animation
  | 15. Card Hover
  | 16. Scroll Up
  | 17. Hobble Animation With Mouse Move
  | 18. Animation With GSAP
  | 19. Dynamic contact form
  | 20. service Hover Tabs
  |
  */

  /*====================================================================
    Scripts initialization
  ======================================================================*/
  $(".tom_select").each(function () {
      new TomSelect(this, {
        create: false,
        onDropdownOpen: function (dropdown) {
          dropdown.classList.add("active");
        },
        onDropdownClose: function (dropdown) {
          dropdown.classList.remove("active");
        },
      });
    });
    
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    preloader();
  });
  $(window).on("scroll", function () {
    stickyHeader();
    showScrollUp();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    swiperInit();
    counterInit();
    modalVideo();
    tabs();
    accordian();
    serviceSteps();
    scrollUp();
    progressBar();
    cardHoverActive();
    serviceHoverTabs()
    showIcon()
    awardHover()
    if ($.exists(".cs_getting_year")) {
      const date = new Date();
      $(".cs_getting_year").text(date.getFullYear());
    }
  });
  /*=============================================================
   Run on window resize
  ===============================================================*/
  $(window).on("resize", function () {
    const mobileWidth = 1199;
    if ($(window).width() >= mobileWidth) {
    }
    // ScrollTrigger.refresh();
  });
  /*=============================================================
    01. Preloader
  ===============================================================*/
  function preloader() {
    const $preloader = $(".cs_preloader");
    const $progressBar = $(".cs_progressbar");
    const $percentageText = $(".cs_loading_percentage");

    let progress = 0;
    let isLoaded = false;

    const startTime = Date.now();
    let estimatedDuration = 1500; // fallback

    // detect real page load
    window.addEventListener("load", () => {
      const loadTime = Date.now() - startTime;
      estimatedDuration = loadTime;
      isLoaded = true;
    });

    const interval = setInterval(function () {
      const elapsed = Date.now() - startTime;

      // calculate target progress based on time
      let target = (elapsed / estimatedDuration) * 100;

      if (!isLoaded) {
        // prevent finishing too early
        progress = Math.min(target, 100);
      } else {
        // allow full completion
        progress = Math.min(target, 100);
      }

      updateProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        setTimeout(function () {
          $preloader.fadeOut(300);
        }, 100);
      }
    }, 15);
    function updateProgress(value) {
      const rounded = Math.floor(value);
      $progressBar.css("width", rounded + "%");
      $percentageText.text(rounded + "%");
    }
    const $text = $(".cs_loading_text");
    const text = $text.text();
    $text.empty();

    // Split text into characters
    const characters = text.split("");
    characters.forEach((char) => {
      $text.append(
        `<span class="char">${char === " " ? "&nbsp;" : char}</span>`,
      );
    });

    // Animate each character
    // gsap.from(".cs_loading_text .char", {
    //   opacity: 0,
    //   y: 100,
    //   duration: 0.6,
    //   stagger: 0.1,
    // });
  }
  /*=============================================================
    02. Mobile Menu
  ===============================================================*/
  function mainNav() {
    $(".cs_nav").append('<span class="cs_menu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="cs_menu_dropdown_toggle"><span></span></span>',
    );
    $(".cs_menu_toggle").on("click", function () {
      $(this)
        .toggleClass("active")
        .siblings(".cs_nav_list_wrapper")
        .toggleClass("active");
      $(".cs_close_nav").toggleClass("active");
    });

    $(".cs_menu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });
    // $(".cs_search_btn").on("click", function () {
    //   $(".cs_header_search").addClass("active");
    //   $(".cs_user_content").slideUp();
    // });
    // $(".cs_close, .cs_sidenav_overlay").on("click", function () {
    //   $(".cs_sidenav, .cs_header_search").removeClass("active");
    // });
    // $(".cs_close_nav").on("click", function () {
    //   $(this)
    //     .toggleClass("active")
    //     .parent(".cs_nav_list_wrapper")
    //     .toggleClass("active");
    //   $(".cs_menu_toggle").toggleClass("active");
    // });
 /* Side Nav */
    $('.cs_hamburger_info_btn').on('click', function () {
      $('.cs_side_header').addClass('active');
      $('html').addClass('cs_hamburger_active');
    });
    $('.cs_close, .cs_side_header_overlay').on('click', function () {
      $('.cs_side_header').removeClass('active');
      $('html').removeClass('cs_hamburger_active');
    });

    /* Hamburger Menu */
    $('.cs_hamburger_menu .menu-item-has-children>a').on('click', function (e) {
      e.preventDefault();
      $(this).siblings('ul').slideToggle();
      $(this).siblings('.cs_munu_dropdown_toggle').toggleClass('active');
    });

    $('.cs_hamburger_menu_btn').on('click', function (e) {
      $('.cs_hamburger_header, .cs_hamburger_overlay').addClass('active');
      $('html').addClass('cs_hamburger_active');
    });
    $('.cs_close, .cs_hamburger_overlay').on('click', function (e) {
      $('.cs_hamburger_header, .cs_hamburger_overlay').removeClass('active');
      $('html').removeClass('cs_hamburger_active');
    });

  }
  /*=============================================================
    03. Sticky Header
  ===============================================================*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".cs_sticky_header").addClass("cs_sticky_active");
    } else {
      $(".cs_sticky_header").removeClass("cs_sticky_active");
    }
  }
  /*=============================================================
    04. Dynamic Background
  ===============================================================*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }
  /*============================================================
    05. Swiper Slider
  ==============================================================*/
  function swiperInit() {
    if (typeof Swiper === "undefined") {
      console.warn("Swiper library not loaded");
      return;
    }
    const sliders = document.querySelectorAll(".cs_slider");

    sliders.forEach((slider) => {
      const container = slider.querySelector(".cs_slider_container");
      const swiperWrapper = slider.querySelector(".swiper-wrapper");
      const status = slider.querySelector(".cs_slider_number");
      if (!container || !swiperWrapper) {
        return;
      }

      // Read data attributes
      let autoPlayVar =
        parseInt(container.getAttribute("data-autoplay"), 10) || 0;
      let autoplaySpdVar = 3000; // default
      if (autoPlayVar > 1) {
        autoplaySpdVar = autoPlayVar;
        autoPlayVar = 1;
      }
      const reverseVar =
        parseInt(container.getAttribute("data-reverse"), 10) === 1;

       const directionVar =
        container.getAttribute("data-direction") === "vertical"
          ? "vertical"
          : "horizontal";

      const speedVar =
        parseInt(container.getAttribute("data-speed"), 10) || 600;
        const variableWidthVar = parseInt(container.getAttribute("data-variable-width"), 10) === 1;
      const loopVar = Boolean(
        parseInt(container.getAttribute("data-loop"), 10)
      );
      const centerVar = Boolean(
        parseInt(container.getAttribute("data-center"), 10)
      );
      const fadeVar = parseInt(container.getAttribute("data-fade-slide")) === 1;

      let slidesPerView =
        parseInt(container.getAttribute("data-slides-per-view"), 10) || 3;

      // Gap value
      let gapVar = parseInt(container.getAttribute("data-gap"), 10);
      if (isNaN(gapVar)) {
        gapVar = 24; // fallback
      }
      

      // Responsive breakpoints
      let breakpoints = {};
      if (container.getAttribute("data-slides-per-view") === "responsive") {
        const xxl =
          parseInt(container.getAttribute("data-xxl-slides"), 10) || 3;
        const xl = parseInt(container.getAttribute("data-xl-slides"), 10) || 3;
        const lg = parseInt(container.getAttribute("data-lg-slides"), 10) || 3;
        const md = parseInt(container.getAttribute("data-md-slides"), 10) || 2;
        const sm = parseInt(container.getAttribute("data-sm-slides"), 10) || 1;
        const xs = parseInt(container.getAttribute("data-xs-slides"), 10) || 1;

        // Responsive gaps (optional, if provided)
        const xxlGap =
          parseInt(container.getAttribute("data-xxl-gap"), 10) || gapVar;
        const xlGap =
          parseInt(container.getAttribute("data-xl-gap"), 10) || gapVar;
        const lgGap =
          parseInt(container.getAttribute("data-lg-gap"), 10) || gapVar;
        const mdGap =
          parseInt(container.getAttribute("data-md-gap"), 10) || gapVar;
        const smGap =
          parseInt(container.getAttribute("data-sm-gap"), 10) || gapVar;
        const xsGap =
          parseInt(container.getAttribute("data-xs-gap"), 10) || gapVar;

        breakpoints = {
          1400: { slidesPerView: xxl, spaceBetween: xxlGap },
          1200: { slidesPerView: xl, spaceBetween: xlGap },
          1024: { slidesPerView: lg, spaceBetween: lgGap },
          768: { slidesPerView: md, spaceBetween: mdGap },
          575: { slidesPerView: sm, spaceBetween: smGap },
          0: { slidesPerView: xs, spaceBetween: xsGap },
        };
        slidesPerView =
          parseInt(container.getAttribute("data-add-slides"), 10) || 3;
      }

      // Navigation & pagination
      const nextEl = slider.querySelector(".cs_right_arrow");
      const prevEl = slider.querySelector(".cs_left_arrow");
      const paginationEl = slider.querySelector(".swiper-pagination");
      const hasPagination = paginationEl !== null;

      // Initialize Swiper
      const swiper = new Swiper(container, {
        direction: directionVar,
        loop: loopVar,
        speed: speedVar,
        slidesPerView: variableWidthVar ? "auto" : slidesPerView,  
        variableWidth: variableWidthVar,
        slidesPerGroup: 1,
        spaceBetween: gapVar, // 👈 dynamic gap
        centeredSlides: centerVar,
        effect: fadeVar ? "fade" : "slide",
        autoplay: autoPlayVar
          ? { delay: autoplaySpdVar, disableOnInteraction: false,
          reverseDirection: reverseVar, }
          : false,
        navigation: {
          nextEl: nextEl,
          prevEl: prevEl,
        },
        pagination: hasPagination ? { el: paginationEl, clickable: true } : {},
        breakpoints: breakpoints,
        on: {
          init: function () {
            if (status) {
              const current = this.realIndex + 1;
              const total =
                this.slides.length - (loopVar ? this.loopedSlides * 2 : 0);
              status.innerHTML = `
              <span class="cs_current_number" data-number="${current}"><span>${current}</span></span>
              <span class="cs_slider_number_seperator"></span>
              <span class="cs_total_numbers" data-number="${total}"><span>${total}</span></span>
            `;
            }
          },
          slideChange: function () {
            if (status) {
              const current = this.realIndex + 1;
              const total =
                this.slides.length - (loopVar ? this.loopedSlides * 2 : 0);
              status.innerHTML = `
              <span class="cs_current_number" data-number="${current}"><span>${current}</span></span>
              <span class="cs_slider_number_seperator"></span>
              <span class="cs_total_numbers" data-number="${total}"><span>${total}</span></span>
            `;
            }
          },
        },
      });
    });

    // Product Single Slider
    if ($(".cs_single_product_slider").length > 0) {
      const gallery = document.querySelector(".cs_single_product_gallery");
      const navType = gallery ? gallery.getAttribute("data-nav") : "horizontal";
      const isVertical = navType === "vertical";
      // Initialize Thumbnail slider first
      const propertyNav = new Swiper(".cs_single_product_nav", {
        direction: isVertical ? "vertical" : "horizontal",
        spaceBetween: 20,
        slidesPerView: 3,
        freeMode: true,
        navigation: false,
        watchSlidesProgress: true,
        mousewheel: isVertical ? true : false, // 👈 only for vertical
    breakpoints: isVertical ? {} : { // 👈 breakpoints only for horizontal
      320: { slidesPerView: 3, spaceBetween: 10 },
      450: { slidesPerView: 4, spaceBetween: 30 },
      768: { slidesPerView: 4, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
    }
      });

      // Initialize Main slider with connection to thumbnails
      new Swiper(".cs_single_product_slider", {
  spaceBetween: 0,
  slidesPerView: 1,
  effect: "slide",
  fadeEffect: { crossFade: true },
  thumbs: { swiper: propertyNav },
  navigation: {
    nextEl: ".cs_right_arrow",
    prevEl: ".cs_left_arrow",
  },
  loop: false,
  autoplay: false,
});
    }
  }
  /*============================================================
    06. Counter Animation
  ==============================================================*/
  function counterInit() {
    if (!$.exists(".odometer")) return;

    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = $(entry.target);
            el.html(el.data("count-to"));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    $(".odometer").each(function () {
      observer.observe(this);
    });
  }
  /*============================================================
    07. Modal Video
  ==============================================================*/
  function modalVideo() {
    if ($.exists(".cs_video_open")) {
      $("body").append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup_container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup_close"></div>
            </div>
          </div>
        </div>
      `);

      function getEmbedUrl(url) {
        let videoId =
          url.split("youtu.be/")[1]?.split("?")[0] ||
          url.split("v=")[1]?.split("&")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
      }

      $(document).on("click", ".cs_video_open", function (e) {
        e.preventDefault();
        var video = $(this).attr("href");
        var embedUrl = getEmbedUrl(video);

        $(".cs_video_popup_container iframe").attr("src", embedUrl);
        $(".cs_video_popup").addClass("active");
      });

      $(".cs_video_popup_close, .cs_video_popup-layer").on(
        "click",
        function (e) {
          $(".cs_video_popup").removeClass("active");
          $("html").removeClass("overflow-hidden");
          $(".cs_video_popup_container iframe").attr("src", "about:blank");
          e.preventDefault();
        },
      );
    }
}
  /*============================================================
    8. Tabs
  ===============================================================*/
  function tabs() {
    $(".cs_tab_links a").on("click", function (e) {
      var currentAttrValue = $(this).attr("href");
      //Tab and slider both activation code
      $(".cs_tabs " + currentAttrValue)
        .addClass("active")
        .siblings()
        .removeClass("active");
      $(this).parents("li").addClass("active").siblings().removeClass("active");
      e.preventDefault();
    });
  }
  /*--------------------------------------------------------------
    9. Progress Bar
  --------------------------------------------------------------*/
  function progressBar() {
    $(".cs_progress").each(function () {
      var progressPercentage = $(this).data("progress") + "%";
      $(this).find(".cs_progress_in").css("width", progressPercentage);
    });
  }
  /*=============================================================
    10. Accordian
  ===============================================================*/
  function accordian() {
    $(".cs_accordian").children(".cs_accordian_body").hide();
    $(".cs_accordian.active").children(".cs_accordian_body").show();
    $(".cs_accordian_head").on("click", function () {
      $(this)
        .parent(".cs_accordian")
        .siblings()
        .children(".cs_accordian_body")
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find(".cs_accordian_body")
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents(".cs_accordian").addClass("active");
      $(this).parent(".cs_accordian").siblings().removeClass("active");
    });
  }
  /*===========================================================
    11. Service Steps Animation
  =============================================================*/
  
  function serviceSteps() {
    let tabInterval;
    let currentIndex = 0;

    const $tabs = $(".cs_card_wrapper_style_1");
    const $tabContents = $(".cs_card_style_9");
    const intervalTime = 5000;

    if ($tabs.length > 0 && $tabContents.length > 0) {
      function activateTab(index) {
        $tabContents.eq(index).addClass("active").siblings().removeClass("active");
      }

      function startAutoplay() {
        stopAutoplay();
        tabInterval = setInterval(function () {
          currentIndex = (currentIndex + 1) % $tabContents.length;
          activateTab(currentIndex);
        }, intervalTime);
      }

      function stopAutoplay() {
        if (tabInterval) clearInterval(tabInterval);
      }

      $tabs.on("click", function (e) {
        e.preventDefault();
        stopAutoplay();
        currentIndex = $(this).index();
        activateTab(currentIndex);
        startAutoplay();
      });

      // Init
      activateTab(currentIndex);
      startAutoplay();
    }
  }
  /*==============================================================
   12. Card Hover
  ================================================================*/
  function cardHoverActive() {
    $(".cs_card_style_6").on("mouseenter", function () {
      $(this)
        .addClass("active")
        .siblings(".cs_card_style_6")
        .removeClass("active");
    });
  }
  /*==============================================================
    12. Scroll Up
  ================================================================*/
  function scrollUp() {
    $(".cs_scrollup_btn").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        0,
      );
    });
  }
  /* For Scroll Up */
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".cs_scrollup_btn").addClass("show");
    } else {
      $(".cs_scrollup_btn").removeClass("show");
    }
  }

    /*===============================================================
    13. Team hover
  =================================================================*/
  function serviceHoverTabs() {
    $(".cs_team_style_5").each(function () {
      console.log("hello");
      var $section = $(this);
      var $items = $section.find(".cs_team_menu_item");
      var $panes = $section.find(".cs_team_pane");

      if (!$items.length || !$panes.length) return;

      $items.on("mouseenter focus", function () {
        var idx = $items.index(this);
        $items.removeClass("cs_active");
        $(this).addClass("cs_active");
        $panes.removeClass("cs_active");
        $panes.eq(idx).addClass("cs_active");
      });
    });
  }

   /*===============================================================
    14. show icon
  =================================================================*/
function showIcon() {
  $(".cs_icon_btn").on("click", function (e) {
    e.preventDefault();

    var $thisBtn = $(this);
    var $thisCard = $thisBtn.closest("[class*='cs_team_style_']");
    var $thisThumbnail = $thisCard.find(".cs_team_thumbnail");
    var $thisSocial = $thisCard.find(".cs_social_btns_style_1");

    var isActive = $thisBtn.hasClass("active");
    $(".cs_icon_btn").removeClass("active");
    $(".cs_social_btns_style_1").removeClass("active");
    $(".cs_team_thumbnail").removeClass("active");

    if (!isActive) {
      $thisBtn.addClass("active");
      $thisSocial.addClass("active");
      $thisThumbnail.addClass("active");
    }
  });
}

    /*-----------------------------------------------------------
    15. Award Wining
  --------------------------------------------------------------*/
  function awardHover() {
    const awardItem = document.querySelectorAll('.cs_accordian.cs_style_4');

    function followImageCursor(event, awardItem) {
      const contentBox = awardItem.getBoundingClientRect();
      const dx = event.clientX - contentBox.x;
      const dy = event.clientY - contentBox.y;
      awardItem.children[2].style.transform = `translate(${dx}px, ${dy}px)`;
    }

    awardItem.forEach((item, i) => {
      item.addEventListener('mousemove', event => {
        setInterval(followImageCursor(event, item), 1000);
      });
    });
  }


})(jQuery); // End of use strict

$(function () {

    $('.navbar-toggle').click(function () {
        $(this).toggleClass('act');
        if ($(this).hasClass('act')) {
            $('.main-menu').addClass('act');
        }
        else {
            $('.main-menu').removeClass('act');
        }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

    /* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
        $('.progress .progress-bar').progressbar({
            transition_delay: 500
        });
    }

    $(document).bind('scroll', function (ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolsl again
            $(document).unbind('scroll');
        }
    });

    /* Counters  */
    if ($(".section-counters .start").length > 0) {
        $(".section-counters .start").each(function () {
            var stat_item = $(this),
                offset = stat_item.offset().top;
            $(window).scroll(function () {
                if ($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };

    // another custom callback for counting to infinity
    $('#infinity').data('countToOptions', {
        onComplete: function (value) {
            count.call(this, {
                from: value,
                to: value + 1
            });
        }
    });

    $('#infinity').each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Navigation overlay
    var s = skrollr.init({
        forceHeight: false,
        smoothScrolling: false,
        mobileDeceleration: 0.004,
        mobileCheck: function () {
            //hack - forces mobile version to be off
            return false;
        }
    });

    // tech stack bar
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute('data-animated', true);

            const scrollerInner = scroller.querySelector(".tech-stack-logos");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute('aria-hidden', true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

});
// $(document).ready(function() {
//     var $techStackLogos = $('.tech-stack-logos');
//     var $logos = $techStackLogos.children('img');
//     var logoWidth = $logos.outerWidth(true);
//     var totalLogos = $logos.length;

//     // Clone the logos for circular effect
//     $techStackLogos.append($logos.clone());
//     $techStackLogos.prepend($logos.clone());

//     var scrollPosition = logoWidth * totalLogos; // Start from the middle
//     $techStackLogos.css('transform', 'translateX(-' + scrollPosition + 'px)');

//     var scrollSpeed = 0.08; // Adjust this value for speed
//     var continuousScrollInterval;

//     function continuousScroll() {
//         scrollPosition += scrollSpeed;
//         var maxScroll = logoWidth * totalLogos;
//         if (scrollPosition >= maxScroll * 2) {
//             scrollPosition -= maxScroll;
//             $techStackLogos.css('transition', 'none');
//             $techStackLogos.css('transform', 'translateX(-' + scrollPosition + 'px)');
//             setTimeout(function() {
//                 $techStackLogos.css('transition', 'transform 0.5s linear');
//             }, 0);
//         } else {
//             $techStackLogos.css('transform', 'translateX(-' + scrollPosition + 'px)');
//         }
//         continuousScrollInterval = requestAnimationFrame(continuousScroll);
//     }

//     function startContinuousScroll() {
//         if (!continuousScrollInterval) {
//             continuousScrollInterval = requestAnimationFrame(continuousScroll);
//         }
//     }

//     function stopContinuousScroll() {
//         if (continuousScrollInterval) {
//             cancelAnimationFrame(continuousScrollInterval);
//             continuousScrollInterval = null;
//         }
//     }

//     function scrollLogos(direction) {
//         stopContinuousScroll();
//         var maxScroll = logoWidth * totalLogos;
//         if (direction === 'left') {
//             scrollPosition -= logoWidth * 3; // Scroll 3 logos at a time
//             if (scrollPosition < 0) {
//                 scrollPosition += maxScroll;
//             }
//         } else {
//             scrollPosition += logoWidth * 3; // Scroll 3 logos at a time
//             if (scrollPosition >= maxScroll * 2) {
//                 scrollPosition -= maxScroll;
//             }
//         }
//         $techStackLogos.css('transition', 'transform 0.5s ease-in-out');
//         $techStackLogos.css('transform', 'translateX(-' + scrollPosition + 'px)');
//         $techStackLogos.one('transitionend webkitTransitionEnd oTransitionEnd', function() {
//             $techStackLogos.css('transition', 'none');
//             startContinuousScroll();
//         });
//     }

//     $('.left-arrow').click(function() {
//         scrollLogos('left');
//     });

//     $('.right-arrow').click(function() {
//         scrollLogos('right');
//     });

//     startContinuousScroll();
// });    
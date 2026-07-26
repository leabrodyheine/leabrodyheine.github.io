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

    // Suppress the mobile menu's open/close transition while the window is
    // actively being resized -- crossing the hamburger breakpoint mid-resize
    // would otherwise animate the (empty, unclicked) overlay fading in and
    // out, which reads as a flash. Re-enabled shortly after resizing stops
    // so a real click still animates normally.
    var resizeSettleTimer;
    $(window).on('resize', function () {
        $('html').addClass('is-resizing');
        clearTimeout(resizeSettleTimer);
        resizeSettleTimer = setTimeout(function () {
            $('html').removeClass('is-resizing');
        }, 250);
    });

    var headerOffset = $('.site-header').outerHeight();

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - headerOffset
        }, 800, 'easeOutExpo');
        $('.navbar-toggle').removeClass('act');
        $('.main-menu').removeClass('act');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: headerOffset + 10
    });

    /* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
        $('.progress .progress-bar').progressbar({
            transition_delay: 500
        });
    }

    if ($section.length) {
        $(document).bind('scroll', function (ev) {
            var scrollOffset = $(document).scrollTop();
            var containerOffset = $section.offset().top - window.innerHeight;
            if (scrollOffset > containerOffset) {
                loadDaBars();
                $(document).unbind('scroll');
            }
        });
    }

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

    // Portfolio section: filter project cards by category
    $(document).on('click', '.portfolio-filter', function () {
        var filter = $(this).data('filter');

        $('.portfolio-filter').removeClass('active');
        $(this).addClass('active');

        $('.portfolio-col').each(function () {
            var $col = $(this);
            var show = filter === 'all' || $col.data('category') === filter;
            $col.toggleClass('is-hidden', !show);
        });
    });

    // Portfolio section: clicking anywhere on a card opens its project modal,
    // except the GitHub link -- that should only navigate, not also pop the modal.
    function openPortfolioCardModal($card) {
        var target = $card.data('modal-target');
        if (target) $(target).modal('show');
    }

    $(document).on('click', '.portfolio-card', function (event) {
        if ($(event.target).closest('.portfolio-card-links').length) return;
        openPortfolioCardModal($(this));
    });

    $(document).on('keydown', '.portfolio-card', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if ($(event.target).closest('.portfolio-card-links').length) return;
        event.preventDefault();
        openPortfolioCardModal($(this));
    });

    // Dissertation section: clicking a tab shows its block and hides the others
    $(document).on('click', '.dissertation-tab', function (event) {
        event.preventDefault();
        var targetId = $(this).attr('href');

        $('.dissertation-tab').removeClass('active');
        $(this).addClass('active');

        $('.dissertation-block').removeClass('active');
        $(targetId).addClass('active');
    });

    // Size the hero name as a percentage of its column's width so it scales
    // continuously as the window is resized, instead of sitting at one fixed
    // size and only reacting once a breakpoint is crossed. The shrink loop
    // below is just a safety net: Bootstrap's column width isn't perfectly
    // smooth (it can dip briefly around the mode switch to the stacked
    // mobile layout), so this catches the rare case where the percentage-based
    // size would still overflow.
    var HERO_NAME_RATIO = 0.0623;
    var MAX_HERO_NAME_FONT = 46;
    var MIN_HERO_NAME_FONT = 24;

    function fitHeroName() {
        var $name = $('.hero h1');
        if (!$name.length) return;
        // Force single-line, and shrink-wrap to the text itself (inline-block)
        // while measuring -- a block-level element's scrollWidth just matches
        // its own box (which fills the container) whenever the text is
        // narrower than that box, so it never signals the true text width.
        var containerWidth = $name.parent().width();
        var fontSize = Math.min(MAX_HERO_NAME_FONT, Math.max(MIN_HERO_NAME_FONT, containerWidth * HERO_NAME_RATIO));
        $name.css({ whiteSpace: 'nowrap', display: 'inline-block', fontSize: fontSize + 'px' });
        while ($name[0].scrollWidth > containerWidth && fontSize > MIN_HERO_NAME_FONT) {
            fontSize -= 1;
            $name.css('font-size', fontSize + 'px');
        }
        $name.css('display', '');
    }

    var heroNameFrame;
    $(window).on('resize', function () {
        cancelAnimationFrame(heroNameFrame);
        heroNameFrame = requestAnimationFrame(fitHeroName);
    });

    fitHeroName();
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(fitHeroName);
    }

});
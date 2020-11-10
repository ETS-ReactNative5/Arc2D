var Startuply;
jQuery(document).on("ready", function () {
    Startuply.init();
}),
    (Startuply = {
        defaults: {
            log: !1,
            styleSwitcher: !1,
            animations: !0,
            onePageNav: !0,
            onePageNavHashChange: !1,
            alwaysMobileMenuMode: !1,
            mobileMenuMaxWidth: 768,
            stickyMenuMode: !0,
            stickyMenuOffset: 500,
            smoothScroll: !1,
            smoothScrollSpeed: 800,
            ajaxedForm: !0,
            ajaxedFormSuccessMsg: "Success",
            ajaxedFormErrorMsg: "An error occured. Please try again later.",
            toastrPositionClass: "toast-top-full-width",
        },
        mobileDevice: !1,
        mobileMenuView: !1,
        flexsliderOptions: { manualControls: ".flex-manual .switch", nextText: "", prevText: "", startAt: 1, slideshow: !1, direction: "horizontal", animation: "slide" },
        log: function (t) {
            this.options.log && console.log("%cStartupLy Log: " + t, "color: #1ac6ff");
        },
        buildStyleSwitcher: function () {
            $("body").append(
                '<div class="style-switcher"><a href="#" class="style-toggle"><i class="fa fa-cog"></i></a><h6>Color palette</h6><ul class="template-set-color"><li><a data-color="Blue" class="color blue" href="#" title="style"></a></li><li><a data-color="Pink" class="color pink" href="#" title="main-pink"></a></li><li><a data-color="Green" class="color green" href="#" title="main-green"></a></li><li><a data-color="Berry" class="color berry" href="#" title="main-berry"></a></li><li><a data-color="Orange" class="color orange" href="#" title="main-orange"></a></li></ul><div class="template-animations-switch"><h6>Animations</h6><input id="animations_switch" type="checkbox" checked="checked" /><label for="animations_switch"><i></i></label></div></div>'
            );
        },
        checkMobile: function () {
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < this.options.mobileMenuMaxWidth ? ((this.mobileDevice = !0), this.log("Mobile device")) : this.log("Desktop");
        },
        initAnimations: function () {
            var t = this;
            this.mobileDevice || !this.options.animations
                ? ($(".animated").css("opacity", 1),
                  this.log("Remove animations"),
                  $(".animated.counter-block .value").each(function () {
                      $(this).text($(this).data("to"));
                  }))
                : "function" == typeof $.fn.appear
                ? (this.log("Init animations"),
                  $(".animated").appear(
                      function () {
                          var e = $(this),
                              n = e.data("animation"),
                              o = e.data("delay") || 0,
                              i = e.data("duration") || 1e3;
                          t.options.animations
                              ? (e.css({ "-webkit-animation-delay": o + "ms", "animation-delay": o + "ms", "-webkit-animation-duration": i / 1e3 + "s", "animation-duration": i / 1e3 + "s" }),
                                e.addClass(n),
                                t.log("Play animation " + n + " with delay = " + o + "ms and duration = " + i + "ms"),
                                e.one("webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart", function () {
                                    "function" == typeof $.fn.countTo ? e.hasClass("counter-block") && e.find(".value").countTo() : t.log("Can't find jQuery.countTo function");
                                }))
                              : (e.removeClass("animated"), "function" == typeof $.fn.countTo ? e.hasClass("counter-block") && e.find(".value").countTo() : t.log("Can't find jQuery.countTo function"));
                      },
                      { accY: -150 }
                  ))
                : ($(".animated").css("opacity", 1), this.log("Can't find jQuery.appear function"), this.log("Remove animations"));
        },
        mobileMenuStatus: function () {
            window.innerWidth < this.options.mobileMenuMaxWidth || this.options.alwaysMobileMenuMode ? (this.mobileMenuView = !0) : (this.mobileMenuView = !1),
                this.options.alwaysMobileMenuMode && $("body").addClass("always-mobile"),
                this.log("Mobile menu view " + (this.mobileMenuView ? "on" : "off")),
                this.mobileMenuView
                    ? $(".navigation-header .navigation-navbar").css({ height: $(window).height(), "max-height": $(window).height() })
                    : ($(".navigation-header .navigation-navbar").css({ height: "", "max-height": "" }), $(".dropdown").removeClass("opened"), $(".dropdown-menu").css("display", ""));
        },
        smoothScrollInit: function () {
            var t = this;
            !(function () {
                function e() {
                    p.keyboardSupport && l("keydown", i);
                }
                function n() {
                    if (document.body) {
                        var t = document.body,
                            n = document.documentElement,
                            o = window.innerHeight,
                            i = t.scrollHeight;
                        if (((y = document.compatMode.indexOf("CSS") >= 0 ? n : t), (h = t), e(), (w = !0), top != self)) m = !0;
                        else if (i > o && (t.offsetHeight <= o || n.offsetHeight <= o)) {
                            var a = !1;
                            if (
                                ((n.style.height = "auto"),
                                setTimeout(function () {
                                    a ||
                                        n.scrollHeight == document.height ||
                                        ((a = !0),
                                        setTimeout(function () {
                                            (n.style.height = document.height + "px"), (a = !1);
                                        }, 500));
                                }, 10),
                                y.offsetHeight <= o)
                            ) {
                                var s = document.createElement("div");
                                (s.style.clear = "both"), t.appendChild(s);
                            }
                        }
                        p.fixedBackground || g || ((t.style.backgroundAttachment = "scroll"), (n.style.backgroundAttachment = "scroll"));
                    }
                }
                function o(t, e, n, o) {
                    if (
                        (o || (o = 1e3),
                        (function (t, e) {
                            (t = t > 0 ? 1 : -1), (e = e > 0 ? 1 : -1), (v.x !== t || v.y !== e) && ((v.x = t), (v.y = e), (k = []), (C = 0));
                        })(e, n),
                        1 != p.accelerationMax)
                    ) {
                        var i = +new Date() - C;
                        if (i < p.accelerationDelta) {
                            var a = (1 + 30 / i) / 2;
                            a > 1 && ((a = Math.min(a, p.accelerationMax)), (e *= a), (n *= a));
                        }
                        C = +new Date();
                    }
                    if ((k.push({ x: e, y: n, lastX: 0 > e ? 0.99 : -0.99, lastY: 0 > n ? 0.99 : -0.99, start: +new Date() }), !S)) {
                        var s = t === document.body,
                            l = function () {
                                for (var i = +new Date(), a = 0, r = 0, d = 0; d < k.length; d++) {
                                    var c = k[d],
                                        h = i - c.start,
                                        f = h >= p.animationTime,
                                        g = f ? 1 : h / p.animationTime;
                                    p.pulseAlgorithm && (g = u(g));
                                    var m = (c.x * g - c.lastX) >> 0,
                                        v = (c.y * g - c.lastY) >> 0;
                                    (a += m), (r += v), (c.lastX += m), (c.lastY += v), f && (k.splice(d, 1), d--);
                                }
                                s ? window.scrollBy(a, r) : (a && (t.scrollLeft += a), r && (t.scrollTop += r)), e || n || (k = []), k.length ? P(l, t, o / p.frameRate + 1) : (S = !1);
                            };
                        P(l, t, 0), (S = !0);
                    }
                }
                function i(t) {
                    var e = t.target,
                        n = t.ctrlKey || t.altKey || t.metaKey || (t.shiftKey && t.keyCode !== $.spacebar);
                    if (/input|textarea|select|embed/i.test(e.nodeName) || e.isContentEditable || t.defaultPrevented || n) return !0;
                    if (r(e, "button") && t.keyCode === $.spacebar) return !0;
                    var i = 0,
                        a = 0,
                        l = s(h),
                        d = l.clientHeight;
                    switch ((l == document.body && (d = window.innerHeight), t.keyCode)) {
                        case $.up:
                            a = -p.arrowScroll;
                            break;
                        case $.down:
                            a = p.arrowScroll;
                            break;
                        case $.spacebar:
                            a = -(t.shiftKey ? 1 : -1) * d * 0.9;
                            break;
                        case $.pageup:
                            a = 0.9 * -d;
                            break;
                        case $.pagedown:
                            a = 0.9 * d;
                            break;
                        case $.home:
                            a = -l.scrollTop;
                            break;
                        case $.end:
                            var c = l.scrollHeight - l.scrollTop - d;
                            a = c > 0 ? c + 10 : 0;
                            break;
                        case $.left:
                            i = -p.arrowScroll;
                            break;
                        case $.right:
                            i = p.arrowScroll;
                            break;
                        default:
                            return !0;
                    }
                    o(l, i, a), t.preventDefault();
                }
                function a(t, e) {
                    for (var n = t.length; n--; ) M[H(t[n])] = e;
                    return e;
                }
                function s(t) {
                    var e = [],
                        n = y.scrollHeight;
                    do {
                        var o = M[H(t)];
                        if (o) return a(e, o);
                        if ((e.push(t), n === t.scrollHeight)) {
                            if (!m || y.clientHeight + 10 < n) return a(e, document.body);
                        } else if (t.clientHeight + 10 < t.scrollHeight && ((overflow = getComputedStyle(t, "").getPropertyValue("overflow-y")), "scroll" === overflow || "auto" === overflow)) return a(e, t);
                    } while ((t = t.parentNode));
                }
                function l(t, e, n) {
                    window.addEventListener(t, e, n || !1);
                }
                function r(t, e) {
                    return (t.nodeName || "").toLowerCase() === e.toLowerCase();
                }
                function d(t, e) {
                    return Math.floor(t / e) == t / e;
                }
                function c(t) {
                    var e, n;
                    return 1 > (t *= p.pulseScale) ? (e = t - (1 - Math.exp(-t))) : ((t -= 1), (e = (n = Math.exp(-1)) + (1 - Math.exp(-t)) * (1 - n))), e * p.pulseNormalize;
                }
                function u(t) {
                    return t >= 1 ? 1 : 0 >= t ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= c(1)), c(t));
                }
                var h,
                    f = {
                        frameRate: 150,
                        animationTime: t.options.smoothScrollSpeed,
                        stepSize: 120,
                        pulseAlgorithm: !0,
                        pulseScale: 8,
                        pulseNormalize: 1,
                        accelerationDelta: 20,
                        accelerationMax: 1,
                        keyboardSupport: !0,
                        arrowScroll: 50,
                        touchpadSupport: !0,
                        fixedBackground: !0,
                        excluded: "",
                    },
                    p = f,
                    g = !1,
                    m = !1,
                    v = { x: 0, y: 0 },
                    w = !1,
                    y = document.documentElement,
                    b = [120, 120, 120],
                    $ = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 },
                    k = ((p = f), []),
                    S = !1,
                    C = +new Date(),
                    M = {};
                setInterval(function () {
                    M = {};
                }, 1e4);
                var x,
                    H = (function () {
                        var t = 0;
                        return function (e) {
                            return e.uniqueID || (e.uniqueID = t++);
                        };
                    })(),
                    P =
                        window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        function (t, e, n) {
                            window.setTimeout(t, n || 1e3 / 60);
                        },
                    T = /chrome/i.test(window.navigator.userAgent);
                "onmousewheel" in document &&
                    T &&
                    (l("mousedown", function (t) {
                        h = t.target;
                    }),
                    l("mousewheel", function (t) {
                        w || n();
                        var e = t.target,
                            i = s(e);
                        if (!i || t.defaultPrevented || r(h, "embed") || (r(e, "embed") && /\.pdf/i.test(e.src))) return !0;
                        var a = t.wheelDeltaX || 0,
                            l = t.wheelDeltaY || 0;
                        return (
                            a || l || (l = t.wheelDelta || 0),
                            !(
                                p.touchpadSupport ||
                                !(function (t) {
                                    if (t) {
                                        (t = Math.abs(t)), b.push(t), b.shift(), clearTimeout(x);
                                        var e = b[0] == b[1] && b[1] == b[2],
                                            n = d(b[0], 120) && d(b[1], 120) && d(b[2], 120);
                                        return !(e || n);
                                    }
                                })(l)
                            ) || (Math.abs(a) > 1.2 && (a *= p.stepSize / 120), Math.abs(l) > 1.2 && (l *= p.stepSize / 120), o(i, -a, -l), void t.preventDefault())
                        );
                    }),
                    l("load", n));
            })(),
                this.log("Init smooth scroll (speed = " + this.smoothScrollSpeed + "ms)");
        },
        windowHeightBlock: function () {
            var t = $(".window-height"),
                e = window.innerHeight;
            t.length &&
                t.each(function () {
                    $(this).css("min-height", e);
                }),
                this.log("Init window height blocks");
        },
        centeredBlock: function () {
            var t = $(".centered-block");
            t.length &&
                t.each(function () {
                    var t = $(this),
                        e = t.parent(),
                        n = t.outerHeight(),
                        o = (e.outerHeight() - n) / 2;
                    o >= 0 && e.css({ "padding-top": o, "padding-bottom": 0 });
                }),
                this.log("Init centered blocks");
        },
        videoBackgroundInit: function () {
            var t = this;
            $(".ytp-player-background").each(function () {
                var e,
                    n = $(this);
                if ((n.data("video") && n.data("video").length && n.css("background-image", "url(https://i.ytimg.com/vi/" + n.data("video") + "/maxresdefault.jpg)"), t.mobileDevice || "function" != typeof $.fn.YTPlayer))
                    n.addClass("no-video-bg"), "function" != typeof $.fn.YTPlayer ? t.log("Can't find jQuery.YTPlayer function. Video background blocks doesn't work.") : t.log("Can't init video background blocks.");
                else {
                    t.log("Init video background blocks"),
                        (e = n.YTPlayer()),
                        '<div class="video-conrols"><i class="yt-play-btn-big"></i><div class="bottom"><div class="controls-container"><i class="yt-play-toggle"></i><i class="yt-mute-toggle active"></i><div class="yt-volume-slider"></div></div></div><div>',
                        n.append(
                            '<div class="video-conrols"><i class="yt-play-btn-big"></i><div class="bottom"><div class="controls-container"><i class="yt-play-toggle"></i><i class="yt-mute-toggle active"></i><div class="yt-volume-slider"></div></div></div><div>'
                        );
                    var o = n.find(".yt-play-btn-big"),
                        i = n.find(".yt-play-toggle"),
                        a = n.find(".yt-mute-toggle"),
                        s = n.find(".yt-volume-slider");
                    "function" == typeof $.fn.slider
                        ? s.slider({
                              range: "min",
                              min: 0,
                              max: 100,
                              step: 5,
                              value: 50,
                              slide: function (t, n) {
                                  e.setYTPVolume(n.value);
                              },
                          })
                        : this.log("Can't find jQuery.slider function. Volumn slider doesn't work."),
                        o.on("click.startuply", function () {
                            e.getPlayer().playVideo();
                        }),
                        i.on("click.startuply", function () {
                            $(this).is(".active") ? e.getPlayer().playVideo() : e.getPlayer().pauseVideo();
                        }),
                        a.on("click.startuply", function () {
                            e.toggleVolume();
                        }),
                        e.on("YTPStart.startuply", function () {
                            o.fadeOut(300), i.removeClass("active");
                        }),
                        e.on("YTPPause.startuply", function () {
                            o.fadeIn(200), i.addClass("active");
                        }),
                        e.on("YTPMuted.startuply", function () {
                            a.addClass("active");
                        }),
                        e.on("YTPUnmuted.startuply", function () {
                            a.removeClass("active");
                        });
                }
            });
        },
        // formInit: function () {
        //     var t,
        //         e,
        //         n,
        //         o,
        //         i = this;
        //     this.log("Init ajaxed forms."),
        //         "undefined" != typeof toastr ? (toastr.options = { positionClass: this.options.toastrPositionClass }) : this.log("Can't find toastr. Form messages in alerts."),
        //         (mailchimpHandler = function (t) {
        //             t.preventDefault();
        //             var e,
        //                 n,
        //                 o,
        //                 i,
        //                 a,
        //                 s = $(this).find("[name=FNAME]"),
        //                 l = $(this).find("[name=LNAME]"),
        //                 r = $(this).find("[name=FULLNAME]"),
        //                 d = $(this).find("[name=EMAIL]"),
        //                 c = $(this).find("[name=PHONE]"),
        //                 u = $(this).find(".response"),
        //                 h = {};
        //             r.length && r.val().length && ((n = (e = r.val().split(" "))[0]), e.length > 1 && (o = e[1])),
        //                 s.length && s.val().length && (n = s.val()),
        //                 l.length && l.val().length && (o = l.val()),
        //                 n && (h.fname = escape(n)),
        //                 o && (h.lname = escape(o)),
        //                 d.length && d.val().length && ((i = d.val()), (h.email = escape(i))),
        //                 c.length && c.val().length && ((a = c.val()), (h.phone = escape(a))),
        //                 "undefined" == typeof toastr && u.html('<span class="notice_message">Adding email address...</span>'),
        //                 (h.ajax = !0),
        //                 $.ajax({
        //                     url: "/assets/mailchimp/inc/store-address.php",
        //                     data: h,
        //                     success: function (t) {
        //                         -1 != t.indexOf("Success")
        //                             ? "undefined" != typeof toastr
        //                                 ? toastr.success("Success! You are now subscribed to our newsletter!")
        //                                 : u.length && u.html('<span class="success-message">Success! You are now subscribed to our newsletter!</span>')
        //                             : "undefined" != typeof toastr
        //                             ? toastr.error(t)
        //                             : u.length && u.html('<span class="error-message">' + t + "</span>");
        //                     },
        //                 });
        //         }),
        //         (e = function (t) {
        //             t.preventDefault();
        //             var e = this;
        //             $.ajax({ url: e.action, type: "POST", data: $(e).serialize() })
        //                 .done(function (t) {
        //                     n(t, e);
        //                 })
        //                 .fail(function () {
        //                     o(e);
        //                 });
        //         }),
        //         (t = {
        //             rules: { password: { required: !0, minlength: 5 }, confirmPassword: { required: !0, minlength: 5, equalTo: "#password" } },
        //             messages: {
        //                 password: { required: "Please provide a password", minlength: "Your password must be at least 5 characters long" },
        //                 confirmPassword: { required: "Please provide a password", minlength: "Your password must be at least 5 characters long", equalTo: "Please enter the same password as above" },
        //             },
        //             submitHandler: function (t) {
        //                 $.ajax({ url: t.action, type: "POST", data: $(t).serialize() })
        //                     .done(function (e) {
        //                         n(e, t);
        //                     })
        //                     .fail(function () {
        //                         o(t);
        //                     });
        //             },
        //         }),
        //         (n = function (t, e) {
        //             "ok" === t
        //                 ? (e.reset(), "undefined" != typeof toastr ? toastr.success("Success") : alert("Success"))
        //                 : ("undefined" != typeof toastr ? toastr.error("An error occured. Please try again later.") : alert("An error occured. Please try again later."), i.log("Form message", t));
        //         }),
        //         (o = function () {
        //             "undefined" != typeof toastr ? toastr.error("An error occured. Please try again later.") : alert("An error occured. Please try again later.");
        //         }),
        //         $("form").length &&
        //             $("form").each(function () {
        //                 $(this).is(".mailchimp-form") ? $(this).on("submit.startuply", mailchimpHandler) : "function" == typeof $.fn.validate ? $(this).validate(t) : ($(this).on("submit", e), i.log("Can't find jQuery.validate function."));
        //             });
        // },
        productSliderInit: function () {
            var t;
            $(".product-image-list").length &&
                ("function" == typeof $.fn.bxSlider
                    ? (this.log("Init product slider"),
                      $(".product-image-list li img").length &&
                          ((t = $(".product-image-list").bxSlider({ prevText: '<i class="fa fa-angle-left"></i>', nextText: '<i class="fa fa-angle-right"></i>', pager: !1, adaptiveHeight: !0 })),
                          $(".product-thumb-list li img").length &&
                              ($(".product-thumb-list").bxSlider({ prevText: '<i class="fa fa-angle-left"></i>', nextText: '<i class="fa fa-angle-right"></i>', pager: !1, maxSlides: 5, slideWidth: 125, slideMargin: 9, moveSlides: 4 }),
                              $(".product-thumb-list").on("click.startuply", ".product-thumb", function () {
                                  var e = $(this).attr("data-img-id"),
                                      n = $(".product-image-list").find("[data-img-id=" + e + "]");
                                  t.goToSlide(n.index() - 1);
                              }))))
                    : this.log("Can't find jQuery.bxSlider function"));
        },
        cartCheckoutInit: function () {
            if ($(".cart-checkout-navigation-list").length) {
                this.log("Init cart checkout navigation");
                var t = $(".cart-checkout-navigation-list"),
                    e = $(".cart-checkout-navigation-controls");
                e.on("click.startuply", ".btn", function (e) {
                    var n = $(this).is(".next"),
                        o = t.find("> .active"),
                        i = o.next().find(".cart-checkout-navigation-list-item-link"),
                        a = o.prev().find(".cart-checkout-navigation-list-item-link");
                    e.preventDefault(), n && i.length ? o.next().find(".cart-checkout-navigation-list-item-link").trigger("click") : a.length && o.prev().find(".cart-checkout-navigation-list-item-link").trigger("click");
                }),
                    t.on("shown.bs.tab", ".cart-checkout-navigation-list-item-link", function () {
                        var t = $(this).closest("li"),
                            n = t.prev(),
                            o = t.next(),
                            i = e.find(".prev"),
                            a = e.find(".next");
                        o.length ? a.removeClass("hidden") : a.addClass("hidden"), n.length ? i.removeClass("hidden") : i.addClass("hidden");
                    });
            }
        },
        flexSliderInit: function () {
            var t = this;
            $(".testimonials-slider").length &&
                ("function" == typeof $.fn.flexslider
                    ? $(".testimonials-slider").each(function () {
                          $(this).flexslider(t.flexsliderOptions);
                      })
                    : this.log("Can't find jQuery.flexslider function"));
        },
        prettyPhotoInit: function () {
            $(".portfolio[data-pretty^='prettyPhoto[port_gal]']").length &&
                ("function" == typeof $.fn.prettyPhoto
                    ? $(".portfolio[data-pretty^='prettyPhoto[port_gal]']").each(function () {
                          $(this).prettyPhoto();
                      })
                    : this.log("Can't find jQuery.prettyPhoto function"));
        },
        countdownInit: function () {
            if ($(".countdown").length)
                if ("function" == typeof $.fn.countdown) {
                    var t = new Date();
                    t.setDate(t.getDate() + 10), $(".countdown").countdown({ until: t, compact: !0, padZeroes: !0, layout: $(".countdown").html() });
                } else this.log("Can't find jQuery.coundown function");
        },
        stickMenu: function () {
            var t = $("header:nth-child(2)");
            t.length && !t.is(".fixed-menu") && (t.addClass("fixed-menu"), this.log("Stick menu"));
        },
        unstickMenu: function () {
            var t = $("header");
            t.length && t.is(".fixed-menu") && (t.removeClass("fixed-menu"), this.log("Unstick menu"));
        },
        loginShowHide: function () {
            $(window).on("load", function () {
                $(".forgot-link a").on("click.startuply", function (t) {
                    t.preventDefault(), $("#login-form").toggleClass("show hide"), $("#forgot-form").toggleClass("show hide");
                });
            });
        },
        onePageNavInit: function () {
            var t = this;
            $('.navigation-bar a[href*="#"]').not('[href="#"]').length &&
                (void 0 !== $.fn.waypoint
                    ? ($('.navigation-bar a[href*="#"]')
                          .not('[href="#"]')
                          .each(function (e) {
                              var n = $(this).attr("href"),
                                  o = n.substring(n.indexOf("#"), n.length),
                                  i = $(o);
                              i.length &&
                                  i.waypoint(
                                      function () {
                                          var e = $(this)[0].element.id,
                                              n = $('.navigation-bar a[href="#' + e + '"]');
                                          $(".navigation-bar li.active").removeClass("active"),
                                              n.closest("li").addClass("active"),
                                              t.options.onePageNavHashChange && (history.pushState ? history.pushState(null, null, "#" + e) : t.log("Browser don't support history API"));
                                      },
                                      { offset: "40%" }
                                  );
                          }),
                      $("body").waypoint(
                          function () {
                              var e = $('.navigation-bar a[href="#hero"]');
                              $(".navigation-bar li.active").removeClass("active"),
                                  e.length && (e.closest("li").addClass("active"), t.options.onePageNavHashChange && (history.pushState ? history.pushState(null, null, "#hero") : t.log("Browser don't support history API")));
                          },
                          { offset: -100 }
                      ),
                      $("body").on("click.startuply", 'a[href*="#"]', function (e) {
                          var n = $(this).attr("href"),
                              o = n.substring(n.indexOf("#"), n.length);
                          if (!$(this).attr("data-toggle") || !$(this).attr("data-toggle").length) return $(o).length ? (t.anchorClickHandler(o), !1) : void 0;
                      }))
                    : this.log("Can't find jQuery.waypoint function"));
        },
        anchorClickHandler: function (t) {
            var e = this,
                n = $(t).offset().top - $(".navigation-header").height(),
                o = $(".navigation-bar"),
                i = o.find('a[href="' + t + '"]');
            $("body, html").animate({ scrollTop: n }, 750, function () {
                e.options.onePageNavHashChange && (history.pushState ? history.pushState(null, null, t) : (window.location.hash = t)), o.find("li.active").removeClass("active"), i.closest("li").addClass("active");
            });
        },
        windowLoadHeandler: function (t) {
            this.log("Window load handler"),
                window.location.hash.length && this.anchorClickHandler(window.location.hash),
                this.options.onePageNav && this.onePageNavInit(),
                this.flexSliderInit(),
                this.prettyPhotoInit(),
                $(".nav-tabs").length && $(".nav-tabs li:first-child a").trigger("click");
        },
        windowResizeHandler: function (t) {
            this.options.alwaysMobileMenuMode || this.mobileMenuStatus(),
                this.windowHeightBlock(),
                this.centeredBlock(),
                $(".navigation-navbar").not(".collapsed").length && $(".navigation-navbar").not(".collapsed").closest(".navigation-header").find(".navigation-toggle").trigger("click");
        },
        windowScrollHandler: function (t) {
            this.mobileMenuView && $(".navigation-navbar").not(".collapsed").length && $(".navigation-navbar").not(".collapsed").closest(".navigation-header").find(".navigation-toggle").trigger("click"),
                this.options.stickyMenuMode && ($(window).scrollTop() > this.options.stickyMenuOffset ? (this.stickMenu(), $(".back-to-top").fadeIn()) : (this.unstickMenu(), $(".back-to-top").fadeOut()));
        },
        navigationToggleHandler: function (t) {
            if (this.mobileMenuView) {
                var e = t,
                    n = e.closest(".navigation-header").find(".navigation-navbar");
                if (n.hasClass("collapsing")) return !1;
                n.hasClass("collapsed")
                    ? (n.addClass("collapsing"), n.removeClass("collapsed"), e.closest(".navigation-header").addClass(" collapsed"), $("body").addClass("collapsed"))
                    : ($(".dropdown").removeClass("opened"),
                      $(".dropdown-menu").css("display", ""),
                      n.addClass("collapsing"),
                      n.addClass("collapsed"),
                      e.closest(".navigation-header").removeClass("collapsed"),
                      $("body").removeClass("collapsed")),
                    setTimeout(function () {
                        n.removeClass("collapsing");
                    }, 400);
            }
        },
        bodyMouseMoveHandler: function (t) {
            if (!this.mobileMenuView && $(".dropdown.opened").length) {
                var e = $(t.target).parents(".dropdown.opened").find("> .dropdown-menu").get(),
                    n = $("body").find(".dropdown.opened > .dropdown-menu"),
                    o = $("body").find(".dropdown-menu .dropdown.opened > .dropdown-menu");
                $(t.target).hasClass("dropdown opened") && e.push($(t.target).find("> .dropdown-menu").get(0)),
                    n.not(e).stop(!0, !0).slideUp(250),
                    o.not(e).stop(!0, !0).delay(100).fadeOut(200),
                    n.not(e).closest(".dropdown").removeClass("opened"),
                    o.not(e).removeClass("left-side-menu");
            }
        },
        dropdownMouseOverHandler: function (t) {
            if (!this.mobileMenuView) {
                var e = t.find(".dropdown-menu").first();
                if ((t.addClass("opened"), t.closest(".dropdown-menu").length)) {
                    var n = t.outerWidth(),
                        o = t.offset().left;
                    $(window).width() - n - o < e.width() + 10 && e.addClass("left-side-menu"), e.stop(!0, !0).delay(100).fadeIn(250);
                } else e.stop(!0, !0).delay(100).slideDown(250);
            }
        },
        dropdownClickHandler: function (t) {
            if (this.mobileMenuView) {
                var e = t.closest(".dropdown");
                e.is(".opened")
                    ? (e.removeClass("opened"), e.find(".dropdown-menu").first().stop(!0, !0).slideUp(300))
                    : (e.addClass("opened").siblings(".dropdown").removeClass("opened"), e.find(".dropdown-menu").first().stop(!0, !0).slideDown(300), e.siblings(".dropdown").find(".dropdown-menu").stop(!0, !0).slideUp(300));
            }
        },
        navScrollHandler: function (t, e) {
            if (this.mobileMenuView) {
                var n = t.originalEvent,
                    o = n.wheelDelta || -n.detail;
                (e.scrollTop += 30 * (o < 0 ? 1 : -1)), t.preventDefault();
            }
        },
        styleSwitcherHandler: function (t, e) {
            t.preventDefault();
            var n = $(".style-switcher");
            n.hasClass("style-active") ? n.animate({ marginLeft: "0" }, 200, "linear") : n.animate({ marginLeft: "225" }, 200, "linear"), n.toggleClass("style-active");
        },
        styleSwitcherColorHandler: function (t, e) {
            var n = e.attr("data-color");
            t.preventDefault(), $(".style-switcher-css").remove(), $("head").append('<link class="style-switcher-css" rel="stylesheet" type="text/css" href="assets/css/colors/' + n + '.css">');
        },
        styleSwitcherToggleAnimation: function (t, e) {
            e.get(0).checked ? ($(".animated").css("opacity", ""), (this.options.animations = !0)) : ($(".animated").css("opacity", 1), (this.options.animations = !1));
        },
        backToTopHandler: function () {
            $("html, body").animate({ scrollTop: 0, easing: "swing" }, 750);
        },
        waveShowAnimation: function (t, e) {
            var n = Math.sqrt(e.outerWidth() * e.outerWidth() + e.outerHeight() * e.outerHeight()),
                o = Math.floor(n / Math.sqrt(20));
            e.prepend('<div class="inside-wave base-clr-bg" style="top:' + t.offsetY + "px; left:" + t.offsetX + 'px;"></div>'),
                setTimeout(function () {
                    e.find(".inside-wave").css({
                        opacity: "1",
                        "-webkit-transform": "scale(" + o + ")",
                        "-moz-transform": "scale(" + o + ")",
                        "-ms-transform": "scale(" + o + ")",
                        "-o-transform": "scale(" + o + ")",
                        transform: "scale(" + o + ")",
                    });
                }, 0);
        },
        waveHideAnimation: function (t, e) {
            var n = e.find(".inside-wave");
            n.css("opacity", 0),
                setTimeout(function () {
                    n.remove();
                }, 400);
        },
        setEventHandlers: function () {
            var t = this;
            $(window).on("load.startuply", function (e) {
                t.windowLoadHeandler(e);
            }),
                $(window).on("resize.startuply", function (e) {
                    t.windowResizeHandler(e);
                }),
                $(window).on("scroll.startuply", function (e) {
                    t.windowScrollHandler(e);
                }),
                $(".navigation-toggle").on("click.startuply", function () {
                    t.navigationToggleHandler($(this));
                }),
                $("body").on("mousemove.startuply", function (e) {
                    t.bodyMouseMoveHandler(e);
                }),
                $("header .dropdown").on("mouseover.startuply", function () {
                    t.dropdownMouseOverHandler($(this));
                }),
                $(".dropdown > a").on("click.startuply", function (e) {
                    e.preventDefault(), t.dropdownClickHandler($(this));
                }),
                $(".back-to-top").on("click.startuply", function (e) {
                    e.preventDefault(), t.backToTopHandler();
                }),
                $("body").on("mouseover.startuply", ".wave-mouseover", function (e) {
                    t.waveShowAnimation(e, $(this));
                }),
                $("body").on("mouseout.startuply", ".wave-mouseover", function (e) {
                    t.waveHideAnimation(e, $(this));
                }),
                $("body").on("mousedown.startuply", ".wave-click", function (e) {
                    t.waveShowAnimation(e, $(this));
                }),
                $("body").on("mouseup.startuply mouseover.startuply", ".wave-click", function (e) {
                    t.waveHideAnimation(e, $(this));
                }),
                $(".navigation-navbar").on("mousewheel.startuply DOMMouseScroll.startuply", function (e) {
                    t.navScrollHandler(e, this);
                }),
                $(".style-toggle").on("click.startuply", function (e) {
                    t.styleSwitcherHandler(e, $(this));
                }),
                $(".style-switcher .color").on("click.startuply", function (e) {
                    t.styleSwitcherColorHandler(e, $(this));
                }),
                $("#animations_switch").on("change.startuply", function (e) {
                    t.styleSwitcherToggleAnimation(e, $(this));
                }),
                this.log("Set event hendlers");
        },
        hidePreloader: function (t) {
            var e = this;
            $(".preloader-mask").delay(500).fadeOut(600),
                setTimeout(function () {
                    e.initAnimations();
                }, 1e3),
                t && t();
        },
        init: function (t) {
            (this.options = $.extend(this.defaults, t, $("body").data())),
                this.log("Init"),
                this.checkMobile(),
                this.mobileMenuStatus(),
                this.options.styleSwitcher && this.buildStyleSwitcher(),
                this.options.smoothScroll && this.smoothScrollInit(),
                // this.options.ajaxedForm && this.formInit(),
                this.windowHeightBlock(),
                this.centeredBlock(),
                this.videoBackgroundInit(),
                this.loginShowHide(),
                this.countdownInit(),
                this.productSliderInit(),
                this.cartCheckoutInit(),
                this.setEventHandlers(),
                this.hidePreloader();
        },
    });
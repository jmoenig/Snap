/*
* Notify Bar - $ plugin
*
* Copyright (c) 2009-2013 Dmitri Smirnov
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Version: 1.4
*
* Project home:
* http://www.whoop.ee/posts/2013-04-05-the-resurrection-of-jquery-notify-bar/
*/
(function ($) {

    $.notifyBar = function (options) {
        var rand = parseInt(Math.random() * 100000000, 0),
            text_wrapper,
            bar = {},
            settings = {};
        
        settings = $.extend({
            html           : 'Your message here',
            delay          : 2000,
            animationSpeed : 200,
            cssClass       : '',
            jqObject       : '',
            close          : false,
            closeText      : 'Close [X]',
            closeOnClick   : true,
            closeOnOver    : false,
            onBeforeShow   : null,
            onShow         : null,
            onBeforeHide   : null,
            onHide         : null,
            position       : 'top'
        }, options);
        
        // Use these methods as private.
        this.fn.showNB = function () {
            if (typeof settings.onBeforeShow === 'function') {
                settings.onBeforeShow.call();
            }
            $(this).stop().slideDown(asTime, function () {
                if (typeof settings.onShow === 'function') {
                    settings.onShow.call();
                }
            });
        };

        this.fn.hideNB = function (delayed) {
            if (typeof settings.onBeforeHide === 'function') {
                settings.onBeforeHide.call();
            }
            $(this).stop().slideUp(asTime, function () {
                if (bar.attr("id") === "__notifyBar" + rand) {
                    $(this).slideUp(asTime, function () {
                        $(this).remove();
                        if (typeof settings.onHide === 'function') {
                            settings.onHide.call();
                        }
                    });
                } else {
                    $(this).slideUp(asTime, function () {
                        if (typeof settings.onHide === 'function') {
                            settings.onHide.call();
                        }
                    });
                }
            });
        };

        if (settings.jqObject) {
            bar = settings.jqObject;
            settings.html = bar.html();
        } else {
            bar = $("<div></div>")
                   .addClass("jquery-notify-bar")
                   .addClass(settings.cssClass)
                   .attr("id", "__notifyBar" + rand);
        }
        text_wrapper = $("<span></span>")
                            .addClass("notify-bar-text-wrapper")
                            .html(settings.html);

        bar.html(text_wrapper).hide();

        var id = bar.attr("id");
        switch (settings.animationSpeed) {
            case "slow":
                asTime = 600;
                break;
            case "default":
            case "normal":
                asTime = 400;
                break;
            case "fast":
                asTime = 200;
                break;
            default:
                asTime = settings.animationSpeed;
        }
        if (bar !== 'object') {
            $("body").prepend(bar);
        }
        
        // Style close button in CSS file
        if (settings.close) {
            // If close settings is true. Set delay to one billion seconds.
            // It'a about 31 years - mre than enough for cases when notify bar is used.
            settings.delay = Math.pow(10, 9);
            bar.append($("<a href='#' class='notify-bar-close'>" + settings.closeText + "</a>"));
            $(".notify-bar-close").click(function (event) {
                event.preventDefault();
                bar.hideNB();
            });
        }
            
        // Check if we've got any visible bars and if we have,
        // slide them up before showing the new one
        if ($('.jquery-notify-bar:visible').length > 0) {
            $('.jquery-notify-bar:visible').stop().slideUp(asTime, function () {
                bar.showNB();
            });
        } else {
            bar.showNB();
        }
        
        // Allow the user to click on the bar to close it
        if (settings.closeOnClick) {
            bar.click(function () {
                bar.hideNB();
            });
        }

        // Allow the user to move mouse on the bar to close it
        if (settings.closeOnOver) {
            bar.mouseover(function () {
                bar.hideNB();
            });
        }
             
        setTimeout(function () {
            bar.hideNB(settings.delay);
        }, settings.delay + asTime);
        
        if (settings.position === 'bottom') {
            bar.addClass('bottom');
        } else if (settings.position === 'top') {
            bar.addClass('top');
        }
    };
})(jQuery);
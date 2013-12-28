var jipt = function (e) {
    var h, m = "http:",
        n = m + "//crowdin.net",
        g = m + "//cdn.crowdin.net/jipt",
        d = {
            preload_texts: true
        }, k = function () {
            return "snap.berkeley.edu"
        }, b = function () {
            var p, s, o, r, t = "";
            var u = "";
            var q = 0;
            document.documentElement.style.opacity = "0";
            t += "position: fixed;";
            t += "top: 0;";
            t += "right: 0;";
            t += "bottom: 0;";
            t += "left: 0;";
            t += "z-index: 2037483647;";
            t += "text-align: center;";
            t += "background-color: #fff;";
            p = document.createElement("div");
            p.setAttribute("id", "crowdin-jipt-mask");
            p.setAttribute("style", t);
            q = document.documentElement.clientHeight / 2 - 25;
            u += "padding: 10px 10px 10px 35px;";
            u += "background-image: url(" + g + "/images/preloader.gif);";
            u += "background-repeat: no-repeat;";
            u += "background-position: center left;";
            u += "display: inline-block;";
            u += "margin-top: " + q + "px;";
            s = document.createElement("div");
            s.setAttribute("style", u);
            s.innerHTML = "Preparing document...";
            r = window.setInterval(function () {
                o = document.getElementsByTagName("body")[0];
                if (o !== e) {
                    window.clearInterval(r);
                    o.appendChild(p);
                    p.appendChild(s);
                    document.documentElement.style.opacity = ""
                }
            }, 100)
        }, a = function () {
            var o = document.getElementById("crowdin-jipt-mask");
            if (o) {
                o.parentNode.removeChild(o)
            }
        }, j = function (q, p, s) {
            var r, o = false;
            if (p === "js") {
                r = document.createElement("script");
                r.setAttribute("type", "text/javascript");
                r.setAttribute("src", q)
            } else {
                if (p === "css") {
                    r = document.createElement("link");
                    r.setAttribute("rel", "stylesheet");
                    r.setAttribute("type", "text/css");
                    r.setAttribute("href", q)
                }
            } if (r === e) {
                return
            }
            r.onload = r.onreadystatechange = function () {
                if (!o && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    o = true;
                    if (s) {
                        s()
                    }
                    r.onload = r.onreadystatechange = null
                }
            };
            document.getElementsByTagName("head")[0].appendChild(r)
        }, l = function (o, p) {
            o = "jipt_" + o + "_" + k();
            var q = new Date((new Date()).getTime() + (365 * 24 * 60 * 60 * 1000));
            document.cookie = o + "=" + escape(p) + "; path=/; expires=" + q.toGMTString()
        }, i = function (p) {
            var t = document.cookie.split(";");
            var r = "";
            var u = "";
            var s = "";
            var q = false;
            p = "jipt_" + p + "_" + k();
            for (var o = 0; o < t.length; o++) {
                r = t[o].split("=");
                u = r[0].replace(/^\s+|\s+$/g, "");
                if (u === p) {
                    q = true;
                    if (r.length > 1) {
                        s = unescape(r[1].replace(/^\s+|\s+$/g, ""))
                    }
                    return s
                }
                r = null;
                u = ""
            }
            if (!q) {
                return null
            }
        }, f = function (o) {
            return o ? o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }, c = {
            phrases: {},
            _phrases: {
                need_load: {},
                was_loaded: {},
                callbacks: [],
                load_timeout: null
            },
            projectLink: null,
            editor: {
                currentTranslation: null
            },
            target_languages: [],
            language: {
                code: null,
                id: 0,
                name: ""
            },
            source_language: {
                code: null
            },
            user: {
                is_logged_in: true,
                is_leader: true,
                name: "",
                picture: ""
            },
            regexp: {
                placeholders: null,
                startPhrase: /{crwdns(\d+):(\d)}/,
                globalPhrase: /{crwdns(\d+):(\d)}([\s\S]*?){crwdne\1:\2}/g,
                exactPhrase: /^{crwdns(\d+):(\d)}([\s\S]*?){crwdne\1:\2}$/
            },
            status: {
                untranslated: "untranslated",
                partially_translated: "partially_translated",
                translated: "translated",
                partially_approved: "partially_approved",
                approved: "approved",
                hidden: "hidden"
            },
            plurals_preview: false,
            translatable_placeholders: [],
            translation_preview: {
                id: false,
                value: "",
                plural_num: -1
            },
            alertFunction: null,
            confirmFunction: null,
            promptFunction: null,
            loginDialog: null,
            editorDialog: null,
            translationDialog: null,
            dialog_zindex: 2047483647,
            minimized_translation_panel: true,
            translations_preview: null,
            translations_highlight: null,
            translations_filter: null,
            panel_search_phrase: null,
            rebuild_panel_timeout: null,
            panel_page: 0,
            panel_pages: 1,
            editor_loaded: false,
            loginDialogContent: function () {
                return '<div class="crowdin-login-panel" style="display: none;"><div id="Jipt_Language"><div class="language-group"><label class="jpit-s-margin-right" for="crowdin-login-language-field">Target Language:</label><div><select class="no-margin input-block-level" id="crowdin-login-language-field"></select></div></div></div><div class="clearfix"><h4 class="jipt-login-subtitle">Sign in with your Crowdin account</h4><div id="regular_login" class="pull-left"><form id="CrowdinJiptLoginForm" class="crowdin-jipt-login-form"><div class="jipt-control-group"><label for="crowdin-login-field">Login: </label><div><input type="text" class="input-block-level" value="" id="crowdin-login-field" name="login"></div></div><div class="jipt-control-group"><label for="crowdin-password-field">Password: </label><div><input type="password" class="input-block-level no-margin" value="" id="crowdin-password-field" name="password"><div class="help-small"><a target="_blank" href="http://crowdin.net/user/lostpassword">I\'ve forgotten my password</a></div></div></div><div class="jipt-submit-group"><input type="submit" class="jipt-btn" id="crowdin-jipt-login" value="Log in"></div><div id="crowdin-login-error-message" style="display:none">Looks like that\'s not right.<br>Give it another try?</div></form><div class="jipt-register-block">Don\'t have a profile? <a target="_blank" href="http://crowdin.net/join">Register</a></div></div><div id="sso_login" class="pull-right"><div class="sso-legend">or Sign in With:</div><ul><li><a class="sso google" href="' + n + "/login/google_request_auth?redirect_to=" + document.location + '"><i class="jipt-icon"></i>Google</a></li><li><a class="sso facebook" href="' + n + "/login/facebook_request_auth?redirect_to=" + document.location + '"><i class="jipt-icon"></i>Facebook</a></li><li><a class="sso twitter" href="' + n + "/login/twitter_request_auth?redirect_to=" + document.location + '"><i class="jipt-icon"></i>Twitter</a></li></ul></div></div></div><div class="crowdin-languages-panel" style="display: none;"><form><div><label for="crowdin-language-field">Target Language: </label><div><select class="input-block-level" id="crowdin-language-field"></select></div></div><div><input type="button" value="Select" id="crowdin-select-language" /></div></form></div>'
            },
            translationDialogButtons: function () {
                return '<div class="clearfix"><ul id="translation_panel_tabs" class="jipt-tabs pull-left"><li class="active"><a id="show_translations" href="#jipt-translations">Home</a></li><li><a id="show_options" href="#jipt-options">Options</a></li></ul><div id="translation_panel_paging_wrapper" class="pull-right"><form id="translation_panel_paging" class="jipt-paging no-margin" style="display: none;"><a href="#" class="jipt-panel-page" id="translation_panel_prev_page"><i class="jipt-icon"></i></a><input type="text" id="translation_panel_current_page" size="5"><a href="#" class="jipt-panel-page" id="translation_panel_next_page"><i class="jipt-icon"></i></a></form></div></div>'
            },
            translationDialogContent: function () {
                var o = c.translations_preview === true ? " checked" : "";
                var t = c.translations_highlight === true ? " checked" : "";
                var q = c.translations_filter === true ? " checked" : "";
                var u = c.user.name;
                var v = c.user.picture;
                var p = v ? 'src="' + v + '"' : "";
                var r = '<div class="jipt-control-group"><label class="jipt-checkbox"><input type="checkbox" id="jipt-translations-preview"' + o + ">Preview translations</label></div>";
                var s = '<div class="jipt-control-group"><label class="jipt-checkbox"><input type="checkbox" id="jipt-translations-highlight"' + t + ">Highlight</label></div>";
                var w = d.preload_texts ? '<div class="jipt-control-group"><label class="jipt-checkbox"><input type="checkbox" id="jipt-translations-filter"' + q + '>List only texts from the current page</label><div class="jipt-help-block">Home screen will show only strings used on this page.</div></div>' : "";
                return '<div class="crowdin-translation-panel-container"><div id="translation_panel_tabs_content" class="jipt-tabs-content"><div class="jipt-tab-pane" id="jipt-translations"><div class="jipt-clear-btn-wrapper"><input type="text" class="jipt-search-phrase input-block-level" placeholder="Type to search phrase" /><a class="jipt-clear-btn" href="#" style="display: none;"></a></div><div class="jipt-phrases-container"><ul class="jipt-phrases-to-translate"><li><div class="jipt-loading-msg">Loading...</div></li></ul></div></div><div class="jipt-tab-pane" id="jipt-options" style="display: none"><div class="jipt-control-group"><label for="jipt-target-languages">Language:&nbsp;</label><table style="width: 100%; border:0"><tr><td style="width: 100%; padding-right: 10px;"><select id="jipt-target-languages" class="input-block-level no-margin"></select></td><td><input type="button" id="jipt-change-language" value="Change"></td></tr></table></div><hr class="jipt-hr">' + r + s + w + '<hr class="jipt-hr"><div class="jipt-control-group clearfix"><img alt="" ' + p + ' class="jipt_user_picture pull-left"><div style="overflow: hidden"><div class="jipt_user_name">' + u + '</div><input type="button" value="Logout" id="jipt-logout"></div></div></div></div></div>'
            },
            init: function () {
                b();
                j(g + "/jipt.css", "css");
                j(m + "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", "js", function () {
                    h = jQuery.noConflict(true);
                    if (window.CrowdinJIPT !== e) {
                        h.extend(d, window.CrowdinJIPT)
                    }
                    c.init_plugins();
                    c.init_editor_listener();
                    h(document).ready(function () {
                        c.init_login_panel();
                        c.init_highlight();
                        c.init_preview();
                        c.init_filter();
                        c.init_project()
                    })
                })
            },
            init_plugins: function () {
                c.init_jipt_dialog();
                c.init_drags();
                c.init_center_position()
            },
            init_jipt_dialog: function () {
                h.fn.jiptDialog = function (C) {
                    C = h.extend({
                        modal: false,
                        position: "",
                        save_position: false,
                        drags: true,
                        resize: false,
                        fixed: true,
                        title_pane: "",
                        minimize_btn: true,
                        close_btn: true,
                        minimized: false,
                        icon: "",
                        buttons_pane: "",
                        width: "auto",
                        height: "auto",
                        save_height: false,
                        custom_class: "",
                        close_callback: "",
                        iframe: false,
                        action: "init"
                    }, C);
                    var u = h(this);
                    var t = {};
                    var s = {};
                    if (C.action !== "init") {
                        t = u.parent();
                        if (!t.hasClass("jipt-dialog")) {
                            console.warn("Crowdin JIPT dialog: seems that dialog is not initialized.");
                            return
                        }
                    }
                    switch (C.action) {
                    case "init":
                        B();
                        return s;
                    case "hide":
                        r();
                        break;
                    case "open":
                        q();
                        break;
                    case "close":
                        z();
                        break;
                    case "destroy":
                        w();
                        break;
                    case "toggle_minimized":
                        A();
                        break;
                    case "toggle_minimized_show":
                        A(true);
                        break;
                    case "center":
                        t.center();
                        break;
                    case "is_visible":
                        return t.is(":visible");
                    case "move_to_front":
                        o();
                        break;
                    default:
                        console.warn("Crowdin JIPT dialog: unknown action :(");
                        return
                    }

                    function p() {
                        if (!h("#jipt-modal-mask").length) {
                            h(h("<div>").attr("id", "jipt-modal-mask").css("display", "none")).appendTo("body")
                        }
                    }

                    function B() {
                        if (u.hasClass("jipt-dialog-content")) {
                            console.warn("Crowdin JIPT dialog: seems that dialog is already initialized.");
                            return
                        }
                        t = h('<div class="jipt-dialog crowdin-jipt ' + C.custom_class + '" style="display:none">');
                        u.addClass("jipt-dialog-content");
                        t.appendTo("body");
                        if (C.iframe) {
                            var J = u.html();
                            var F = h('<iframe frameBorder="0"/>');
                            F.css({
                                width: "100%",
                                display: "block",
                                overflow: "hidden",
                                height: C.height
                            });
                            u.empty().append(F).css("padding", 0);
                            t.html(u);
                            var E = F.contents()[0];
                            E.open();
                            E.write('<!doctype html><html class="crowdin-jipt ' + C.custom_class + '"><head><link rel="stylesheet" type="text/css" href="' + g + '/jipt.css"/></head><body style="margin: 0" id ="' + u.get(0).id + '" class="jipt-dialog-content"></body></html>');
                            E.close();
                            s = F.contents().find("body").html(J);
                            s.mousedown(function () {
                                o()
                            })
                        } else {
                            t.html(u);
                            s = u
                        }
                        var G = u.attr("id");
                        var D = C.icon ? " jipt-dialog-icon-" + C.icon : "";
                        var I = C.close_btn ? '<a href="#" data-id="#' + G + '" class="jipt-close-btn">&times;</a>' : "";
                        var M = C.minimize_btn ? '<a href="#" data-id="#' + G + '" class="jipt-minimize-btn"><span></span></a>' : "";
                        var L = "";
                        var H = "";
                        var K = "";
                        if (C.title_pane) {
                            L = '<div class="jipt-dialog-title clearfix' + D + '">' + C.title_pane + "</div>"
                        }
                        if (I || M) {
                            H = '<div class="jipt-dialog-title-buttons clearfix">' + I + M + "</div>"
                        }
                        u.before(H + L);
                        if (C.buttons_pane) {
                            K = '<div class="jipt-dialog-buttons clearfix">' + C.buttons_pane + "</div>";
                            u.after(K)
                        }
                        t.css("position", C.fixed === true ? "fixed" : "absolute");
                        t.width(C.width === "auto" ? t.width() : C.width);
                        u.height(C.height);
                        u.append('<div class="jipt-dialog-content-mask" style="display: none; height:' + u.height() + 'px;"><div>');
                        if (C.save_height && !C.iframe) {
                            t.data("save_height", true)
                        }
                        if (C.modal) {
                            t.data("modal", true);
                            p()
                        }
                        if (C.close_callback) {
                            t.data("close_callback", C.close_callback)
                        }
                        if (C.drags && C.title_pane) {
                            t.drags({
                                handle: ".jipt-dialog-title"
                            })
                        }
                        if (C.resize) {
                            t.addClass("jipt-dialog-resize")
                        }
                        if (C.minimized) {
                            if (i(u.attr("id") + "_min") !== "no") {
                                t.addClass("jipt-dialog-minimized")
                            }
                        }
                        C.save_position ? v() : y()
                    }

                    function A(F) {
                        var G;
                        if (t.hasClass("jipt-dialog-minimized")) {
                            t.removeClass("jipt-dialog-minimized");
                            if (i(u.attr("id") + "_normal")) {
                                G = JSON.parse(i(u.attr("id") + "_normal"));
                                t.css(G)
                            } else {
                                t.css("top", h(window).height() - t.outerHeight() - 10 + "px")
                            }
                        } else {
                            if (!F) {
                                var E = t.offset().top - h(window).scrollTop();
                                var D = t.offset().left - h(window).scrollLeft();
                                G = {
                                    top: E,
                                    left: D
                                };
                                l(u.attr("id") + "_normal", JSON.stringify(G));
                                t.addClass("jipt-dialog-minimized")
                            }
                        }
                    }

                    function y() {
                        var E, D;
                        switch (C.position) {
                        case "center":
                            if (C.fixed === false) {
                                t.center(window, true)
                            } else {
                                t.center()
                            }
                            break;
                        case "bottom-left":
                            E = ((h(window).height() - t.outerHeight()) - 10) + h(window).scrollTop();
                            t.css({
                                top: (E < 0 ? 0 : E) + "px",
                                left: 10 + "px"
                            });
                            break;
                        case "bottom-right":
                            E = ((h(window).height() - t.outerHeight()) - 10) + h(window).scrollTop();
                            D = ((h(window).width() - t.outerWidth()) - 10) + h(window).scrollLeft();
                            t.css({
                                top: (E < 0 ? 0 : E) + "px",
                                left: (D > 0 ? 0 : D) + "px"
                            });
                            break;
                        default:
                            if (C.fixed === false) {
                                t.center(window, true)
                            } else {
                                t.center()
                            }
                        }
                    }

                    function x() {
                        window.onbeforeunload = function () {
                            if (t.is(":visible")) {
                                var E = t.offset().top - h(window).scrollTop();
                                var D = t.offset().left - h(window).scrollLeft();
                                var F = {
                                    top: E,
                                    left: D
                                };
                                l(u.attr("id"), JSON.stringify(F));
                                if (t.hasClass("jipt-dialog-minimized")) {
                                    l(u.attr("id") + "_min", "yes")
                                } else {
                                    l(u.attr("id") + "_min", "no")
                                }
                            }
                        }
                    }

                    function v() {
                        if (i(u.attr("id") + "_min") === "yes") {
                            t.addClass("jipt-dialog-minimized")
                        }
                        if (i(u.attr("id"))) {
                            var H = JSON.parse(i(u.attr("id")));
                            var G = 0;
                            var F = 0;
                            var D = h(window).width() - t.outerWidth();
                            var E = h(window).height() - t.outerHeight();
                            if (H.left < G) {
                                H.left = G
                            } else {
                                if (H.left > D) {
                                    H.left = D
                                }
                            } if (H.top < F) {
                                H.top = F
                            } else {
                                if (H.top > E) {
                                    H.top = E
                                }
                            }
                            t.css(H);
                            x()
                        } else {
                            y();
                            x()
                        }
                    }

                    function q() {
                        if (t.data("modal")) {
                            h("#jipt-modal-mask").css("z-index", c.dialog_zindex += 1).show();
                            h("html").addClass("jipt-no-scroll")
                        }
                        if (C.position != "") {
                            y()
                        }
                        if (t.data("hidden")) {
                            y();
                            t.data("hidden", false)
                        }
                        o();
                        t.css("visibility", "visible");
                        t.css("display", "block");
                        if (t.data("save_height")) {
                            u.height(u.height()).css("overflow", "auto")
                        }
                    }

                    function r() {
                        t.css({
                            visibility: "hidden",
                            left: "-9999px",
                            top: "-9999px",
                            display: "block"
                        });
                        t.data("hidden", true)
                    }

                    function z() {
                        if (t.data("modal")) {
                            h("html").removeClass("jipt-no-scroll");
                            h("#jipt-modal-mask").hide()
                        }
                        t.css("display", "none");
                        if (t.data("close_callback")) {
                            var D = t.data("close_callback");
                            D()
                        }
                    }

                    function w() {
                        if (t.data("modal")) {
                            h("#jipt-modal-mask").hide()
                        }
                        t.remove()
                    }

                    function o() {
                        t.css("z-index", c.dialog_zindex += 1)
                    }
                };
                h(document).on("click", ".jipt-close-btn[data-id]", function (o) {
                    h(h(o.target).data("id")).jiptDialog({
                        action: "close"
                    });
                    return false
                });
                h(document).on("click", ".jipt-minimize-btn[data-id]", function (o) {
                    h(h(o.target).closest(".jipt-minimize-btn[data-id]").data("id")).jiptDialog({
                        action: "toggle_minimized"
                    });
                    return false
                });
                h(document).on("mousedown", ".jipt-dialog", function (p) {
                    var o = h(p.target).closest(".jipt-dialog");
                    o.find(".jipt-dialog-content").jiptDialog({
                        action: "move_to_front"
                    })
                })
            },
            init_drags: function () {
                h.fn.drags = function (o) {
                    o = h.extend({
                        handle: "",
                        cursor: "move",
                        draggableClass: "draggable",
                        activeHandleClass: "active-handle"
                    }, o);
                    var p = null;
                    var q = (o.handle === "") ? this : this.find(o.handle);
                    q.css("cursor", o.cursor).on("mousedown", function (v) {
                        if (o.handle === "") {
                            p = h(this);
                            p.addClass(o.draggableClass)
                        } else {
                            p = h(this).parent();
                            p.addClass(o.draggableClass).find(o.handle).addClass(o.activeHandleClass)
                        }
                        h(document.body).addClass(o.draggableClass);
                        var u = p.outerHeight(),
                            t = p.outerWidth(),
                            r = p.offset().top + u - v.pageY,
                            s = p.offset().left + t - v.pageX;
                        h(document).on("mousemove", function (w) {
                            p.offset({
                                top: w.pageY + r - u,
                                left: w.pageX + s - t
                            })
                        }).on("mouseup", function () {
                            h(this).off("mousemove");
                            if (p !== null) {
                                p.removeClass(o.draggableClass);
                                p = null
                            }
                            h(document.body).removeClass(o.draggableClass)
                        });
                        v.preventDefault()
                    }).on("mouseup", function () {
                        if (o.handle === "" && p) {
                            p.removeClass(o.draggableClass)
                        } else {
                            if (p) {
                                p.removeClass(o.draggableClass).find(o.handle).removeClass(o.activeHandleClass)
                            }
                        }
                        p = null
                    });
                    return this
                }
            },
            init_center_position: function () {
                h.fn.center = function (q, o) {
                    if (q) {
                        q = this.parent()
                    } else {
                        q = window
                    }
                    var p = 0;
                    var t = 0;
                    if (o) {
                        p = h(q).scrollTop();
                        t = h(q).scrollLeft()
                    }
                    var s = ((h(q).height() - this.outerHeight()) / 2) + p;
                    var r = ((h(q).width() - this.outerWidth()) / 2) + t;
                    s = s < 0 ? 0 : s;
                    r = r < 0 ? 0 : r;
                    this.css({
                        top: s + "px",
                        left: r + "px"
                    });
                    return this
                }
            },
            init_login_panel: function () {
                c.loginDialog = h("<div>").attr("id", "jipt-login-panel").html(c.loginDialogContent());
                c.loginDialog.content = c.loginDialog.jiptDialog({
                    modal: true,
                    width: "510px",
                    height: "405px",
                    drags: true,
                    minimize_btn: false,
                    close_btn: false,
                    iframe: true,
                    custom_class: "jipt-login-dialog",
                    title_pane: o()
                });

                function o() {
                    return '<div style="text-align: center"><img src="' + g + '/images/crowdin-logo-less.png" style="height: 33px" alt="Crowdin - Collaborative Localization Tool"><h3 class="crowdin-jipt-login-header">Crowdin Just In Place Translations</h3></div>'
                }
                c.loginDialog.content.find("#CrowdinJiptLoginForm").submit(function () {
                    c._login_action();
                    return false
                });
                c.loginDialog.content.find("#crowdin-select-language").click(function () {
                    var p = c.loginDialog.content.find("#crowdin-language-field option:selected");
                    c.set_current_language(p.val(), p.data("id"), p.html());
                    c.loginDialog.jiptDialog({
                        action: "close"
                    });
                    c.init_project();
                    return false
                });
                c.loginDialog.content.find(".sso", "#sso_login").click(function () {
                    var p = c.loginDialog.content.find("#crowdin-login-language-field option:selected");
                    c.set_current_language(p.val(), p.data("id"), p.html())
                })
            },
            init_highlight: function () {
                if (i("highlight") !== "no") {
                    c.translations_highlight = true;
                    h("body").addClass("jipt-highlight")
                } else {
                    c.translations_highlight = false;
                    h("body").removeClass("jipt-highlight")
                }
            },
            init_preview: function () {
                if (i("preview") !== "no") {
                    c.translations_preview = true
                } else {
                    c.translations_preview = false
                }
            },
            init_filter: function () {
                if (d.preload_texts) {
                    if (i("filter") !== "yes") {
                        c.translations_filter = false
                    } else {
                        c.translations_filter = true
                    }
                } else {
                    c.translations_filter = true
                }
            },
            init_translation_panel: function () {
                var p = null;
                var r = 340;
                var s = document.documentElement.clientHeight;
                r = r + 150 > s ? s - 150 : r;
                c.translationDialog = h("<div>").attr("id", "crowdin-translation-panel").html(c.translationDialogContent());
                c.translationDialog.find(".jipt-phrases-container").height(r);
                c.translationDialog.content = c.translationDialog.jiptDialog({
                    width: "400px",
                    height: r + 41 + "px",
                    drags: true,
                    save_position: true,
                    save_height: true,
                    close_btn: false,
                    iframe: true,
                    position: "bottom-left",
                    custom_class: "jipt-translations-dialog",
                    icon: "crowdin",
                    minimized: c.minimized_translation_panel,
                    title_pane: o(),
                    buttons_pane: q()
                });

                function o() {
                    return "<h4>Crowdin Just In Place Translations</h4>"
                }

                function q() {
                    return c.translationDialogButtons()
                }
                c.translationDialog.jiptDialog({
                    action: "open"
                });
                c.translationDialog.content.find("#jipt-target-languages").html(c._get_target_languages_options());
                c.load_phrases();
                c.translationDialog.content.find("#jipt-change-language").click(function () {
                    var t = c.translationDialog.content.find("#jipt-target-languages").find("option:selected");
                    c.set_current_language(t.val(), t.data("id"), t.html());
                    window.location.reload()
                });
                c.translationDialog.content.find("#jipt-logout").click(function () {
                    c._logout_action();
                    return false
                });
                c.translationDialog.content.find("#jipt-translations-preview").click(function () {
                    if (h(this).prop("checked")) {
                        l("preview", "yes")
                    } else {
                        l("preview", "no")
                    }
                    c.init_preview();
                    c.set_translations_preview()
                });
                c.translationDialog.content.find("#jipt-translations-highlight").click(function () {
                    if (h(this).prop("checked")) {
                        l("highlight", "yes")
                    } else {
                        l("highlight", "no")
                    }
                    c.init_highlight()
                });
                c.translationDialog.content.find("#jipt-translations-filter").click(function () {
                    if (h(this).prop("checked")) {
                        l("filter", "yes")
                    } else {
                        l("filter", "no")
                    }
                    c.init_filter();
                    c.rebuild_panel_phrases(c.panel_search_phrase)
                });
                c.translationDialog.content.on("click", ".jipt-phrases-to-translate li:not(.disabled) a", function () {
                    c.show_editor(c.phrases[this.rel]);
                    return false
                });
                h("#translation_panel_tabs a").click(function () {
                    if (!h(this).parent().hasClass("active")) {
                        h(this).closest("ul").find("li").removeClass("active");
                        h(this).parent().addClass("active");
                        c.translationDialog.content.find("#translation_panel_tabs_content .jipt-tab-pane").hide();
                        c.translationDialog.content.find(h(this).attr("href")).show()
                    }
                    return false
                });
                h("#show_translations").click(function () {
                    if (c.panel_pages) {
                        h("#translation_panel_paging_wrapper").show()
                    }
                    c.translationDialog.parent().removeClass("jipt_options")
                });
                h("#show_options").click(function () {
                    h("#translation_panel_paging_wrapper").hide();
                    c.translationDialog.parent().addClass("jipt_options")
                });
                c.translationDialog.content.find(".jipt-search-phrase").keyup(function () {
                    clearTimeout(p);
                    c.panel_search_phrase = this.value;
                    var t = h(this).parent().find(".jipt-clear-btn");
                    if (c.panel_search_phrase) {
                        t.show()
                    } else {
                        t.hide()
                    }
                    p = setTimeout(function () {
                        c.rebuild_panel_phrases(c.panel_search_phrase)
                    }, 500)
                });
                h("#translation_panel_prev_page").click(function () {
                    if (c.panel_page > 0) {
                        c.rebuild_panel_phrases(c.panel_search_phrase, c.panel_page - 1)
                    }
                    return false
                });
                h("#translation_panel_next_page").click(function () {
                    if (c.panel_page + 1 < c.panel_pages) {
                        c.rebuild_panel_phrases(c.panel_search_phrase, c.panel_page + 1)
                    }
                    return false
                });
                c.translationDialog.content.find(".jipt-clear-btn").click(function () {
                    h(this).parent().find('input[type="text"]').val("");
                    c.panel_search_phrase = "";
                    c.rebuild_panel_phrases();
                    h(this).hide();
                    return false
                });
                h("#translation_panel_current_page").click(function () {
                    h(this).val(c.panel_page + 1);
                    h(this).select();
                    return false
                });
                h("#translation_panel_paging").submit(function () {
                    var t = h("#translation_panel_current_page").val();
                    c.rebuild_panel_phrases(c.panel_search_phrase, t - 1);
                    h("#translation_panel_current_page").blur();
                    return false
                })
            },
            init_project: function () {
                var q = k();
                var p = i("language_code");
                var r = i("language_id");
                var o = i("language_name");
                c.ajax(n + "/jipt/init_project", {
                    project: q,
                    origin: location.protocol + "//" + location.host,
                    language_code: p ? p : ""
                }, function (s) {
                    c.user.is_logged_in = s.is_logged_in;
                    c.user.is_leader = s.is_leader;
                    c.user.name = s.user_name;
                    c.user.picture = s.user_picture;
                    c.source_language.code = s.source_language_code;
                    c.target_languages = s.target_languages;
                    c.projectLink = s.editor_link;
                    c.regexp.placeholders = new RegExp(s.placeholders_regexp, "gi");
                    c.plurals_preview = s.plurals_preview;
                    if (!s.is_logged_in || !p || !o || !r) {
                        if (!s.is_logged_in) {
                            c.show_login_panel()
                        } else {
                            c.show_languages_panel()
                        }
                        return
                    }
                    c.language.code = p;
                    c.language.id = r;
                    c.language.name = o;
                    c.init_translations()
                })
            },
            init_translations: function () {
                c.alertFunction = window.alert;
                window.alert = function () {
                    return c.handle_browser_popups(c.alertFunction, this, arguments)
                };
                c.confirmFunction = window.confirm;
                window.confirm = function () {
                    return c.handle_browser_popups(c.confirmFunction, this, arguments)
                };
                c.promptFunction = window.prompt;
                window.prompt = function () {
                    return c.handle_browser_popups(c.promptFunction, this, arguments)
                };
                c.init_editor();
                c.init_translation_panel()
            },
            handle_browser_popups: function (t, r, s) {
                var p = [];
                for (var q = 0; q < s.length; q++) {
                    s[q] = s[q].replace(c.regexp.globalPhrase, function (w, x, v) {
                        var u = c.phrases[x];
                        if (u) {
                            p.push(u);
                            var y = c.get_source_segment(u, v);
                            return c.phrase2preview(u, c.get_placeholders(y, w), v)
                        } else {
                            c._load_phrases_delayed(w, function () {});
                            return w
                        }
                    })
                }
                var o = t.apply(r, s);
                if (p.length > 0) {
                    c.show_editor(p[0])
                }
                return o
            },
            init_dom_mutation_handler: function () {
                var p = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (p) {
                    var o = new p(function (q) {
                        q.forEach(function (r) {
                            c.handle_dom_mutation(r)
                        })
                    });
                    o.observe(document.body, {
                        attributes: true,
                        childList: true,
                        characterData: true,
                        subtree: true
                    })
                }
            },
            handle_dom_mutation: function (o) {
                if (o.type === "childList") {
                    for (var p = 0; p < o.addedNodes.length; p++) {
                        c.crowdin_each_element(o.addedNodes[p])
                    }
                }
                if (o.type === "characterData") {
                    if (o.target.nodeType === 3) {
                        c.match_element_text(o.target, o.target.parentNode)
                    }
                }
                if (o.type === "attributes") {
                    c.match_element_attributes(o.target)
                }
            },
            load_phrases: function () {
                for (var p in this.status) {
                    h(".crowdin_jipt_" + this.status[p]).removeClass("crowdin_jipt_" + this.status[p])
                }
                var o = c.get_phrases_from_text(document.documentElement.innerHTML);
                c._load_phrases(o, [
                    function () {
                        if (document.getElementsByTagName("title").length) {
                            c.handle_document_title(document.getElementsByTagName("title")[0])
                        }
                        c.crowdin_each_element(document.body);
                        c.init_dom_mutation_handler();
                        a()
                    }
                ])
            },
            init_editor: function () {
                var o = 650;
                var s = document.documentElement.clientHeight;
                o = o + 110 > s ? s - 110 : o;
                c.editorDialog = h('<div id="crowdin-editor">');
                c.editorDialog.jiptDialog({
                    width: "550px",
                    height: o + "px",
                    save_position: true,
                    modal: false,
                    drags: true,
                    resize: true,
                    icon: "crowdin",
                    custom_class: "jipt-editor-dialog",
                    close_callback: function () {
                        p()
                    },
                    title_pane: q(),
                    buttons_pane: r()
                });
                c.editorDialog.jiptDialog({
                    action: "hide"
                });

                function q() {
                    return "<h4>Translating to " + c.language.name + "</h4>"
                }

                function r() {
                    return '<div class="jipt-dialog-buttons-wrapper"><span style="color:#999">Opacity: </span><input id="jipt-editor-opacity" type="range" min="0" max="100" step="1" value="100"><span title="Preview is not available since plural forms of source and target languages do not match" id="jipt-preview-available-msg">No preview available</span></div>'
                }
                c.editorDialog.append('<iframe frameBorder="0" id="crowdin-editor-iframe"></iframe>');
                c.editorDialogIframe = h("iframe#crowdin-editor-iframe");
                c.editorDialogIframe.css({
                    width: "100%",
                    height: o + "px",
                    "min-width": "550px"
                });
                c.editorDialogIframe.attr("src", c.projectLink);

                function p() {
                    c.place_translation_preview();
                    h(".jipt-selected").removeClass("jipt-selected")
                }
                h("#jipt-editor-opacity").change(function () {
                    var t = h(this);
                    c.editorDialog.find("iframe").css("opacity", t.val() / 100);
                    c.editorDialog.parent().css("background-color", "rgba(255,255,255," + t.val() / 100 + ")")
                })
            },
            init_editor_listener: function () {
                window.onmessage = function (q) {
                    q = q || window.event;
                    if (q.origin === n) {
                        var p = JSON.parse(q.data);
                        if (c.editor.currentTranslation) {
                            switch (p.type) {
                            case "edit_translation":
                                if (c.translations_preview !== false && c.editorDialog.jiptDialog({
                                    action: "is_visible"
                                })) {
                                    if (p.value.length > 0) {
                                        c.place_translation_preview(p.id, p.value, p.plural_num)
                                    } else {
                                        c.place_translation_preview()
                                    }
                                }
                                break;
                            case "update_translation":
                                if ("top_suggestion" in p) {
                                    var o = p.plural_num >= 0 ? p.plural_num : 0;
                                    if (p.top_suggestion.length) {
                                        c.editor.currentTranslation.translation[o] = p.top_suggestion;
                                        c.editor.currentTranslation.status = p.translation_status
                                    } else {
                                        c.editor.currentTranslation.translation[o] = "";
                                        c.editor.currentTranslation.status = c.status.untranslated
                                    }
                                    c.update_phrase_dom_highlight();
                                    c.update_phrase_highlight();
                                    c.place_translation_preview()
                                }
                                break;
                            case "next_translation":
                                c.place_translation_preview();
                                c.show_next_element(c.editor.currentTranslation.active_element);
                                break;
                            case "prev_translation":
                                c.place_translation_preview();
                                c.show_prev_element(c.editor.currentTranslation.active_element);
                                break
                            }
                        }
                        switch (p.type) {
                        case "success":
                            c.editor_loaded = true;
                            break;
                        case "close_editor":
                            c.editorDialog.jiptDialog({
                                action: "close"
                            });
                            break;
                        case "focus":
                            c.editorDialog.jiptDialog({
                                action: "move_to_front"
                            });
                            break;
                        default:
                            return
                        }
                    }
                }
            },
            place_translation_preview: function (t, r, p) {
                c.translation_preview.id = t;
                c.translation_preview.value = r;
                c.translation_preview.plural_num = p >= 0 ? p : 0;
                if (!c.editor.currentTranslation) {
                    return
                }
                var q = c.editor.currentTranslation.elements;
                var s;
                if (!q) {
                    return
                }
                for (var o = 0; o < q.length; o++) {
                    s = c.phrase2preview(c.phrases[q[o].id], q[o].placeholders, q[o].plural_id);
                    if (q[o].attr !== false) {
                        q[o].element.setAttribute(q[o].attr, s)
                    } else {
                        if (q[o].element.innerHTML !== e) {
                            q[o].element.innerHTML = s
                        } else {
                            q[o].element.textContent = s
                        }
                    }
                }
            },
            set_translations_preview: function () {
                var o = c.editor.currentTranslation;
                for (var p in c.phrases) {
                    c.editor.currentTranslation = c.phrases[p];
                    c.place_translation_preview()
                }
                c.editor.currentTranslation = o
            },
            crowdin_each_element: function (p) {
                if (p.id === "crowdin-translation-panel" || p.id === "crowdin-editor") {
                    return
                }
                if (p.hasChildNodes()) {
                    for (var o = 0; o < p.childNodes.length; o++) {
                        c.crowdin_each_element(p.childNodes[o]);
                        c.match_element_attributes(p.childNodes[o])
                    }
                }
                if (p && p.nodeType === 3 && p.nodeValue.length) {
                    var q = p.nodeValue.match(c.regexp.startPhrase);
                    if (q) {
                        if (p.nodeValue.indexOf("{crwdne" + q[1] + ":" + q[2] + "}") > -1) {
                            c.match_element_text(p, p.parentNode)
                        } else {
                            c.match_element_html(p, q[1], q[2])
                        }
                    }
                }
            },
            match_element_text: function (t, o) {
                if (!o) {
                    return
                }
                var s = t.nodeValue.match(c.regexp.exactPhrase);
                var p = t.parentNode.childNodes.length;
                if (s && p === 1) {
                    if (c.phrases[s[1]]) {
                        c.handle_element(t.parentNode, c.phrases[s[1]], s[2])
                    } else {
                        c._load_phrases_delayed(t.nodeValue, function () {
                            c.match_element_text(t, o)
                        })
                    }
                } else {
                    var r = t.nodeValue.replace(c.regexp.globalPhrase, '<span class="crowdin_phrase">$&</span>');
                    if (r !== t.nodeValue) {
                        h(t).replaceWith(r);
                        for (var q = 0; q < o.childNodes.length; q++) {
                            if (o.childNodes[q].className === "crowdin_phrase") {
                                c.match_element_text(o.childNodes[q].firstChild, o.childNodes[q])
                            }
                        }
                    }
                }
            },
            match_element_html: function (u, v, o) {
                var t = u.parentNode.innerHTML.match(c.regexp.exactPhrase);
                if (t) {
                    if (c.phrases[t[1]]) {
                        c.handle_element(u.parentNode, c.phrases[t[1]], t[2])
                    } else {
                        c._load_phrases_delayed(u.parentNode.innerHTML, function () {
                            c.match_element_html(u, v, o)
                        })
                    }
                } else {
                    var s = u;
                    var p = [];
                    var r = "";
                    do {
                        p.push(s);
                        r += s.nodeValue ? s.nodeValue : s.outerHTML;
                        if (s.nodeType === 3 && s.nodeValue.indexOf("{crwdne" + v + ":" + o + "}") > -1) {
                            break
                        } else {
                            s = s.nextSibling
                        }
                    } while (s);
                    r = r.replace(c.regexp.globalPhrase, '<span class="crowdin_phrase">$&</span>');
                    h(p[0]).replaceWith(r);
                    for (var q = 1; q < p.length; q++) {
                        p[q].parentNode.removeChild(p[q])
                    }
                }
            },
            match_element_attributes: function (q) {
                var r, p, o;
                var s = h(q);
                if (q && q.attributes) {
                    for (o = 0; o < q.attributes.length; o++) {
                        r = q.attributes.item(o);
                        p = r.nodeValue.replace(c.regexp.globalPhrase, function (y, u, B) {
                            var v = c.phrases[u];
                            if (v) {
                                c.translatable_placeholders = [];
                                var A = c.get_source_segment(v, B);
                                var z = c.get_placeholders(A, y);
                                var C = c.phrase2preview(v, z, B);
                                if (r.nodeValue.length === y.length) {
                                    if (!v.elements) {
                                        v.elements = [];
                                        c.delayed_rebuild_panel_phrases()
                                    }
                                    var t = {
                                        id: v.id,
                                        element: q,
                                        placeholders: z,
                                        attr: r.nodeName,
                                        plural_id: B
                                    };
                                    c.addPhraseToElement(s, t);
                                    v.elements.push(t);
                                    for (var x = 0; x < c.translatable_placeholders.length; x++) {
                                        var w = c.translatable_placeholders[x];
                                        if (!w.phrase.elements) {
                                            w.phrase.elements = [];
                                            c.delayed_rebuild_panel_phrases()
                                        }
                                        c.addPhraseToElement(s, {
                                            id: w.phrase.id,
                                            placeholders: w.placeholders,
                                            attr: t.attr,
                                            plural_id: w.plural_id
                                        });
                                        w.phrase.elements.push(t)
                                    }
                                    s.addClass(c.element_classname(s));
                                    s.mouseenter(function () {
                                        setTimeout(function () {
                                            c.show_translation_badge(q)
                                        }, 1)
                                    })
                                }
                                return C
                            } else {
                                c._load_phrases_delayed(y, function () {
                                    c.match_element_attributes(q)
                                });
                                return y
                            }
                        });
                        if (r.nodeValue !== p) {
                            r.nodeValue = p
                        }
                    }
                }
            },
            get_translation_segment: function (o, p) {
                p = parseInt(p);
                p = p ? p : 0;
                if (o.translation[p] !== e) {
                    return o.translation[p]
                } else {
                    return o.translation[0]
                }
            },
            get_source_segment: function (o, p) {
                p = parseInt(p);
                p = p ? p : 0;
                if (o.text[p] !== e) {
                    return o.text[p]
                } else {
                    return o.text[0]
                }
            },
            get_placeholders: function (s, t) {
                var r = [];
                var q = [];
                var o = s.match(c.regexp.placeholders);
                var p = t.match(c.regexp.exactPhrase);
                if (p && p[3]) {
                    if (p[3].indexOf("{crwdnd" + p[1] + ":" + p[2] + "}") >= 0) {
                        q = p[3].split("{crwdnd" + p[1] + ":" + p[2] + "}")
                    } else {
                        q = [p[3]]
                    }
                }
                if (o !== null) {
                    r = o
                }
                return [r, q]
            },
            handle_document_title: function (o) {
                if (!o.firstChild) {
                    return
                }
                o.innerHTML = "{crwdns0:0}" + o.innerHTML + "{crwdne0:0}";
                c.phrases["0"] = {
                    id: "0",
                    text: ["%s"],
                    translation: [""],
                    hidden: "0",
                    status: "untranslated"
                };
                c.match_element_text(o.firstChild, o)
            },
            handle_element: function (r, q, u) {
                var p;
                var t = h(r);
                var v = c.get_source_segment(q, u);
                this.translatable_placeholders = [];
                if (r.innerHTML !== e) {
                    p = c.get_placeholders(v, r.innerHTML);
                    r.innerHTML = c.phrase2preview(q, p, u)
                } else {
                    p = c.get_placeholders(v, r.textContent);
                    r.textContent = c.phrase2preview(q, p, u)
                }
                var o = {
                    id: q.id,
                    element: r,
                    placeholders: p,
                    attr: false,
                    plural_id: u
                };
                if (!q.elements) {
                    q.elements = [];
                    c.delayed_rebuild_panel_phrases()
                }
                c.addPhraseToElement(t, o);
                q.elements.push(o);
                for (var s = 0; s < this.translatable_placeholders.length; s++) {
                    if (!this.translatable_placeholders[s].phrase.elements) {
                        this.translatable_placeholders[s].phrase.elements = [];
                        c.delayed_rebuild_panel_phrases()
                    }
                    c.addPhraseToElement(t, {
                        id: this.translatable_placeholders[s].phrase.id,
                        placeholders: this.translatable_placeholders[s].placeholders,
                        attr: o.attr,
                        plural_id: this.translatable_placeholders[s].plural_id
                    });
                    this.translatable_placeholders[s].phrase.elements.push(o)
                }
                t.addClass(c.element_classname(t));
                if (t.is("option") || t.parent().is("option")) {
                    var w = t.closest("select");
                    if (w) {
                        w.addClass(c.element_classname(w));
                        r = w.get(0)
                    }
                }
                h(r).mouseenter(function () {
                    setTimeout(function () {
                        c.show_translation_badge(r)
                    }, 1)
                })
            },
            phrase2preview: function (o, q, p) {
                var u = c.get_translation_segment(o, p);
                var r = c.plurals_preview || o.text.length === 1;
                var s = "";
                if (this.translation_preview.id === o.id && this.translation_preview.plural_num == p) {
                    s = this.translation_preview.value
                }
                if (r && c.translations_preview === true && s.length) {
                    return c.replace_placeholders(s, q)
                }
                if (r && c.translations_preview === true && u.length) {
                    return c.replace_placeholders(u, q)
                }
                var t = c.get_source_segment(o, p);
                return c.replace_placeholders(t, q)
            },
            replace_placeholders: function (s, r) {
                var q = r[0].slice(0);
                var o = r[1].slice(0);
                for (var p = 0; p < o.length; p++) {
                    o[p] = o[p].replace(c.regexp.globalPhrase, function (w, x, v) {
                        var t = c.phrases[x];
                        if (t) {
                            var y = c.get_source_segment(t, v);
                            var u = c.get_placeholders(y, w);
                            c.translatable_placeholders.push({
                                phrase: t,
                                placeholders: u,
                                plural_id: v
                            });
                            return c.phrase2preview(t, u, v)
                        } else {
                            return w
                        }
                    })
                }
                if (o.length > 0) {
                    s = s.replace(c.regexp.placeholders, function (u) {
                        for (var v = 0; v < q.length; v++) {
                            if (q[v] === u && o[v] !== e) {
                                var t = o[v];
                                q.splice(v, 1);
                                o.splice(v, 1);
                                return t
                            }
                        }
                        return u
                    })
                }
                s = s.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*((<\/script>)|>)/gi, "");
                s = s.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*((<\/style>)|>)/gi, "");
                s = s.replace(/\b(on\w+=(["'])?.*?\2)/gi, "");
                s = s.replace(/\\n/g, "\n");
                return s
            },
            get_element_position: function (p) {
                var q = 0;
                var o = 0;
                while (p) {
                    q += (p.offsetLeft - p.scrollLeft + p.clientLeft);
                    o += (p.offsetTop - p.scrollTop + p.clientTop);
                    p = p.offsetParent == document.body ? null : p.offsetParent
                }
                return {
                    left: q,
                    top: o
                }
            },
            show_translation_badge: function (p) {
                var o = [];
                var s = false;
                var q = this.get_element_position(p);
                if (!h(p).data("phrases")) {
                    var r = h(p).find("[class*=crowdin_jipt]");
                    if (r.length) {
                        o = r.first().data("phrases");
                        s = true
                    } else {
                        console.warn("Crowdin JIPT: This element has no translatable phrases.");
                        return
                    }
                } else {
                    o = h(p).data("phrases")
                }
                var v = c.phrases[o[0].id];
                if (!h("#crowdin-translation-badge").length) {
                    var u = c.dialog_zindex;
                    h("body").append(h("<img>").attr("id", "crowdin-translation-badge").addClass("crowdin-jipt").attr("src", g + "/images/translate.png").css("position", "absolute").css("z-index", --u))
                }
                if (s) {
                    p = h(p).find("[class*=crowdin_jipt]").get(0)
                }

                function t() {
                    c.hide_translation_badge();
                    var z = "<ul>";
                    if (!h("#crowdin-translation-badge-popup").length) {
                        h("body").append(h("<div>").attr("id", "crowdin-translation-badge-popup").addClass("crowdin-jipt").css({
                            position: "absolute",
                            "z-index": c.dialog_zindex - 1,
                            display: "none"
                        }))
                    } else {
                        h("#crowdin-translation-badge-popup").html("")
                    }
                    h("#crowdin-translation-badge-popup").css("top", q.top + "px").css("left", q.left + "px");
                    for (var y = 0; y < o.length; y++) {
                        var D = o[y].id;
                        var x = c.phrases[D].hidden === "1" ? true : false;
                        var w = !c.user.is_leader && x ? "disabled" : "";
                        var C = c.phrase_classname(c.phrases[D]) + "_popup";
                        z += '<li class="' + w + '"><a href="javascript:void(0)" data-id="' + D + '" class="popup-phrase ' + C + '">';
                        if (x) {
                            z += '<span class="popup-phrase-attr">This string should not be translated.</span>'
                        }
                        if (o[y].attr) {
                            z += '<span class="popup-phrase-attr">' + o[y].attr + ":</span>"
                        }
                        var B = c.phrase2preview(c.phrases[D], [
                            [],
                            []
                        ], o[y].plural_id);
                        z += h("<span>" + B + "</span>").text();
                        z += "</a></li>"
                    }
                    z += "</ul>";
                    h("#crowdin-translation-badge-popup").html(z).show();
                    h("#crowdin-translation-badge-popup li:not(.disabled) a.popup-phrase").click(function (E) {
                        var F = h(E.target).closest("a.popup-phrase").data("id");
                        h("#crowdin-translation-badge-popup").hide();
                        c.show_editor(c.phrases[F], p);
                        return false
                    });

                    function A() {
                        h(document).one("click", function (E) {
                            if (h(E.target).closest("#crowdin-translation-badge-popup").length === 0) {
                                h("#crowdin-translation-badge-popup").hide()
                            } else {
                                A()
                            }
                        })
                    }
                    A()
                }
                h("#crowdin-translation-badge").css("top", (q.top - 5) + "px").css("left", (q.left - 5) + "px").show().unbind().click(function (w) {
                    if (o.length > 1 || v.hidden === "1") {
                        t()
                    } else {
                        c.show_editor(v, p)
                    }
                    return false
                });
                h("#crowdin-translation-badge").mouseleave(function () {
                    c.hide_translation_badge()
                })
            },
            hide_translation_badge: function () {
                h("#crowdin-translation-badge").hide()
            },
            update_active_phrase_highlight: function () {
                h(".jipt-selected").removeClass("jipt-selected");
                if (c.editor.currentTranslation.elements) {
                    for (var p = 0; p < c.editor.currentTranslation.elements.length; p++) {
                        var q = h(c.editor.currentTranslation.elements[p].element);
                        q.addClass("jipt-selected");
                        if (q.is("option") || q.parent().is("option")) {
                            var o = q.closest("select");
                            if (o) {
                                o.addClass("jipt-selected")
                            }
                        }
                    }
                }
            },
            highlight_panel_opened_phrase: function () {
                if (c.editor.currentTranslation) {
                    c.translationDialog.content.find("#jipt-translations").find("li.active").removeClass("active");
                    c.translationDialog.content.find("#jipt-translations").find("a[rel=" + c.editor.currentTranslation.id + "]").parent().addClass("active")
                }
            },
            update_phrase_dom_highlight: function () {
                if (c.editor.currentTranslation.elements) {
                    for (var r = 0; r < c.editor.currentTranslation.elements.length; r++) {
                        var q = c.editor.currentTranslation.elements[r].element;
                        var t = h(q);
                        var s = c.element_classname(t);
                        t.removeClass(function (u, v) {
                            return (v.match(/\bcrowdin_jipt_\S+/g) || []).join(" ")
                        }).addClass(s);
                        if (t.is("option") || t.parent().is("option")) {
                            var o = t.closest("select");
                            if (o) {
                                o.removeClass(function (u, v) {
                                    return (v.match(/\bcrowdin_jipt_\S+/g) || []).join(" ")
                                });
                                for (var p in c.status) {
                                    if (o.find("[class*=crowdin_jipt_" + c.status[p] + "]").length) {
                                        o.addClass("crowdin_jipt_" + c.status[p])
                                    }
                                }
                            }
                        }
                    }
                }
            },
            update_phrase_highlight: function () {
                if (c.editor.currentTranslation) {
                    var o = c.phrase_classname(c.editor.currentTranslation) + "_item";
                    var p = c.translationDialog.content.find("#jipt-translations a[rel=" + c.editor.currentTranslation.id + "]");
                    p.removeClass(function (q, r) {
                        return (r.match(/\bcrowdin_jipt_\S+/g) || []).join(" ")
                    }).addClass(o)
                }
            },
            show_next_element: function (p) {
                var r = h(p);
                if (!r.length) {
                    c.refresh_suggestions();
                    return
                }
                var o = c.get_first_untranslated(r, "next", true);
                if (o) {
                    c.show_editor(c.phrases[o], r.get(0));
                    return
                }
                var q = c.findNext("next", r, ".crowdin_jipt_untranslated, .crowdin_jipt_partially_translated");
                if (!q.length) {
                    c.refresh_suggestions();
                    return
                }
                if (q.data("phrases")) {
                    c.show_editor(c.phrases[c.get_first_untranslated(q)], q.get(0))
                } else {
                    c.show_next_element(q)
                }
            },
            show_prev_element: function (p) {
                var s = h(p);
                if (!s.length) {
                    return
                }
                var o = c.get_first_untranslated(s, "prev", true);
                if (o) {
                    c.show_editor(c.phrases[o], s.get(0));
                    return
                }
                var r = c.findNext("prev", s, ".crowdin_jipt_untranslated, .crowdin_jipt_partially_translated");
                if (r.length) {
                    var q = c.get_first_untranslated(r, "prev");
                    if (parseInt(q)) {
                        c.show_editor(c.phrases[q], r.get(0))
                    } else {
                        c.show_prev_element(r)
                    }
                }
            },
            get_first_untranslated: function (t, u, r) {
                var v = null;
                if (t.data("phrases")) {
                    var q = t.data("phrases").slice();
                    var p = false;
                    if (u === "prev") {
                        q.reverse()
                    }
                    for (var s = 0; s < q.length; s++) {
                        var o = c.phrases[q[s].id];
                        if (o.status === this.status.untranslated || o.status === this.status.partially_translated && o.hidden !== "1") {
                            if (r) {
                                if (p) {
                                    v = o.id;
                                    break
                                }
                                if (o.id === c.editor.currentTranslation.id) {
                                    p = true
                                }
                            } else {
                                v = o.id;
                                break
                            }
                        }
                    }
                }
                return v
            },
            show_editor: function (o, p) {
                if (c.editor_loaded === false) {
                    alert("Still loading translation tool component. Can not open translation window. Please try again in a second.");
                    return
                }
                if (!c.user.is_logged_in) {
                    alert("Login first to be able submit translations");
                    c.show_login_panel();
                    return
                }
                c.place_translation_preview();
                c.editor.currentTranslation = o;
                if (p) {
                    c.editor.currentTranslation.active_element = p
                } else {
                    if (c.editor.currentTranslation.elements) {
                        c.editor.currentTranslation.active_element = c.editor.currentTranslation.elements[0].element
                    }
                }
                c.update_active_phrase_highlight();
                c.editorDialog.jiptDialog({
                    action: "open"
                });
                c.editorDialog.jiptDialog({
                    action: "toggle_minimized_show"
                });
                c.highlight_panel_opened_phrase();
                c.show_string(o.id);
                if (!c.plurals_preview) {
                    if (o.text.length === 1) {
                        h("#jipt-preview-available-msg").hide()
                    } else {
                        h("#jipt-preview-available-msg").show()
                    }
                }
            },
            show_string: function (o) {
                var p = {
                    type: "show_string",
                    id: o
                };
                p = JSON.stringify(p);
                c.editorDialogIframe.get(0).contentWindow.postMessage(p, c.projectLink)
            },
            refresh_suggestions: function () {
                var o = {
                    type: "refresh_suggestions"
                };
                o = JSON.stringify(o);
                c.editorDialogIframe.get(0).contentWindow.postMessage(o, c.projectLink)
            },
            _get_target_languages_options: function () {
                var r = i("language_code");
                var o = "";
                var q = "";
                for (var p = 0; p < c.target_languages.length; p++) {
                    q = "";
                    if (c.target_languages[p].code === r) {
                        q = "selected"
                    }
                    o += '<option value="' + c.target_languages[p].code + '" data-id="' + c.target_languages[p].id + '" ' + q + " >";
                    o += c.target_languages[p].name;
                    o += "</option>"
                }
                return o
            },
            show_login_panel: function () {
                c.loginDialog.content.find("#crowdin-login-language-field").html(c._get_target_languages_options());
                c.loginDialog.content.find(".crowdin-languages-panel").hide();
                c.loginDialog.content.find(".crowdin-login-panel").show();
                c.loginDialog.jiptDialog({
                    action: "open",
                    position: "center"
                });
                c.loginDialog.content.find("#crowdin-login-field").focus()
            },
            show_languages_panel: function () {
                c.loginDialog.content.find("#crowdin-language-field").html(c._get_target_languages_options());
                c.loginDialog.content.find(".crowdin-login-panel").hide();
                c.loginDialog.content.find(".crowdin-languages-panel").show();
                c.loginDialog.jiptDialog({
                    action: "open",
                    position: "center"
                })
            },
            set_current_language: function (p, q, o) {
                c.language.code = p;
                c.language.id = q;
                c.language.name = o;
                l("language_code", p);
                l("language_id", q);
                l("language_name", o)
            },
            _login_action: function () {
                var p = c.loginDialog.content.find("#crowdin-login-language-field option:selected");
                c.set_current_language(p.val(), p.data("id"), p.html());

                function o() {
                    var q = c.loginDialog.content.find(".jipt-register-block");
                    var r = c.loginDialog.content.find("#crowdin-login-error-message");
                    q.hide();
                    r.show();
                    c.loginDialog.content.find("#crowdin-login-field").focus();
                    setTimeout(function () {
                        r.hide();
                        q.show()
                    }, 3000)
                }
                c.ajax(n + "/jipt/login", {
                    login: c.loginDialog.content.find("#crowdin-login-field").val(),
                    password: c.loginDialog.content.find("#crowdin-password-field").val(),
                    language_code: c.language.code,
                    project: k()
                }, function (q) {
                    if (q.success) {
                        c.loginDialog.jiptDialog({
                            action: "close"
                        });
                        c.init_project()
                    } else {
                        o()
                    }
                })
            },
            _logout_action: function () {
                c.ajax(n + "/jipt/logout", {
                    project: k()
                }, function (o) {
                    if (!o.success) {
                        alert("An error ocurred while logging out")
                    } else {
                        window.location.reload()
                    }
                })
            },
            rebuild_panel_phrases: function (A, z) {
                c.translationDialog.content.find(".jipt-phrases-to-translate").html("");
                var x = "";
                var B;
                var p = 0;
                var v = 50;
                var r = c.panel_pages;
                var y = 0;
                if (z && /^\+?(0|[1-9]\d*)$/.test(z)) {
                    y = z;
                    if (z >= r) {
                        y = r - 1
                    }
                }
                var q = y * v;
                c.panel_page = y;
                for (var u in c.phrases) {
                    if (u === "0") {
                        continue
                    }
                    var s = c.phrases[u];
                    var D = s.hidden === "1" ? true : false;
                    var w = !c.user.is_leader && D ? "disabled" : "";
                    var E = D ? 'title="This string should not be translated."' : "";
                    if (A && A.length > 1) {
                        if (s.text[0].toLowerCase().indexOf(A.toLowerCase()) === -1) {
                            continue
                        }
                    }
                    if (c.translations_filter === true) {
                        if (!s.elements) {
                            continue
                        }
                    }
                    if (p < q || p >= q + v) {
                        p++;
                        continue
                    }
                    B = c.phrase_classname(s) + "_item";
                    x += "<li " + E + ' class="' + w + '"><a href="javascript:void(0)" class="' + B + '" rel="' + u + '">';
                    x += f(s.text[0]);
                    x += "</a></li>";
                    p++
                }
                if (p === 0) {
                    x += '<li><div style="padding: 30px; text-align: center; color: #999">No items.</div></li>'
                }
                c.translationDialog.content.find(".jipt-phrases-to-translate").html(x);
                r = Math.ceil(p / v);
                c.panel_pages = r;
                if (r < 2) {
                    h("#translation_panel_paging").hide()
                } else {
                    var t = (r.toString(10)).length * 2 + 3;
                    var C = h("#translation_panel_prev_page");
                    var o = h("#translation_panel_next_page");
                    h("#translation_panel_current_page").attr({
                        size: t
                    }).val((y + 1) + " / " + r);
                    y === 0 ? C.addClass("jipt-page-disabled") : C.removeClass("jipt-page-disabled");
                    y + 1 === r ? o.addClass("jipt-page-disabled") : o.removeClass("jipt-page-disabled");
                    h("#translation_panel_paging").show()
                }
                h("#jipt-translations .jipt-phrases-container").scrollTop(0);
                c.highlight_panel_opened_phrase()
            },
            delayed_rebuild_panel_phrases: function () {
                clearTimeout(c.rebuild_panel_timeout);
                c.rebuild_panel_timeout = setTimeout(function () {
                    c.rebuild_panel_phrases(c.panel_search_phrase, c.panel_page)
                }, 1000)
            },
            _show_join_translations_dialog: function (p) {
                c.set_current_language("", 0, "");
                var o = '<div style="text-align: center; height: 265px;"><img style="margin-top:35px;" src="' + g + '/images/preloader.gif" /></div>';
                var q = h("<div>").html(o);
                q.content = q.jiptDialog({
                    modal: true,
                    width: "550px",
                    height: "265px",
                    iframe: true,
                    drags: true,
                    minimize_btn: false,
                    close_btn: false,
                    icon: "crowdin",
                    custom_class: "jipt-join-translations",
                    title_pane: "<h4>Join " + i("language_name") + " Translation Team</h4>",
                    buttons_pane: '<div style="text-align:right"><a id="jipt-join-logout" href="#" class="jipt-btn-link" style="margin: 10px 0;">Logout</a><input type="button" value="Join" id="jipt-join-language" style="margin: 10px 0px;" /></div>'
                });
                h("#crowdin-jipt-mask > div").hide();
                q.jiptDialog({
                    action: "open"
                });
                c.ajax(n + "/group_actions/join_dialog", {
                    group_id: p.group_id,
                    project_id: p.project_id
                }, function (r) {
                    q.content.html(r.content);
                    q.jiptDialog({
                        action: "center"
                    });
                    if (r.has_join_request) {
                        q.content.find("#jipt-join-language").remove()
                    }
                    q.content.find("textarea").focus()
                });
                h("#jipt-join-language").click(function () {
                    c.ajax(n + "/group_actions/join", {
                        group_id: p.group_id,
                        project_id: p.project_id,
                        text: q.find("textarea").val().substr(0, 1500)
                    }, function (r) {
                        q.html(r.content)
                    });
                    h("#jipt-join-language").parent().remove();
                    q.html(o);
                    return false
                });
                h("#jipt-join-logout").click(function () {
                    c._logout_action();
                    return false
                })
            },
            _show_error_dialog: function (p) {
                var o = h("<div>").html(p);
                o.jiptDialog({
                    modal: true,
                    width: "450px",
                    drags: false,
                    minimize_btn: false,
                    close_btn: false,
                    icon: "crowdin",
                    title_pane: "<h4>Crowdin Just In Place Translations</h4>"
                });
                o.jiptDialog({
                    action: "open"
                })
            },
            _handle_jipt_error: function (o) {
                switch (o.error_code) {
                case "auth_error":
                    alert("Your session has expired. Please log in again");
                    window.location.reload();
                    break;
                case "moderate_language":
                    this._show_join_translations_dialog(o.data);
                    break;
                case "project_not_found":
                    this._show_error_dialog("Oops! Something went wrong while enabling translation mode. Please contact project manager for further assistance.");
                    break;
                case "private_project":
                    this._show_error_dialog("It seems that you do not have permission to participate. Try to switch " + o.brand_name + ' account if you have several or contact <a href="' + o.owner_url + '">project manager</a> for further assistance.');
                    break;
                case "jipt_disabled":
                    this._show_error_dialog('Oops! Something went wrong while enabling translation mode. Please contact <a href="' + o.owner_url + '">project manager</a> for further assistance.');
                    break;
                case "denied":
                    this._show_error_dialog("Sorry, you do not have access to this project.");
                    break
                }
            },
            element_classname: function (p) {
                if (p.is("select")) {
                    var t = [];
                    for (var r in c.status) {
                        if (p.find("[class*=crowdin_jipt_" + c.status[r] + "]").length) {
                            t.push("crowdin_jipt_" + c.status[r])
                        }
                    }
                    return t.join(" ")
                }
                var q = p.data("phrases");
                var u = [];
                for (var s = 0; s < q.length; s++) {
                    u.push(c.phrase_classname(c.phrases[q[s].id]))
                }
                for (var r in c.status) {
                    var o = "crowdin_jipt_" + c.status[r];
                    if (h.inArray(o, u) >= 0) {
                        return o
                    }
                }
                return ""
            },
            phrase_classname: function (o) {
                if (o.hidden === "1") {
                    return "crowdin_jipt_hidden"
                }
                return "crowdin_jipt_" + o.status
            },
            addPhraseToElement: function (q, r) {
                var o = [];
                if (q.data("phrases")) {
                    o = q.data("phrases")
                }
                for (var p = 0; p < o.length; p++) {
                    if (o[p].id === r.id) {
                        return
                    }
                }
                o.push(r);
                q.data("phrases", o)
            },
            ajax: function (o, p, q) {
                h.ajax({
                    url: o,
                    dataType: "jsonp",
                    data: p,
                    success: function (r) {
                        if (r.jipt_error) {
                            c._handle_jipt_error(r)
                        } else {
                            q(r)
                        }
                    }
                })
            },
            findNext: function (r, p, o) {
                var q = c[r](p);
                while (true) {
                    if (q === false) {
                        return false
                    }
                    if (q.is(o)) {
                        return q
                    }
                    q = c[r](q)
                }
            },
            next: function (o) {
                var s = o.find("*:first");
                if (s.length !== 0) {
                    return s
                }
                var q = o.next();
                if (q.length !== 0) {
                    return q
                }
                var p = o.parent();
                while (true) {
                    if (p.is("html")) {
                        return false
                    }
                    var r = p.next();
                    if (r.length !== 0) {
                        return r
                    }
                    p = p.parent()
                }
            },
            prev: function (o) {
                var p = o.prev();
                if (p.length !== 0) {
                    var q = p.find("*:last");
                    if (q.length !== 0) {
                        return q
                    } else {
                        return p
                    }
                }
                if (o.is("html")) {
                    return false
                }
                return o.parent()
            },
            _load_phrases_delayed: function (o, p) {
                if (d.preload_texts === true) {
                    return
                }
                h.extend(c._phrases.need_load, c.get_phrases_from_text(o));
                c._phrases.callbacks.push(p);
                clearTimeout(c._phrases.load_timeout);
                c._phrases.load_timeout = setTimeout(function () {
                    var q = c._phrases.need_load;
                    var r = c._phrases.callbacks.slice(0);
                    c._phrases.need_load = {};
                    c._phrases.callbacks = [];
                    for (var s in q) {
                        if (c._phrases.was_loaded[s]) {
                            delete q[s]
                        }
                    }
                    h.extend(c._phrases.was_loaded, q);
                    if (h.isEmptyObject(q)) {
                        return
                    }
                    c._load_phrases(q, r)
                }, 200)
            },
            _load_phrases: function (q, r) {
                var p = 0;
                if (d.preload_texts === true) {
                    var t = ["all"]
                } else {
                    var s = c.serialize_ids(q);
                    var t = c.string_chunks(s, 1400, ".")
                }
                for (var o = 0; o < t.length; o++) {
                    c.ajax(n + "/jipt/phrases", {
                        language_code: c.language.code,
                        project: k(),
                        phrase_ids: t[o]
                    }, function (v) {
                        p++;
                        h.extend(c.phrases, v);
                        if (p === t.length) {
                            for (var u = 0; u < r.length; u++) {
                                r[u]()
                            }
                            c.delayed_rebuild_panel_phrases()
                        }
                    })
                }
            },
            get_phrases_from_text: function (r) {
                var p = {}, o, q = /{crwdns(\d+):\d}/g;
                while (true) {
                    var o = q.exec(r);
                    if (o === null) {
                        break
                    }
                    p[parseInt(o[1])] = true
                }
                return p
            },
            serialize_ids: function (r) {
                var v = [];
                var p = [];
                var s = 0;
                for (var u in r) {
                    if (u - s !== 1 && p.length !== 0) {
                        v.push(p);
                        p = []
                    }
                    p.push(u);
                    s = u
                }
                if (p.length !== 0) {
                    v.push(p)
                }
                var o = [];
                for (var q = 0; q < v.length; q++) {
                    var t = v[q][0];
                    var s = v[q][v[q].length - 1];
                    if (t === s) {
                        o.push(t)
                    } else {
                        o.push(t + "-" + s)
                    }
                }
                return o.join(".")
            },
            string_chunks: function (r, s, p) {
                var o = [];
                while (true) {
                    var q = r.indexOf(p, s);
                    if (q === -1) {
                        if (r.length !== 0) {
                            o.push(r)
                        }
                        break
                    }
                    o.push(r.slice(0, q));
                    r = r.slice(q + 1)
                }
                return o
            }
        };
    c.init()
};
jipt();

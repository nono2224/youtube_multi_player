$(".header_button").on("click", header_oc);
$(".menu_button").on("click", menu_open);
$(".close").on("click", menu_close);
$(".URL_in_box_button").on("click", URL_add);
$(".all_clear").on("click", all_clear_menu_open);
$(".all_clear_menu_button_yes").on("click", all_clear_yes);
$(".all_clear_menu_button_no").on("click", all_clear_no);
$(window).resize(block);
$(window).resize(notification_size_change);
$(window).resize(size_change);
$(".block_no").on("click", block_cancel);
$(window).keydown(function(e) {
    if (e.keyCode == 27) {
        menu_close();
    }
});
$(".URL_in_box").keydown(function(e) {
    if (e.keyCode == 13) {
        URL_add();
    }
})

var header_oc_num = 1; //ヘッダーが隠れてるか隠れてないか 1=隠れてない 0=隠れてる
var count = 0; //addで使うURLを13個以上入れないようにするためのカウント
var check = 0; //add関数を利用して良いかのチェック 0=利用OK 1=利用NG
var number_delete = 0 //URLをdeleteする際の番号
var check_block = 0; //画面のサイズでブロックするかしないかの判断 0==サイズ以下の場合はブロックする 1==サイズ以下の場合はブロックしない
var all_clear_menu = 0; //all_clear_menuが開いているかを保存する関数 0=閉じている 1=開いている

block();

function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    } else {
        ID = url;
    }
    return ID;
}

function header_oc() {
    if (header_oc_num == 1) {
        $(".header").css("top", "-50px");
        $(".header_button").css("transform", "rotateX(180deg)");
        header_oc_num = 0;
    } else if (header_oc_num == 0) {
        $(".header").css("top", "0px");
        $(".header_button").css("transform", "rotateX(0deg)");
        header_oc_num = 1;
    }
}

function menu_open() {
    if (header_oc_num == 1) {
        $(".header").css("top", "-50px");
        $(".header_button").css("transform", "rotateX(180deg)");
        header_oc_num = 0;
    }

    $(".menu").css("width", "100vw");
    $(".menu").css("height", "100vh");
    $(".select").css("display", "block")
    $(".menu").css("opacity", 1);
}

function menu_close() {
    $(".menu").css("opacity", 0);
    var timer = setInterval(zero, 500);

    function zero() {
        $(".select").css("display", "none");
        $(".menu").css("width", "0");
        $(".menu").css("height", "0");
        clearInterval(timer);
    }
}

function URL_add() {
    if (check == 0) {
        if ($(".URL_in_box").val() == "") {
            notification_noURL();
        } else {
            if (count == 0) {
                $(".main").empty();
            }
            if (count < 12) {
                count++;
                number_delete++;
                $(".main").append("<iframe id='iframe" + number_delete + "' src='https://www.youtube.com/embed/" + YouTubeGetID($(".URL_in_box").val()) + "?autoplay=1&modestbranding=1&rel=0' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>")
                $(".URL_area").append("<div class='URL_set' id='URL_set" + number_delete + "'><div class='URL'>" + YouTubeGetID($(".URL_in_box").val()) + "</div><div class='delete' onclick='delete_URL(" + number_delete + ");'></div></div>");
                size_change();
                $(".URL_in_box").val("");
            } else {
                notification_up13();
            }
        }
    } else {

    }
}

function delete_URL(A) {
    $("#" + "iframe" + A).remove();
    $("#" + "URL_set" + A).remove();
    count--;
    if (count == 0) {
        $(".main").append("<div class='no_content'><p>コンテンツがありません<br>コンテンツを追加するには'menu'からURLを入力し，'追加'を押してください</p></div>");
    }
    size_change();
}

function black_on() {
    $(".black").css("width", "100vw");
    $(".black").css("height", "100vh");
    $(".black").css("opacity", "0.5");
}

function black_off() {
    $(".black").css("opacity", 0);
    var timer = setInterval(zero2, 500);

    function zero2() {
        $(".black").css("width", "0");
        $(".black").css("height", "0");
        clearInterval(timer);
    }
}

function all_clear_menu_open() {
    all_clear_menu = 1;
    black_on();
    $(".all_clear_menu").css("left", "10px");
}

function all_clear_menu_close() {
    if (1300 <= $(window).width()) {
        $(".all_clear_menu").css("left", "calc(-25vw + -10px)");
    } else if (1100 <= $(window).width() && $(window).width() < 1300) {
        $(".all_clear_menu").css("left", "calc(-30vw + -10px)");
    } else if (850 <= $(window).width() && $(window).width() < 1100) {
        $(".all_clear_menu").css("left", "calc(-40vw + -10px)");
    } else if (700 <= $(window).width() && $(window).width() < 850) {
        $(".all_clear_menu").css("left", "calc(-50vw + -10px)");
    } else if ($(window).width() < 700) {
        $(".all_clear_menu").css("left", "calc(-75vw + -10px)");
    }
    black_off();
    all_clear_menu = 0;
}

function all_clear_yes() {
    count = 0;
    size_change();
    $(".main").empty();
    $(".URL_area").empty();
    $(".main").append("<div class='no_content'><p>コンテンツがありません<br>コンテンツを追加するには'menu'からURLを入力し，'追加'を押してください</p></div>");
    all_clear_menu_close();
}

function all_clear_no() {
    all_clear_menu_close();
}

function notification_noURL() {
    check = 1;
    $(".notification").append("<p>URLが入力されていません．<br>URLを入力し，追加をしてください．</p>");
    $(".notification").css("right", "10px");
    $(".URL_in_box").css("background-color", "rgba(255, 0, 0, 0.253)");

    var timer1 = setInterval(zero3, 500);
    var timer2 = setInterval(zero4, 4000);
    var timer3 = setInterval(zero5, 4500);

    function zero3() {
        $(".URL_in_box").css("background-color", "#80808065");
        clearInterval(timer1);
    }

    function zero4() {
        if (1300 <= $(window).width()) {
            $(".notification").css("right", "calc(-25vw + -10px)");
        } else if (1100 <= $(window).width() && $(window).width() < 1300) {
            $(".notification").css("right", "calc(-30vw + -10px)");
        } else if (850 <= $(window).width() && $(window).width() < 1100) {
            $(".notification").css("right", "calc(-40vw + -10px)");
        } else if (700 <= $(window).width() && $(window).width() < 850) {
            $(".notification").css("right", "calc(-50vw + -10px)");
        } else if ($(window).width() < 700) {
            $(".notification").css("right", "calc(-75vw + -10px)");
        }
        clearInterval(timer2);
    }

    function zero5() {
        $(".notification").empty();
        check = 0;
        clearInterval(timer3);
    }
}

function notification_up13() {
    check = 1;
    $(".notification").append("<p>13個以上の動画を同時視聴することはできません．</p>");
    $(".notification").css("right", "10px");

    var timer1 = setInterval(zero6, 4000);
    var timer2 = setInterval(zero7, 4500);

    function zero6() {
        if (1300 <= $(window).width()) {
            $(".notification").css("right", "calc(-25vw + -10px)");
        } else if (1100 <= $(window).width() && $(window).width() < 1300) {
            $(".notification").css("right", "calc(-30vw + -10px)");
        } else if (850 <= $(window).width() && $(window).width() < 1100) {
            $(".notification").css("right", "calc(-40vw + -10px)");
        } else if (700 <= $(window).width() && $(window).width() < 850) {
            $(".notification").css("right", "calc(-50vw + -10px)");
        } else if ($(window).width() < 700) {
            $(".notification").css("right", "calc(-75vw + -10px)");
        }
        clearInterval(timer1);
    }

    function zero7() {
        $(".notification").empty();
        check = 0;
        clearInterval(timer2);
    }
}

function size_change() {
    if (count == 0 || count == 1) {
        $("iframe").css("width", "100vw");
        $("iframe").css("height", "100vh");
    } else if (count == 2) {
        if ($("html").width() >= 1300) {
            $("iframe").css("width", "50vw");
            $("iframe").css("height", "100vh");
        } else if ($("html").width() <= 1299) {
            $("iframe").css("width", "100vw");
            $("iframe").css("height", "50vh");
        }
    } else if (count == 3 || count == 4) {
        $("iframe").css("width", "50vw");
        $("iframe").css("height", "50vh");
    } else if (count == 5 || count == 6) {
        $("iframe").css("width", "33.3vw");
        $("iframe").css("height", "50vh");
    } else if (count == 7 || count == 8 || count == 9) {
        $("iframe").css("width", "33.3vw");
        $("iframe").css("height", "33.3vh");
    } else if (count == 10 || count == 11 || count == 12) {
        $("iframe").css("width", "25vw");
        $("iframe").css("height", "33.3vh");
    }
}

function mobile_check() {
    var ua = navigator.userAgent;
    if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
        return 1;
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        return 1;
    } else {
        return 0;
    }
}

function block() {
    if (check_block == 1) {

    } else {
        if (mobile_check() == 1) {
            $(".block").css("display", "block");
        } else {
            $(".block").css("display", "none");
        }
    }
}

function block_cancel() {
    $(".block").css("opacity", "0");
    check_block = 1;

    var timer = setInterval(zero8, 500);

    function zero8() {
        $(".block").css("display", "none");
        $(".block").css("opacity", "1");
        clearInterval(timer);
    }
}

function notification_size_change() {
    if (all_clear_menu == 1 || check == 1) {

    } else {
        if (1300 <= $(window).width()) {
            $(".notification").css("right", "calc(-25vw + -10px)");
            $(".all_clear_menu").css("left", "calc(-25vw + -10px)");
        } else if (1100 <= $(window).width() && $(window).width() < 1300) {
            $(".notification").css("right", "calc(-30vw + -10px)");
            $(".all_clear_menu").css("left", "calc(-30vw + -10px)");
        } else if (850 <= $(window).width() && $(window).width() < 1100) {
            $(".notification").css("right", "calc(-40vw + -10px)");
            $(".all_clear_menu").css("left", "calc(-40vw + -10px)");
        } else if (700 <= $(window).width() && $(window).width() < 850) {
            $(".notification").css("right", "calc(-50vw + -10px)");
            $(".all_clear_menu").css("left", "calc(-50vw + -10px)");
        } else if ($(window).width() < 700) {
            $(".notification").css("right", "calc(-75vw + -10px)");
            $(".all_clear_menu").css("left", "calc(-75vw + -10px)");
        }
    }
}
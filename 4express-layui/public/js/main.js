$(function() {
    $(document).scroll(() => {
        if ($(document).scrollTop() >= 700 || $(window).width() <= 768) {
            $('.my-top').css('top', '0');
            // $('.tapbar').css('display', 'none');
        } else if ($(document).scrollTop() < 700 || $(window).width() > 768) {
            // $('.tapbar').css('display', 'block');
            $('.my-top').css('top', '50px');

        } else {

        }
    })
})
$(window).resize(() => {
    console.log($(window).width());
    if ($(window).width() <= 768) {
        $('.my-top').css('top', '0');
        $('#header').css('height', '100px')
    } else {
        // $('.my-top').css('top', '50px');
        // $('.my-top').css('top', '50px');
    }
})
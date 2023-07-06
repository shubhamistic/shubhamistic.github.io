$(document).ready(()=>{
    let homeHeadingH2 = $('#home-heading-main h2');
    $('#home-heading-main').css('height', homeHeadingH2.css('height'));

    console.log($('#home').css('height'));

    $(window).on('resize', function() {
        $('#home-heading-main').css('height', homeHeadingH2.css('height'));
    });
});
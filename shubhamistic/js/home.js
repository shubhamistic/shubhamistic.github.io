$(document).ready(()=>{
    let homeHeadingH2 = $('#home-heading-main h2');

    $('#home-heading-main').css('height', homeHeadingH2.css('height'));
    $(window).on('resize', function() {
        $('#home-heading-main').css('height', homeHeadingH2.css('height'));
    });

    let str = "Explore the world of stunning web projects developed by";
    console.log(str.length);
});
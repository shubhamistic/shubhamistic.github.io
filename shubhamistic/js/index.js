$(()=> {
    const elementTop = $('#projects').offset().top;
    let elementReached = false;
    console.log(elementTop);

    $(window).scroll(function() {
        let distanceFromTop = $(document).scrollTop();
        console.log(distanceFromTop);

        if(distanceFromTop >= elementTop && elementReached === false){
            elementReached = true;
            console.log("#projects reached");
        }
    });
});
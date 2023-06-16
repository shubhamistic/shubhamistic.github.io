(()=> {
    let socialButton = $('#nav-ss-social-div');


    socialButton.click(function () {

    });

    socialButton.click(function (){
        socialButton.css("background-color", "green");

        socialButton.html(`
            <a href="https://github.com/shubhamistic/" target="_blank">
                <div id="nav-ss-github" class="nav-link button icon"> <i class="fa-brands fa-github"></i> </div>
            </a>
            <a href="https://www.linkedin.com/in/shubhamistic/" target="_blank">
                <div id="nav-ss-linkedin" class="nav-link button icon"> <i class="fa-brands fa-linkedin-in"></i> </div>
            </a>
            <a href="mailto:shubham2003garg@gmail.com">
                <div id="nav-ss-email" class="nav-link button icon"> <i class="fa-regular fa-envelope"></i> </div>
            </a>
        `)
    });

    $(document).on('click', function(e) {
        // If the user clicks anywhere other than the button or the div,
        // reappear the button and hide the div.
        if (!$(e.target).closest(socialButton).length && !$(e.target).closest('#div').length) {
            // $div.hide();
            socialButton.css("background-color", "unset");
            // socialButton.empty();
        }
    });
})();
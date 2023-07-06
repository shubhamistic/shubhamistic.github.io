$(document).ready(()=> {
    let socialButton = $('#nav-ss-social-div');
    let sectionButton = $('#nav-ss-section-div');

    socialButton.click(function (){
        socialButton.html(`
            <div class="nav-ss-links" id="nav-ss-social-links">
                <div class="nav-ss-cross-button nav-link"> <i class="fa-solid fa-xmark"></i> </div>
                
                <div class="basic-flex" id="nav-ss-social-links-container">
                    <a href="https://github.com/shubhamistic/" target="_blank">
                        <div id="nav-ss-github" class="nav-link button icon"> <i class="fa-brands fa-github"></i> </div>
                    </a>
                    <a href="https://www.linkedin.com/in/shubhamistic/" target="_blank">
                        <div id="nav-ss-linkedin" class="nav-link button icon"> <i class="fa-brands fa-linkedin-in"></i> </div>
                    </a>
                    <a href="mailto:shubham2003garg@gmail.com">
                        <div id="nav-ss-email" class="nav-link button icon"> <i class="fa-regular fa-envelope"></i> </div>
                    </a>
                </div>
            </div>
        `);

        let crossButton = $('.nav-ss-cross-button');
        crossButton.click(function (event){
            event.stopPropagation();
            socialButton.html(`
                <div id="nav-ss-social-button" class="nav-link button icon"> <i class="fa-solid fa-globe"></i> </div>
            `);
        });
    });

    sectionButton.click(function (){
        sectionButton.html(`
            <div class="nav-ss-links" id="nav-ss-section-links">
                <div>
                    <div class="nav-ss-cross-button nav-link"> <i class="fa-solid fa-xmark"></i> </div>
                </div>
                
                <div class="hr-line header-hr-line"></div>
               
                <div>
                    <a href="#header"><div id="nav-home" class="nav-link button">  <p>HOME</p> </div></a>
                    <a href="#projects"><div id="nav-projects" class="nav-link button"> <p>PROJECTS</p> </div></a>
                    <a href="#experience"><div id="nav-experience" class="nav-link button"> <p>EXPERIENCE</p> </div></a>
                    <a href="#skills"><div id="nav-skills" class="nav-link button"> <p>SKILLS</p> </div></a>
                    <a href="#achievements"><div id="nav-achievements" class="nav-link button"> <p>ACHIEVEMENTS</p> </div></a>
                    <a href="#contact"><div id="nav-contact" class="nav-link button"> <p>CONTACT</p> </div></a>
                </div>

                <div class="hr-line header-hr-line"></div>
                
                <div id="nav-ss-section-social-links">
                    <a href="https://github.com/shubhamistic/" target="_blank">
                        <div id="nav-ss-github" class="nav-link button">
                            <p> <i class="fa-brands fa-github"></i> &nbsp GITHUB &nbsp </p>
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/shubhamistic/" target="_blank">
                        <div id="nav-ss-linkedin" class="nav-link button">
                            <p> <i class="fa-brands fa-linkedin-in"></i> LINKED IN </p>
                        </div>
                    </a>
                    <a href="mailto:shubham2003garg@gmail.com">
                        <div id="nav-ss-email" class="nav-link button">
                            <p> <i class="fa-regular fa-envelope"></i> EMAIL ME </p>
                        </div>
                    </a>
                </div>
            </div>
        `);

        let crossButton = $('.nav-ss-cross-button');
        crossButton.click(function (event){
            event.stopPropagation();
            sectionButton.html(`
                <div id="nav-ss-section-button" class="nav-link button icon"> <i class="fa-solid fa-bars"></i> </div>
            `);
        });
    });
});
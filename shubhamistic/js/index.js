$(()=> {
    const projectsSection = $('#projects');
    const experienceSection = $('#experience');
    const skillsSection = $('#skills');
    const achievementsSection = $('#achievements');
    const contactSection = $('#contact');

    const sections = {
        projects: projectsSection,
        experience: experienceSection,
        skills: skillsSection,
        achievements: achievementsSection,
        contact: contactSection
    };

    const sectionsReached = {
        projects: false,
        experience: false,
        skills: false,
        achievements: false,
        contact: false
    };

    function isReached(section, distanceFromTop){
        const sectionsTop = {
            projects: projectsSection.offset().top,
            experience: experienceSection.offset().top,
            skills: skillsSection.offset().top,
            achievements: achievementsSection.offset().top,
            contact: contactSection.offset().top
        };

        if(
            ((distanceFromTop + 60) >= sectionsTop[section]) &&
            (! sectionsReached[section])
        ){
            sectionsReached[section] = true;
            console.log(`${section} reached`, sectionsReached);
            return true;
        }
        return false;
    }

    $(window).scroll(function() {
        let distanceFromTop = $(document).scrollTop();
        Object.keys(sections).map((section) => {
            if(isReached(section, distanceFromTop)){
                const sectionHeading = sections[section].find('.section-heading');
                const sectionContainer = sections[section].find(`#${section}-container`);

                sections[section].css({
                    'position': 'sticky',
                    'top': '60px'
                });
                sectionHeading.css({
                    'position': 'sticky',
                    'top': '60px'
                });
            }
        });
    });
});
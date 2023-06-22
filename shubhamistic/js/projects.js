$(()=> {
    const HTTPS = "https://api.shubhamistic.com/shubhamistic"
    // const HTTP = "http://127.0.0.1:5000/shubhamistic"
    const stellarCreations = $('#p-stellar-creations');
    const techToolbox = $('#p-tech-toolbox');
    const virtualAdventures = $('#p-virtual-adventures');

    $.ajax({
        url: `${HTTPS}/projects`,
        type: "GET",
        success: function (response) {
            const data = response.data;
            // Stellar Creations
            // add stellar creations to the projects list
            stellarCreations.html(`
                <div id="p-sc-container">
                    <img src="${data.stellar_creations.image}" alt="image">
                    <div id="p-sc-content" class="basic-flex">
                        <p id="p-c-title">${data.stellar_creations.title}</p>
                        <div class="hr-line p-split p-split-top"></div>
                        <div id="p-tags"></div>
                        <div class="hr-line p-split"></div>
                        <p id="p-c-about" class="text">${data.stellar_creations.description}</p>
                    </div>
                    <div id="p-sc-media" class="basic-flex">
                        <div id="p-web-links"></div>
                    </div>
                </div>
            `);
            // add tech stack tags
            for (let tag of data.stellar_creations.tags) {
                $('#p-tags').append(`
                    <div class="basic-flex tag"><p> ${tag} </p></div>
                `);
            }
            // add web links to the project
            let web_links = data.stellar_creations.web_links;
            if(web_links.github){
                $('#p-web-links').append(`
                    <a href="${web_links.github}" target="_blank">
                        <div class="basic-flex p-button button icon p-link">
                            <i class="fa-brands fa-github"></i>
                        </div>
                    </a>
                `);
            }
            if(web_links.website){
                $('#p-web-links').append(`
                    <a href="${web_links.website}" target="_blank">
                        <div class="basic-flex p-button button icon p-link">
                            <i class="fa-solid fa-up-right-from-square"></i>
                        </div>
                    </a>
                `);

                $('#p-sc-media').append(`
                    <div class="basic-flex p-button button icon p-link p-qr">
                        <i class="fa-solid fa-qrcode"></i>
                    </div>
                `);
            }

            // Tech Toolbox
            for(let container=0 ; container < data.tech_toolbox.length ; container++) {
                techToolbox.append(`
                    <div class="p-container" id="p-tt-${container}">
                        <img src="${data.tech_toolbox[container].image}" alt="image">
                        <div class="basic-flex p-content">
                            <p class="p-c-title">${data.tech_toolbox[container].title}</p>
                            <div class="p-tags"></div>
                            <div class="hr-line p-sc-split"></div>
                            <p class="text p-c-about">${data.tech_toolbox[container].description}</p>
                        </div>
                        <div class="basic-flex p-media">
                            <div class="p-web-links"></div>
                        </div>
                    </div>
                `);
                // add tech stack tags
                for (let tag of data.tech_toolbox[container].tags) {
                    $(`#p-tt-${container} .p-tags`).append(`
                        <div class="basic-flex tag p-sc-tag"><p> ${tag} </p></div>
                    `);
                }
                // add web links to the project
                web_links = data.tech_toolbox[container].web_links;
                if (web_links.github) {
                    $(`#p-tt-${container} .p-web-links`).append(`
                        <a href="${web_links.github}" target="_blank">
                            <div class="basic-flex p-button button icon p-link">
                                <i class="fa-brands fa-github"></i>
                            </div>
                        </a>
                    `);
                }
                if (web_links.website) {
                    $(`#p-tt-${container} .p-web-links`).append(`
                        <a href="${web_links.website}" target="_blank">
                            <div class="basic-flex p-button button icon p-link">
                                <i class="fa-solid fa-up-right-from-square"></i>
                            </div>
                        </a>
                    `);

                    $(`#p-tt-${container} .p-media`).append(`
                        <div class="basic-flex p-button button icon p-link p-qr">
                            <i class="fa-solid fa-qrcode"></i>
                        </div>
                    `);
                }
            }

            // Virtual-Adventures
            for(let container=0 ; container < data.virtual_adventures.length ; container++) {
                virtualAdventures.append(`
                    <div class="p-container" id="p-va-${container}">
                        <img src="${data.virtual_adventures[container].image}" alt="image">
                        <div class="basic-flex p-content">
                            <p class="p-c-title">${data.virtual_adventures[container].title}</p>
                            <div class="p-tags"></div>
                            <div class="hr-line p-sc-split"></div>
                            <p class="text p-c-about">${data.virtual_adventures[container].description}</p>
                        </div>
                        <div class="basic-flex p-media">
                            <div class="p-web-links"></div>
                        </div>
                    </div>
                `);
                // add tech stack tags
                for (let tag of data.virtual_adventures[container].tags) {
                    $(`#p-va-${container} .p-tags`).append(`
                        <div class="basic-flex tag p-sc-tag"><p> ${tag} </p></div>
                    `);
                }
                // add web links to the project
                web_links = data.virtual_adventures[container].web_links;
                if (web_links.github) {
                    $(`#p-va-${container} .p-web-links`).append(`
                        <a href="${web_links.github}" target="_blank">
                            <div class="basic-flex p-button button icon p-link">
                                <i class="fa-brands fa-github"></i>
                            </div>
                        </a>
                    `);
                }
                if (web_links.website) {
                    $(`#p-va-${container} .p-web-links`).append(`
                        <a href="${web_links.website}" target="_blank">
                            <div class="basic-flex p-button button icon p-link">
                                <i class="fa-solid fa-up-right-from-square"></i>
                            </div>
                        </a>
                    `);

                    $(`#p-va-${container} .p-media`).append(`
                        <div class="basic-flex p-button button icon p-link p-qr">
                            <i class="fa-solid fa-qrcode"></i>
                        </div>
                    `);
                }
            }
        },
        error: function () {}
    });

    // logic for making the project list scrollable in x-axis
    const projectList = $('.p-list');
    projectList.on('wheel swipeleft swiperight', function(event) {
        let deltaX = event.originalEvent.deltaX || 0;
        let deltaY = event.originalEvent.deltaY || 0;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Scroll the div horizontally
            $(this).scrollLeft($(this).scrollLeft() - deltaX);
            event.preventDefault(); // Prevent default scrolling behavior
        }
    });
});

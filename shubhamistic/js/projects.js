$(()=> {
    const HTTPS = "https://api.shubhamistic.com/shubhamistic"
    // const HTTP = "http://127.0.0.1:5000/shubhamistic"

    function populateStellarCreations(data){
        const stellarCreations = $('#p-stellar-creations');
        // create the container
        stellarCreations.html(`
            <div id="p-sc-container">
                <div id="p-sc-image"></div>
                <div id="p-sc-media" class="basic-flex">
                    <div class="basic-flex p-button button icon p-link p-qr">
                        <i class="fa-solid fa-qrcode"></i>
                    </div>
                    <a href="${data.url}" target="_blank">
                        <div class="basic-flex p-button button icon p-link">
                            <i class="fa-solid fa-up-right-from-square"></i>
                        </div>
                    </a>
                </div>
                <div id="p-sc-content" class="basic-flex">
                    <p id="p-sc-title">${data.title}</p>
                    <div id="p-sc-tags"></div>
                    <div class="hr-line"></div>
                    <p id="p-sc-about" class="text">${data.description}</p>
                </div>
            </div>
        `);
        // add the tags
        for (let tag of data["tags"]) {
            $('#p-sc-tags').append(`
                <div class="basic-flex tag"><p> ${tag} </p></div>
            `);
        }
    }

    function populateTechToolbox(data){
        const techToolbox = $('#p-tech-toolbox');
        for(let containerID=0 ; containerID < data.length ; containerID++) {
            techToolbox.append(`
                <div class="p-container" id="p-tt-${containerID}">
                    <div class="p-image"></div>
                    <div class="basic-flex p-content">
                        <p class="p-title">${data[containerID].title}</p>
                        <div class="p-tags"></div>
                        <div class="hr-line"></div>
                        <p class="text p-about">${data[containerID].description}</p>
                    </div>
                    <div class="basic-flex p-media"></div>
                </div>
            `);
            // add the tags
            for (let tag of data[containerID]["tags"]) {
                $(`#p-tt-${containerID} .p-tags`).append(`
                    <div class="basic-flex tag p-tag"><p> ${tag} </p></div>
                `);
            }
            // add the web links
            let web_links = data[containerID]["web_links"];
            let webLinks = $(`#p-tt-${containerID} .p-media`);
            if (web_links["github"]) {
                webLinks.append(`
                    <a href="${web_links["github"]}" target="_blank">
                        <div class="basic-flex p-button button icon p-link">
                            <i class="fa-brands fa-github"></i>
                        </div>
                    </a>
                `);
            }
            if (web_links["website"]) {
                webLinks.append(`
                    <a href="${web_links["website"]}" target="_blank">
                        <div class="basic-flex p-button button icon p-link">
                            <i class="fa-solid fa-up-right-from-square"></i>
                        </div>
                    </a>
                `);
                webLinks.prepend(`
                    <div class="basic-flex p-button button icon p-link p-qr">
                        <i class="fa-solid fa-qrcode"></i>
                    </div>
                `);
            }
        }
    }

    function populateVirtualAdventures(data){
        const virtualAdventures = $('#p-virtual-adventures');
        for(let containerID=0 ; containerID < data.length ; containerID++) {
            virtualAdventures.append(`
                <div class="p-container" id="p-va-${containerID}">
                    <div class="p-image"></div>
                    <div class="basic-flex p-content">
                        <p class="p-title">${data[containerID].title}</p>
                        <div class="p-tags"></div>
                        <div class="hr-line"></div>
                        <p class="text p-about">${data[containerID].description}</p>
                    </div>
                    <div class="basic-flex p-media"></div>
                </div>
            `);
            // add the tags
            for (let tag of data[containerID]["tags"]) {
                $(`#p-va-${containerID} .p-tags`).append(`
                    <div class="basic-flex tag p-tag"><p> ${tag} </p></div>
                `);
            }
            // add the web links
            let web_links = data[containerID]["web_links"];
            let webLinks = $(`#p-va-${containerID} .p-media`);
            if (web_links["github"]) {
                webLinks.append(`
                    <a href="${web_links["github"]}" target="_blank">
                        <div class="basic-flex p-button button icon p-link">
                            <i class="fa-brands fa-github"></i>
                        </div>
                    </a>
                `);
            }
            if (web_links["website"]) {
                webLinks.append(`
                    <a href="${web_links["website"]}" target="_blank">
                        <div class="basic-flex p-button button icon p-link">
                            <i class="fa-solid fa-up-right-from-square"></i>
                        </div>
                    </a>
                `);
                webLinks.prepend(`
                    <div class="basic-flex p-button button icon p-link p-qr">
                        <i class="fa-solid fa-qrcode"></i>
                    </div>
                `);
            }
        }
    }

    $.ajax({
        url: `${HTTPS}/projects`,
        type: "GET",
        success: function (response) {
            const data = response.data;
            // Stellar Creations
            populateStellarCreations(data["stellar_creations"]);
            // Tech Toolbox
            populateTechToolbox(data["tech_toolbox"]);
            // Virtual-Adventures
            populateVirtualAdventures(data["virtual_adventures"]);
        },
        error: function () {}
    });

    // logic for making the project list scrollable in x-axis
    const projectList = $('.p-list');
    projectList.on('wheel', function(event) {
        let deltaX = event.originalEvent.deltaX || 0;
        let deltaY = event.originalEvent.deltaY || 0;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Scroll the div horizontally
            $(this).scrollLeft($(this).scrollLeft() - deltaX);
            // Prevent default scrolling behavior
            event.preventDefault();
        }
    });
});

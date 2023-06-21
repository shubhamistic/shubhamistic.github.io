$(()=> {
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
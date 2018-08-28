// basic object for stuff
window.slider = {};

// settings
slider.pagination = $('.home .top .pagination');

// horizontal % needed to trigger swipe
slider.sensitivity = 25;

// placeholder to remember which slide we’re on
slider.active = 0;

// slide counter
slider.count = 0;

// initialization  slider + event listener
slider.init = function (selector) {
	// find the container
	slider.sliderEl = selector;

	// count stuff
	slider.count = slider.sliderEl.find('.item').length;

	// pagination
	for(var i = 0; i < slider.count; i++) {
		var activeStatus = i == slider.active ? 'class="active"' : '';
		slider.pagination.append('<div ' + activeStatus + '></div>');
	}

	// set up HammerJS
	Hammer(slider.sliderEl[0]).on('swiperight swipeleft', function (e) {
		// calculate pixel movements into 1:1 screen percents so gestures track with motion
		var percentage = 100 / slider.count * e.deltaX / window.innerWidth;
		
		// multiply percent by # of slide we’re on
		var percentageCalculated = percentage - 100 / slider.count * slider.active;
		
		// apply transformation
		slider.sliderEl.css('transform','translateX(' + percentageCalculated + '%)');
	
		// snap to slide when done
		if(e.isFinal) {
			if(e.velocityX > 1) {
				slider.goTo(slider.active - 1);
			} else if (e.velocityX < -1) {
				slider.goTo(slider.active + 1)
			} else {
			if (percentage <= -(slider.sensitivity / slider.count))
				slider.goTo(slider.active + 1);
			else if(percentage >= (slider.sensitivity / slider.count))
				slider.goTo(slider.active - 1);
			else
				slider.goTo(slider.active);
			}
		}
	});
};

// update current slide
slider.goTo = function (number) {
	// stop it from doing weird things like moving to slides that don’t exist
	if(number < 0)
		slider.active = 0;
	else if(number > slider.count - 1)
		slider.active = slider.count - 1
	else
		slider.active = number;
	
	// apply transformation & smoothly animate via animating css
	slider.sliderEl.addClass('animating');
	var percentage = (100 / slider.count) * slider.active;
	slider.sliderEl.css('transform', 'translateX(' + percentage + '%)');
	clearTimeout(timer);
	var timer = setTimeout(function () {
		slider.sliderEl.removeClass('animating');
	}, 400);

	// update the counters
	var pagination = slider.pagination.children();
	for(var i = 0; i < pagination.length; i++) {
		var className = i == slider.active ? 'active' : '';
		pagination[i].className = className;
	}
};

// initialize top slider in home page
slider.init($('#top-slider'));

var carouseTop = $("#carousel-top .items"), carouselBottom = $("#carousel-bottom .items");

//initialize itemslide
carouseTop.itemslide(); 
carouselBottom.itemslide();

// recalculate width and center positions and sizes when window is resized
$(window).resize(function () {
	carouseTop.reload();
	carouselBottom.reload();
}); 


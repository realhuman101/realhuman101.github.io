$(window).on('load',() => {
	$('#loader').fadeOut('fast');

	var element = document.getElementsByClassName('typewrite')[0];
	var toRotate = element.getAttribute('data-type');
	var period = element.getAttribute('data-period');
	if (toRotate) {
		new TxtType(element, JSON.parse(toRotate), period);
	}

	$('#nav-hamburger').click(() => {
		$('#hamburger-inner').toggleClass('hamburger-clicked');
		$('#hamburger-items').toggleClass('hamburger-showing');

		if ($('#hamburger-items').css('display') == 'none') {
			$('body').css({'overflow': 'hidden'});
			$('#hamburger-items').css({'display': 'flex'});
			$('#hamburger-inner').addClass('hamburger-color');
		} else {
			$('body').css({'overflow': 'scroll'});
			setTimeout(() => {
				$('#hamburger-items').css({'display': 'none'})
				$('#hamburger-inner').removeClass('hamburger-color');
				checkNavScroll();
			}, 500);
		}
	})

	$('a[href^="#"]').click((event) => {
		event.preventDefault();
		scrollToElem($( $(event.target).attr('href') ));
	});

	$('.title').click((event) => {
		scrollToElem($(event.target).parent());
	})

	$("#contact-form").on("submit", function() {
		$.ajax({
			url: "https://formspree.io/f/xbjbrwnj", 
			method: "POST",
			data: {
				email: $('#email').val(),
				name: $('#name').val(),
				message: $('#message').val()
			},
			dataType: "json",
			complete: () => {
				$('#email').val('')
				$('#name').val('')
				$('#message').val('')
			},
			success: () => {
				swal("Success!","Message Sent!",'success');
			},
			error: () => {
				swal("Oops!","Message failed to send...",'error');
			},
		});
	});

	const swiper = new Swiper('.swiper', {
		loop: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		mousewheel: true,
		spaceBetween: 50,
		watchSlidesProgress: true,
		rewind: true,
		keyboard: {
			enabled: true,
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// $('.content-section').each((i, obj) => {
	// 	var waypoint = new Waypoint({
	// 		element: obj,
	// 		handler: (direction) => {
	// 			console.log('yes')
	// 			const hash = '#' + obj.id
	// 			if (location.hash != hash){
	// 				location.hash = '#' + obj.id
	// 			}
	// 		}
	// 	})
	// })
})

$(window).on('scroll', () => {
	checkNavScroll();
})

function checkNavScroll() {
	const navbar = $('#navbar');
	const navY = $('#navY');

	if ($(window).scrollTop() >= navY.offset().top) {
		if ($('#hamburger-items').css('display') == 'none') {
			$('#hamburger-inner').removeClass('hamburger-color');
			navbar.css({"position": "fixed","top": "0px"});
			navY.css({"height": '60px'});
		}
	} else {
		if ($('#hamburger-items').css('display') == 'none') {
			$('#hamburger-inner').addClass('hamburger-color');
			navbar.css({"position": "relative","top": "0px"});
			navY.css({"height": "0px"});
		}
	}
}

var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};

function scrollToElem(elem) {
	$('html, body').animate({
		scrollTop: elem.offset().top - 65
	}, 500);
}
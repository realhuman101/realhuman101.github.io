$(window).on('load',() => {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		darkmode();
	}	

	$('#loader').fadeOut('fast');

	checkProjectSize();

	var element = document.getElementsByClassName('typewrite')[0];
	var toRotate = element.getAttribute('data-type');
	var period = element.getAttribute('data-period');
	if (toRotate) {
		new TxtType(element, JSON.parse(toRotate), period);
	}

	$('#nav-hamburger').on('click tap',() => {
		$('#hamburger-inner').toggleClass('hamburger-clicked');
		$('#hamburger-items').toggleClass('hamburger-showing');

		if ($('#hamburger-items').css('display') == 'none') {
			$('body').css({'overflow': 'hidden'});
			$('#nav-hamburger').css({'height': '100%'});
			$('#hamburger-items').css({'display': 'flex'});
		} else {
			$('body').css({'overflow': 'scroll'});
			setTimeout(() => {
				$('#hamburger-items').css({'display': 'none'})
				$('#nav-hamburger').css({'height': 'fit-content'});
				checkNavScroll();
			}, 500);
		}
	})

	$('a[href^="#"]').on('click tap',(event) => {
		event.preventDefault();
		scrollToElem($( $(event.target).attr('href') ));
	});

	$('.title').on('click tap',(event) => {
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

	$('#toTop').on('click tap', () => {
		$('html, body').animate({ scrollTop: 0 }, 500);
	})

	const swiper = new Swiper('.swiper', {
		loop: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		mousewheel: true,
		spaceBetween: 75,
		variableWidth : true,
		watchSlidesProgress: true,
		rewind: true,
		keyboard: {
			enabled: true,
		},
		autoplay: {
			delay: 3500,
			disableOnInteraction: true,
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

	$('#darkmode').on('click tap', darkmode)

	$(window).on('resize', () => {
		checkProjectSize();
	})
})

$(window).on('scroll', () => {
	checkNavScroll();
})

function checkNavScroll() {
	const navbar = $('#navbar');
	const navY = $('#navY');

	if ($(window).scrollTop() >= navY.offset().top) {
		if ($('#hamburger-items').css('display') == 'none') {
			navbar.css({"position": "fixed","top": "0px"});
			navY.css({"height": '60px'});
		}
	} else {
		if ($('#hamburger-items').css('display') == 'none') {
			navbar.css({"position": "relative","top": "0px"});
			navY.css({"height": "0px"});
		}
	}
}

function checkProjectSize() {
	const windWidth = $(window).width();
	const swiperSlides = $('.swiper-slide');

	if (windWidth <= 600 && windWidth != swiperSlides) {
		swiperSlides.each((i, obj) => {
			obj.style.setProperty('width', 'calc(100vw - 30px)','important');
		})
	} else {
		swiperSlides.each((i, obj) => {
			obj.style.setProperty('width', '600px','important');
		})
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

function darkmode () {
	$('body').toggleClass('bodydark');
	$('.title').toggleClass('darktitle');

	$('.head-title').toggleClass('darkheadtitle');
	$('#navbar').toggleClass('darknavbar');
	$('.waves').toggleClass('darkwaves');
	$('.scroll-indicator').toggleClass('dark-scroll-indicate')

	$('#darkmode').toggleClass('darkmodeactive');

	$('button').toggleClass('dark-button');
	$('input[type="button"]').toggleClass('dark-button');
	$('input[type="submit"]').toggleClass('dark-button');

	$('.social-links').toggleClass('dark-social-links');
	$('.about-description').toggleClass('darktitle');

	$('.skill-card').toggleClass('dark-card');
	$('.skill-title').toggleClass('dark-description');
	$('.skill-icon').toggleClass('dark-icon');

	$('#projects').toggleClass('dark-section');
	$('.project-card').toggleClass('dark-card');
	$('.project-title').toggleClass('darktitle');
	$('.project-description').toggleClass('dark-hyperlink');

	$('.contact-card').toggleClass('dark-card');
	$('.contact-texts').toggleClass('dark-input');
}
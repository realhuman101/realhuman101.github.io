var darkTheme = false;

$(window).on('load',() => {
	if (window.matchMedia) {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			darkmode(true);
		}

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			darkmode(event.matches ? true : false);
		});
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
				if (!(darkTheme)) {
					Swal.fire({title: "Success!",
							   text: "Message Sent!",
							   icon: 'success'});
				} else {
					Swal.fire({title: "Success!",
							   text: "Message Sent!",
							   icon: 'success',
							   background: '#303030',
							   color: 'white'});
				}
			},
			error: () => {
				if (!(darkTheme)) {
					Swal.fire({title: "Oops...",
							   text: "Message Failed to Send",
							   icon: 'error'});
				} else {
					Swal.fire({title: "Oops...",
							   text: "Message Failed to Send",
							   icon: 'error',
							   background: '#303030',
							   color: 'white'});
				}
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

	$('.darkmode').on('click tap', () => {darkmode()})

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

function darkmode (theme = 'none') {
	if (theme == 'none') {
		darkTheme = !(!!(darkTheme));

		$('body').toggleClass('bodydark');
		$('.title').toggleClass('darktitle');
	
		$('.head-title').toggleClass('darkheadtitle');
		$('#navbar').toggleClass('darknavbar');
		$('.waves').toggleClass('darkwaves');
		$('.scroll-indicator').toggleClass('dark-scroll-indicate')
	
		$('.darkmode').toggleClass('darkmodeactive');
	
		$('button').toggleClass('dark-button');
		$('input[type="button"]').toggleClass('dark-button');
		$('input[type="submit"]').toggleClass('dark-button');
	
		$('footer').toggleClass('dark-footer');
	
		$('.social-links').toggleClass('dark-social-links');
		$('.about-description').toggleClass('darktitle');
	
		$('.skill-card').toggleClass('dark-card');
		$('.skill-title').toggleClass('dark-description');
		$('.skill-icon').toggleClass('dark-icon');
	
		$('#projects').toggleClass('dark-section');
		$('.project-card').toggleClass('dark-card');
		$('.project-title').toggleClass('darktitle');
		$('.project-description').toggleClass('dark-hyperlink');
		$('.project-github').toggleClass('dark-github');
	
		$('.contact-card').toggleClass('dark-card');
		$('.contact-texts').toggleClass('dark-input');
	} else {
		darkTheme = theme;
		
		$('body').toggleClass('bodydark');
		$('.title').toggleClass('darktitle');
	
		$('.head-title').toggleClass('darkheadtitle', theme);
		$('#navbar').toggleClass('darknavbar', theme);
		$('.waves').toggleClass('darkwaves', theme);
		$('.scroll-indicator').toggleClass('dark-scroll-indicate', theme);
	
		$('.darkmode').toggleClass('darkmodeactive', theme);
	
		$('button').toggleClass('dark-button', theme);
		$('input[type="button"]').toggleClass('dark-button', theme);
		$('input[type="submit"]').toggleClass('dark-button', theme);
	
		$('footer').toggleClass('dark-footer', theme);
	
		$('.social-links').toggleClass('dark-social-links', theme);
		$('.about-description').toggleClass('darktitle', theme);
	
		$('.skill-card').toggleClass('dark-card', theme);
		$('.skill-title').toggleClass('dark-description', theme);
		$('.skill-icon').toggleClass('dark-icon', theme);
	
		$('#projects').toggleClass('dark-section', theme);
		$('.project-card').toggleClass('dark-card', theme);
		$('.project-title').toggleClass('darktitle', theme);
		$('.project-description').toggleClass('dark-hyperlink', theme);
		$('.project-github').toggleClass('dark-github', theme);
	
		$('.contact-card').toggleClass('dark-card', theme);
		$('.contact-texts').toggleClass('dark-input', theme);
	}
}
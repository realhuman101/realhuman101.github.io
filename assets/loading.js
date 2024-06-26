const loading = document.getElementById('loadingText')

var counter = 1;


var notLoaded = true;

// while (notLoaded) {
// 	loading.textContent = 'LOADING' + '.'.repeat(counter);
// 	counter++;
// 	if (counter > 3) {
// 		counter = 1;
// 	}
// }

window.onload = (event) => {
	var script = document.createElement('script');
	script.setAttribute('type', 'module');
	script.setAttribute('src', 'main.js');
	document.head.appendChild(script);

	notLoaded = false;

	document.getElementById('loading').style.display = 'none'
};

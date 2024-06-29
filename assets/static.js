function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function completeLoad() {
	let loading = document.getElementById('loading')
	
	loading.style.animationFillMode = 'forwards'
	loading.style.animation = '250ms linear slideUp'
	
	sleep(250).then(() => {
		loading.style.display = 'none'

		const loadEvent = new CustomEvent('loadingDone')
		document.dispatchEvent(loadEvent)
	})
}
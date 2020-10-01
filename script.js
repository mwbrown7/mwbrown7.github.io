const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/anable button
function toggleButton() {
	button.disabled = !button.disabled;
}
//Passing joke to VoiceRss API
function tellMe(joke) {
	VoiceRSS.speech({
		key: 'c35baf60967c4311a7e5e956838db78f',
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
}

// Get jokes Api
async function getJokes() {
	let joke = '';
	const apiUrl ='https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist';
	try {
		const responce = await fetch(apiUrl);
		const data = await responce.json();

		if (data.setup) {
			joke = `${data.setup} ...${data.delivery} `;
		} else {
			joke = data.joke;
		}
		tellMe(joke);
		toggleButton();
	} catch (error) {
		console.log('whoops', error);
	}
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

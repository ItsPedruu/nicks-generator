let interval;

function randomArr(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function displayNickname(nickname) {
	const element = document.querySelector('h1');
	element.innerHTML = nickname;

	addToHistory(nickname);
}

function getAdditionalTextInformation() {
	const additionalTextPositionElement = document.querySelector('#additional-text-position');
	const additionalTextElement = document.querySelector('#additional-text');

	return {
		text: additionalTextElement.value,
		position: additionalTextPositionElement.value
	};
}

function generateNickname(letters) {
	const letterCombination = LETTERS_COMBINATIONS[letters];
	if (!letterCombination)
		return;

	const additionalTextInformation = getAdditionalTextInformation();
	const selectedCombination = randomArr(letterCombination);
	const raw = selectedCombination.map(number => randomArr(WORD_FRACTIONS[number])).join('');

	let data = raw;

	for (const repeatedVowel of Object.keys(SEMI_VOWELS)) 
		data = data.replace(repeatedVowel, randomArr(SEMI_VOWELS[repeatedVowel]));

	return additionalTextInformation.position == 'beginning' ? additionalTextInformation.text + data : data + additionalTextInformation.text;
}

function updateTag(element) {
	const tag = element.getAttribute('data-info');
	const tagElement = document.querySelector(`span[data-info="${tag}"]`);

	tagElement.innerHTML = element.value + (tag == 'velocity' ? 's' : '');
}

function getVelocity() {
	const element = document.querySelector('input[data-info="velocity"]');
	return parseInt(element.value);
}

function getLetters() {
	const element = document.querySelector('input[data-info="letters"]');
	return parseInt(element.value);
}

function stopGenerator() {
	clearTimeout(interval);
}

function startGenerator(velocity = getVelocity(), letters = getLetters()) {
	stopGenerator();

	interval = setInterval(() => {
		const nickname = generateNickname(letters);
		
		displayNickname(nickname);
	}, velocity * 1000);
}

function changeHistoryState(hide) {
	const element = document.querySelector('.history');
	element.style.display = hide ? 'none' : 'initial';
}

function addToHistory(nickname) {
	const element = document.querySelector('.history .content');
	element.innerHTML += `<p>${nickname}</p>`;
}
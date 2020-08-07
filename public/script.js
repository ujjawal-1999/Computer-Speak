//Get all Elements
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const textInput = document.getElementById('text');
const speedInput = document.getElementById('speed');
let currentChar;
//Add all event Listeners

//Play Speech
playButton.addEventListener('click',()=>playText(textInput.value));
//Pause Speech
pauseButton.addEventListener('click',pauseText);
//Stop Speech
stopButton.addEventListener('click',stopText);
//Speed Input
speedInput.addEventListener('input',()=>{
	stopText();
	playText(utterance.text.substring(currentChar));
});

//Functions
const utterance = new SpeechSynthesisUtterance(text);
	utterance.addEventListener('end',()=>{
	textInput.disabled = false;
});
utterance.addEventListener('boundary',()=>{
	currentChar = e.charIndex;		
}); 
//Play Text
function playText(text){
	if(speechSynthesis.paused && speechSynthesis.speaking)
			return speechSynthesis.resume();
	if(speechSynthesis.speaking) return;
	utterance.text = text;
	utterance.rate = speedInput.value || 1;
	textInput.disabled = true;
	speechSynthesis.speak(utterance);
}
//Pause Text
function pauseText(){
	if(speechSynthesis.speaking)
		speechSynthesis.pause();
}
//Stop Text
function stopText(){
	speechSynthesis.resume();
	speechSynthesis.cancel();
}

let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let speakButton = document.getElementById("speakButton");
let pauseButton = document.getElementById("pauseButton");
let resumeButton = document.getElementById("resumeButton");

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, i) => {
        let option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = i;
        voiceSelect.appendChild(option);
    });
}

window.speechSynthesis.onvoiceschanged = populateVoiceList;

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});

speakButton.addEventListener('click', () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Stop the previous speech if it's still speaking
    }
    speech.text = document.querySelector('textarea').value;
    speech.voice = voices[voiceSelect.value];
    window.speechSynthesis.speak(speech);
});

pauseButton.addEventListener('click', () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
    }
});

resumeButton.addEventListener('click', () => {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
});

// Populate the voices list on initial load
populateVoiceList();

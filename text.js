click_to_convert.addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        document.getElementById("convert_text").innerHTML = transcript;
        console.log(transcript);

    });
    
    if (speech == true) {
        recognition.start();
    }

    // Set an interval to check if there's been no speech for a while
        const intervalId = setInterval(function () {
        const currentTime = Date.now();
        const elapsedTime = currentTime - lastResultTimestamp;

        // Adjust the duration (30000 milliseconds = 30 seconds)
        if (elapsedTime > 30000) {
            recognition.stop();
            clearInterval(intervalId);
        }
    }, 1000); // Check every 1 second
 // 10000 milliseconds = 10 seconds

});
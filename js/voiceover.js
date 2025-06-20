// voiceover.js
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('voiceover-text');
    const charCount = document.getElementById('char-count');
    const previewBtn = document.getElementById('preview-btn');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const audioContainer = document.getElementById('audio-container');
    const audioElement = document.getElementById('voiceover-audio');
    
    // Update character count
    textInput.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
    
    // Preview voice sample
    previewBtn.addEventListener('click', function() {
        const selectedVoice = document.querySelector('input[name="voice"]:checked').value;
        const utterance = new SpeechSynthesisUtterance("This is a preview of the selected voice.");
        
        // Set voice properties based on selection
        if (selectedVoice === 'female') {
            utterance.voice = speechSynthesis.getVoices().find(voice => 
                voice.name.includes('Female') || voice.lang.includes('en-US'));
        } else {
            utterance.voice = speechSynthesis.getVoices().find(voice => 
                voice.name.includes('Male') || voice.lang.includes('en-GB'));
        }
        
        speechSynthesis.speak(utterance);
    });
    
    // Generate full voiceover
    generateBtn.addEventListener('click', function() {
        if (!textInput.value.trim()) {
            alert('Please enter some text to generate voiceover');
            return;
        }
        
        // Show ad before generating
        showActionAd(() => {
            const selectedVoice = document.querySelector('input[name="voice"]:checked').value;
            const utterance = new SpeechSynthesisUtterance(textInput.value);
            
            // Set voice properties based on selection
            if (selectedVoice === 'female') {
                utterance.voice = speechSynthesis.getVoices().find(voice => 
                    voice.name.includes('Female') || voice.lang.includes('en-US'));
            } else {
                utterance.voice = speechSynthesis.getVoices().find(voice => 
                    voice.name.includes('Male') || voice.lang.includes('en-GB'));
            }
            
            // For demo purposes, we'll just play it directly
            // In a real app, you'd need a server-side solution to generate downloadable audio
            speechSynthesis.speak(utterance);
            
            // Show audio container (even though we can't actually provide a downloadable file)
            audioContainer.classList.remove('hidden');
            downloadBtn.disabled = false;
            downloadBtn.classList.remove('bg-slate-200', 'dark:bg-slate-600', 'cursor-not-allowed', 'opacity-70');
            downloadBtn.classList.add('bg-green-600', 'hover:bg-green-700', 'text-white');
        });
    });
    
    // Attempt to download (will show ad but won't actually work without server-side processing)
    downloadBtn.addEventListener('click', function() {
        showInterstitialAd();
        alert('For security reasons, browsers don\'t allow direct downloads from speech synthesis. We\'re working on a solution!');
    });
    
    // Load available voices when the page loads
    speechSynthesis.onvoiceschanged = function() {
        const voices = speechSynthesis.getVoices();
        console.log('Available voices:', voices);
    };
    
    // Trigger voiceschanged event if voices aren't loaded yet
    if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', function() {
            const voices = speechSynthesis.getVoices();
            console.log('Available voices:', voices);
        });
    }
});

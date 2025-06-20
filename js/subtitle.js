// subtitle.js
document.addEventListener('DOMContentLoaded', function() {
    const pasteTextBtn = document.getElementById('paste-text-btn');
    const subtitleText = document.getElementById('subtitle-text');
    const videoUpload = document.getElementById('video-upload');
    const generateBtn = document.getElementById('generate-subtitles-btn');
    const subtitlePreview = document.getElementById('subtitle-preview');
    const subtitleTextDisplay = document.getElementById('subtitle-text-display');
    const subtitleActions = document.getElementById('subtitle-actions');
    const subtitleOutput = document.getElementById('subtitle-output');
    const downloadSrtBtn = document.getElementById('download-srt-btn');
    const copySubtitlesBtn = document.getElementById('copy-subtitles-btn');
    const usageLimitAlert = document.getElementById('usage-limit-alert');
    
    // Check usage limit on page load
    checkSubtitleUsage();
    
    // Paste text from clipboard
    pasteTextBtn.addEventListener('click', async function() {
        try {
            const text = await navigator.clipboard.readText();
            subtitleText.value = text;
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            alert('Could not access clipboard. Please paste manually.');
        }
    });
    
    // Handle video upload (simulated)
    videoUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                alert('File is too large. Maximum size is 10MB.');
                e.target.value = ''; // Clear the file input
                return;
            }
            
            // Simulate processing
            showActionAd(() => {
                // In a real app, you would process the video here
                subtitleText.value = "Simulated transcription from video:\n\nThis is a placeholder for text that would be extracted from your video. Actual video processing requires backend integration.";
            });
        }
    });
    
    // Generate subtitles
    generateBtn.addEventListener('click', function() {
        if (!subtitleText.value.trim()) {
            alert('Please enter some text or upload a video');
            return;
        }
        
        // Check usage limit
        if (checkSubtitleUsage()) {
            return;
        }
        
        // Show ad before generating
        showActionAd(() => {
            const selectedStyle = document.querySelector('input[name="subtitle-style"]:checked').value;
            
            // Apply selected style (only default works in free version)
            if (selectedStyle === 'default') {
                subtitleTextDisplay.textContent = subtitleText.value;
                subtitleTextDisplay.className = 'inline-block px-4 py-2 text-white text-lg font-medium bg-black bg-opacity-70 rounded-lg';
            } else {
                // Premium styles are blurred in preview
                subtitleTextDisplay.textContent = subtitleText.value;
                subtitleTextDisplay.className = 'inline-block px-4 py-2 text-white text-lg font-medium bg-black bg-opacity-70 rounded-lg blur-sm';
                alert('Premium subtitle styles require a paid plan. Using default style instead.');
            }
            
            // Show preview and actions
            subtitlePreview.classList.remove('hidden');
            subtitleActions.classList.remove('hidden');
            subtitleOutput.value = subtitleText.value;
            
            // Track usage
            trackToolUsage('subtitle');
        });
    });
    
    // Download SRT (simulated)
    downloadSrtBtn.addEventListener('click', function() {
        showInterstitialAd();
        alert('SRT download is simulated. Actual download requires backend integration.');
    });
    
    // Copy subtitles
    copySubtitlesBtn.addEventListener('click', function() {
        showActionAd(() => {
            navigator.clipboard.writeText(subtitleOutput.value)
                .then(() => {
                    const originalText = copySubtitlesBtn.textContent;
                    copySubtitlesBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copySubtitlesBtn.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    alert('Could not copy text. Please try again.');
                });
        });
    });
    
    // Check subtitle usage limit
    function checkSubtitleUsage() {
        const usageData = JSON.parse(localStorage.getItem('toolUsage') || '{}';
        const subtitleUsage = usageData.subtitle || { count: 0, lastUsed: '' };
        
        // Reset count if it's a new week
        const today = new Date();
        const lastUsedDate = new Date(subtitleUsage.lastUsed);
        const isNewWeek = today.getTime() - lastUsedDate.getTime() > 7 * 24 * 60 * 60 * 1000;
        
        if (isNewWeek) {
            return false;
        }
        
        if (subtitleUsage.count >= 3) {
            usageLimitAlert.classList.remove('hidden');
            generateBtn.disabled = true;
            generateBtn.classList.add('opacity-50', 'cursor-not-allowed');
            return true;
        }
        
        return false;
    }
});

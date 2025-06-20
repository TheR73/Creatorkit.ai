// script.js
document.addEventListener('DOMContentLoaded', function() {
    const nicheSelect = document.getElementById('script-niche');
    const keywordsInput = document.getElementById('script-keywords');
    const generateBtn = document.getElementById('generate-script-btn');
    const scriptResult = document.getElementById('script-result');
    const scriptContent = document.getElementById('script-content');
    const copyScriptBtn = document.getElementById('copy-script-btn');
    const generateAgainBtn = document.getElementById('generate-again-btn');
    
    // Sample scripts for each niche
    const sampleScripts = {
        motivation: [
            `(Upbeat music playing)\n\n[You standing in a gym or outdoor location]\n\n"Stop making excuses! The only thing standing between you and your goals is YOU. \n\nIt's not about having time, it's about MAKING time. \n\nGet up. Show up. Never give up. \n\nYour future self will thank you. 💪\n\n#Motivation #Grind #Success"`,
            `(Inspirational music)\n\n[Close-up of your face]\n\n"They told you it was impossible. They said you couldn't do it. \n\nBut look at you now - still standing, still fighting, still BELIEVING. \n\nNever let anyone dim your light. The world needs what YOU have to offer. \n\nKeep going. ✨\n\n#Believe #DreamBig #Hustle"`
        ],
        funny: [
            `(Funny sound effect)\n\n[You looking confused at camera]\n\n"When you're trying to be productive but your brain is like: \n\n'Remember that embarrassing thing you did in 3rd grade?' \n\nWhy brain, why?! 😫\n\n#Relatable #Funny #BrainBeLike"`,
            `(Suspenseful music)\n\n[You creeping slowly toward fridge at night]\n\n"Me: Just getting a quick snack at 2am... \n\nThe floor: *CREAK* \n\nMe: (freezes) I've made a terrible mistake. \n\nWhy am I like this? 😂\n\n#NightSnacks #QuietAsAMouse #Fail"`
        ],
        horror: [
            `(Creepy music)\n\n[Dark room with flashlight]\n\n"You home alone hear: 'I'm upstairs...' \n\nBut you live in a one-story house. \n\n(Sudden loud noise) \n\nRUN. \n\n#Horror #Scary #Creepy"`,
            `(Eerie silence)\n\n[You looking at phone in bed]\n\n"3:33 AM. You check your phone. \n\nA text from yourself: 'Turn around.' \n\n(Heavy breathing sound) \n\nDon't look. \n\n#HorrorStory #Nightmare #Suspense"`
        ],
        aesthetic: [
            `(Chill lofi music)\n\n[Golden hour footage of you walking]\n\n"Morning routines that feel like therapy: \n\n1. Sunrise walks \n2. Fresh coffee \n3. Journaling \n4. This peaceful moment \n\nBreathe. You're exactly where you need to be. 🌅\n\n#Aesthetic #Vibes #MorningRoutine"`,
            `(Soft piano music)\n\n[Rainy window with coffee cup]\n\n"Cozy autumn days: \n\n- Rain tapping on windows \n- Warm drinks \n- Soft blankets \n- Good books \n\nPure serotonin. 🍂\n\n#AutumnVibes #Cozy #Relaxing"`
        ],
        storytelling: [
            `(Dramatic music)\n\n[You looking serious at camera]\n\n"I promised myself I'd never go back. But here I am, standing outside her house at midnight. \n\nThe last text read: 'We need to talk.' \n\nWas I ready to face my past? (Cut to black) \n\n#Storytime #Drama #Suspense"`,
            `(Nostalgic music)\n\n[Old photos flipping]\n\n"2005. We were just kids with big dreams. \n\n2023. Some made it. Some didn't. \n\nBut that summer? We were invincible. \n\n(Photo of young friends laughing) \n\n#Throwback #Friendship #Memories"`
        ]
    };
    
    // Generate script
    generateBtn.addEventListener('click', function() {
        showActionAd(() => {
            const niche = nicheSelect.value;
            const keywords = keywordsInput.value.trim();
            
            // Get random script for selected niche
            const scripts = sampleScripts[niche];
            const randomScript = scripts[Math.floor(Math.random() * scripts.length)];
            
            // Insert keywords if provided
            let finalScript = randomScript;
            if (keywords) {
                finalScript = randomScript.replace(/\.\n/g, ` about ${keywords}.\n`);
            }
            
            // Display script
            scriptContent.textContent = finalScript;
            scriptResult.classList.remove('hidden');
            
            // Scroll to result
            scriptResult.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Generate again
    generateAgainBtn.addEventListener('click', function() {
        generateBtn.click();
    });
    
    // Copy script
    copyScriptBtn.addEventListener('click', function() {
        showActionAd(() => {
            navigator.clipboard.writeText(scriptContent.textContent)
                .then(() => {
                    const originalHtml = copyScriptBtn.innerHTML;
                    copyScriptBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
                    setTimeout(() => {
                        copyScriptBtn.innerHTML = originalHtml;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    alert('Could not copy text. Please try again.');
                });
        });
    });
});

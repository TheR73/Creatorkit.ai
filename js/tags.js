// tags.js
document.addEventListener('DOMContentLoaded', function() {
    const keywordInput = document.getElementById('tag-keyword');
    const generateBtn = document.getElementById('generate-tags-btn');
    const tagsResult = document.getElementById('tags-result');
    const tagsContainer = document.getElementById('tags-container');
    const copyTagsBtn = document.getElementById('copy-tags-btn');
    const generateMoreBtn = document.getElementById('generate-more-btn');
    
    // Tag database
    const tagDatabase = {
        fitness: [
            '#fitness', '#workout', '#gym', '#fit', '#fitnessmotivation', '#training', '#bodybuilding', '#health', '#exercise', '#fitfam',
            '#gymlife', '#fitspo', '#strong', '#muscle', '#cardio', '#weightloss', '#healthylifestyle', '#personaltrainer', '#noexcuses', '#fitlife'
        ],
        travel: [
            '#travel', '#wanderlust', '#adventure', '#explore', '#vacation', '#travelgram', '#trip', '#travelphotography', '#instatravel', '#passportready',
            '#travelblogger', '#traveling', '#tourist', '#holiday', '#traveladdict', '#traveltheworld', '#travelphoto', '#traveldiaries', '#traveler', '#travelmore'
        ],
        food: [
            '#food', '#foodie', '#foodporn', '#instafood', '#yummy', '#delicious', '#foodphotography', '#foodstagram', '#foodblogger', '#homemade',
            '#cooking', '#eat', '#healthyfood', '#foodlover', '#tasty', '#dessert', '#foodgasm', '#dinner', '#lunch', '#breakfast'
        ],
        fashion: [
            '#fashion', '#style', '#ootd', '#fashionista', '#outfit', '#streetstyle', '#look', '#trendy', '#instafashion', '#clothes',
            '#fashionblogger', '#stylish', '#whatiwore', '#dress', '#shopping', '#luxury', '#beauty', '#moda', '#designer', '#fashionable'
        ],
        photography: [
            '#photography', '#photo', '#pic', '#picture', '#instapic', '#photooftheday', '#picoftheday', '#snapshot', '#instagram', '#art',
            '#beautiful', '#capture', '#moment', '#lens', '#shoot', '#creative', '#visual', '#graphic', '#colors', '#composition'
        ]
    };
    
    // Platform-specific tags
    const platformTags = {
        instagram: ['#instadaily', '#instagram', '#instagood', '#instamood', '#instalike', '#instafollow', '#instaphoto', '#instacool', '#instatag', '#instapic'],
        tiktok: ['#tiktok', '#viral', '#fyp', '#foryou', '#foryoupage', '#trending', '#tiktoker', '#tiktoktrend', '#tiktokchallenge', '#tiktokdance'],
        youtube: ['#youtube', '#youtuber', '#subscribe', '#youtubechannel', '#youtubevideo', '#youtubers', '#youtubecommunity', '#youtubegaming', '#youtubelife', '#youtubemusic']
    };
    
    // Generate tags
    generateBtn.addEventListener('click', function() {
        if (!keywordInput.value.trim()) {
            alert('Please enter a keyword to generate tags');
            return;
        }
        
        showActionAd(() => {
            generateTags();
        });
    });
    
    // Generate more tags
    generateMoreBtn.addEventListener('click', function() {
        showActionAd(() => {
            generateTags();
        });
    });
    
    // Copy all tags
    copyTagsBtn.addEventListener('click', function() {
        showActionAd(() => {
            const tags = Array.from(document.querySelectorAll('.tag-item')).map(tag => tag.textContent).join(' ');
            
            navigator.clipboard.writeText(tags)
                .then(() => {
                    const originalText = copyTagsBtn.innerHTML;
                    copyTagsBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>Copied!';
                    setTimeout(() => {
                        copyTagsBtn.innerHTML = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    alert('Could not copy tags. Please try again.');
                });
        });
    });
    
    // Generate and display tags
    function generateTags() {
        const keyword = keywordInput.value.trim().toLowerCase();
        const platform = document.querySelector('input[name="platform"]:checked').value;
        
        // Clear previous tags
        tagsContainer.innerHTML = '';
        
        // Get base tags based on keyword
        let tags = [];
        
        // Check if keyword matches any category
        for (const category in tagDatabase) {
            if (keyword.includes(category)) {
                tags = [...tags, ...tagDatabase[category]];
            }
        }
        
        // If no specific category matched, use generic tags
        if (tags.length === 0) {
            tags = [
                `#${keyword}`, 
                `#${keyword}life`, 
                `#${keyword}lover`, 
                `#${keyword}addict`, 
                `#${keyword}time`, 
                `#${keyword}gram`, 
                `#${keyword}daily`, 
                `#${keyword}world`, 
                `#my${keyword}`, 
                `#best${keyword}`
            ];
        }
        
        // Add platform-specific tags if not "all"
        if (platform !== 'all') {
            tags = [...tags, ...platformTags[platform]];
        }
        
        // Add some generic popular tags
        tags = [...tags, '#viral', '#trending', '#explorepage', '#likeforlikes', '#followforfollowback'];
        
        // Shuffle and take 15-20 tags
        tags = shuffleArray(tags).slice(0, 15 + Math.floor(Math.random() * 6));
        
        // Display tags
        tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag-item bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full text-sm';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
        
        // Show results
        tagsResult.classList.remove('hidden');
        tagsResult.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Helper function to shuffle array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
});

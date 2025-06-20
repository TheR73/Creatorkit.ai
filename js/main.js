// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
html.classList.add(savedTheme);
localStorage.setItem('theme', savedTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Ad Trigger Functions
function showInterstitialAd() {
    // Show popup ad before performing an action
    try {
        // Adsterra Popunder Ad
        var ppu = "<script type='text/javascript' src='//pl26813431.profitableratecpm.com/5e/c6/52/5ec652b83594fedb0e812f476a87eff2.js'></script>;
        new Function(ppu)();
    } catch (e) {
        console.log("Ad error:", e);
    }
    return true;
}

function showActionAd(actionCallback) {
    // Show ad before performing an action, then execute callback"
    if (Math.random() < 0.7) { // 70% chance to show ad
        showInterstitialAd();
        setTimeout(actionCallback, 1000); // Execute callback after ad
    } else {
        actionCallback(); // Execute callback immediately
    }
}

// Track tool usage
function trackToolUsage(toolName) {
    const today = new Date().toISOString().split('T')[0];
    let usageData = JSON.parse(localStorage.getItem('toolUsage') || '{}');
    
    if (!usageData[toolName]) {
        usageData[toolName] = { count: 0, lastUsed: '' };
    }
    
    // Reset count if it's a new day
    if (usageData[toolName].lastUsed !== today) {
        usageData[toolName].count = 0;
        usageData[toolName].lastUsed = today;
    }
    
    // Increment count
    usageData[toolName].count++;
    localStorage.setItem('toolUsage', JSON.stringify(usageData));
    
    return usageData[toolName].count;
}

// Check if user has reached usage limit for a tool
function checkUsageLimit(toolName, maxLimit) {
    const usageCount = trackToolUsage(toolName);
    return usageCount > maxLimit;
}

// Show usage limit message
function showUsageLimitMessage(toolName, maxLimit, period = 'day') {
    alert(`You've reached the maximum ${maxLimit} ${toolName} uses for this ${period}. Please come back tomorrow!`);
    return false;
}

// Initialize all tool pages
document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('text-indigo-600', 'dark:text-indigo-400');
            link.classList.remove('text-slate-700', 'dark:text-slate-200');
        }
    });
    
    // Initialize tool-specific scripts if they exist
    const pageScripts = {
        'voiceover.html': 'voiceover.js',
        'subtitle.html': 'subtitle.js',
        'script.html': 'script.js',
        'tags.html': 'tags.js'
    };
    
    if (pageScripts[currentPage]) {
        const script = document.createElement('script');
        script.src = `js/${pageScripts[currentPage]}`;
        document.body.appendChild(script);
    }
});

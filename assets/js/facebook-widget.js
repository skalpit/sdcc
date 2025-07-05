// Facebook Widget Enhancement for Southern District Cricket Club

document.addEventListener('DOMContentLoaded', function() {
    
    // Facebook SDK Configuration
    window.fbAsyncInit = function() {
        FB.init({
            appId: 'your-facebook-app-id', // Replace with your Facebook App ID
            cookie: true,
            xfbml: true,
            version: 'v18.0'
        });
        
        // Hide loading spinner once Facebook content loads
        setTimeout(function() {
            const loadingElements = document.querySelectorAll('.fb-loading');
            loadingElements.forEach(function(element) {
                element.style.display = 'none';
            });
        }, 3000);
    };

    // Load Facebook SDK
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); 
        js.id = id;
        js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v18.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Enhanced Facebook page plugin with error handling
    function enhanceFacebookWidget() {
        const fbPageContainer = document.querySelector('.fb-page');
        
        if (fbPageContainer) {
            // Add responsive behavior
            const resizeObserver = new ResizeObserver(function(entries) {
                for (let entry of entries) {
                    if (entry.contentRect.width < 500) {
                        fbPageContainer.setAttribute('data-width', '350');
                        fbPageContainer.setAttribute('data-height', '500');
                    } else {
                        fbPageContainer.setAttribute('data-width', '700');
                        fbPageContainer.setAttribute('data-height', '600');
                    }
                }
            });
            
            resizeObserver.observe(fbPageContainer.parentElement);
            
            // Fallback for failed Facebook load
            setTimeout(function() {
                const fbContent = fbPageContainer.querySelector('iframe');
                if (!fbContent) {
                    showFacebookFallback();
                }
            }, 10000);
        }
    }

    // Show fallback content if Facebook fails to load
    function showFacebookFallback() {
        const fallbackHTML = `
            <div class="facebook-fallback bg-gray-50 p-8 rounded-lg text-center">
                <div class="mb-4">
                    <svg class="w-12 h-12 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-700 mb-2">Facebook Feed Unavailable</h3>
                <p class="text-gray-600 mb-4">Having trouble loading our Facebook feed? Visit our page directly for the latest updates.</p>
                <a href="https://www.facebook.com/SDCCCrocs/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="btn-primary">
                    Visit Facebook Page
                </a>
            </div>
        `;
        
        const fbContainer = document.querySelector('.fb-page');
        if (fbContainer) {
            fbContainer.parentElement.innerHTML = fallbackHTML;
        }
    }

    // Initialize enhanced Facebook widget
    enhanceFacebookWidget();

    // Add smooth scrolling to PlayHQ section
    const playHQLinks = document.querySelectorAll('a[href*="playhq.com"]');
    playHQLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // Responsive iframe handling for PlayHQ
    function makeIframesResponsive() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(iframe) {
            const container = iframe.parentElement;
            if (container) {
                // Add responsive wrapper
                const wrapper = document.createElement('div');
                wrapper.className = 'responsive-iframe-wrapper';
                wrapper.style.position = 'relative';
                wrapper.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
                wrapper.style.height = '0';
                wrapper.style.overflow = 'hidden';
                
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                
                container.insertBefore(wrapper, iframe);
                wrapper.appendChild(iframe);
            }
        });
    }

    // Initialize responsive iframes
    makeIframesResponsive();

    // News ticker effect for recent highlights
    function initNewsTicker() {
        const newsCards = document.querySelectorAll('.news-card');
        let currentIndex = 0;
        
        if (newsCards.length > 1) {
            setInterval(function() {
                newsCards.forEach(function(card, index) {
                    card.style.opacity = index === currentIndex ? '1' : '0.7';
                    card.style.transform = index === currentIndex ? 'scale(1.02)' : 'scale(1)';
                });
                
                currentIndex = (currentIndex + 1) % newsCards.length;
            }, 4000);
        }
    }

    // Initialize news ticker if on fixtures page
    if (window.location.pathname.includes('fixtures')) {
        initNewsTicker();
    }

    // Add loading states for external embeds
    function addLoadingStates() {
        const embeds = document.querySelectorAll('iframe, .fb-page');
        embeds.forEach(function(embed) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'embed-loading flex items-center justify-center p-8';
            loadingDiv.innerHTML = `
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p class="text-gray-500">Loading content...</p>
                </div>
            `;
            
            embed.parentElement.insertBefore(loadingDiv, embed);
            
            // Hide loading state when content loads
            embed.addEventListener('load', function() {
                loadingDiv.style.display = 'none';
            });
            
            // Fallback to hide loading state after timeout
            setTimeout(function() {
                loadingDiv.style.display = 'none';
            }, 8000);
        });
    }

    // Initialize loading states
    addLoadingStates();
});

// Utility functions for Facebook integration
const FacebookUtils = {
    // Refresh Facebook widgets
    refreshFacebookWidgets: function() {
        if (typeof FB !== 'undefined') {
            FB.XFBML.parse();
        }
    },
    
    // Check if Facebook is loaded
    isFacebookLoaded: function() {
        return typeof FB !== 'undefined' && FB.XFBML;
    },
    
    // Handle Facebook load errors
    handleFacebookError: function(callback) {
        setTimeout(function() {
            if (!FacebookUtils.isFacebookLoaded()) {
                callback();
            }
        }, 10000);
    }
};

// Export for potential use in other scripts
window.FacebookUtils = FacebookUtils;
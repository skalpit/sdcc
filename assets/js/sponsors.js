// Sponsors Page Enhancements
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced image error handling with better fallbacks
    const sponsorImages = document.querySelectorAll('img[alt*="Logo"]');
    sponsorImages.forEach(img => {
        img.addEventListener('error', function() {
            // Hide the image
            this.style.display = 'none';
            
            // Show the fallback div
            const fallback = this.nextElementSibling;
            if (fallback) {
                fallback.style.display = 'flex';
                fallback.innerHTML = `
                    <div class="text-center">
                        <div class="w-8 h-8 bg-primary-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <span class="text-xs font-medium text-gray-600">${this.alt.replace(' Logo', '')}</span>
                    </div>
                `;
            }
        });
    });
    
    // Add smooth scroll animation for sponsor sections
    const sponsorSections = document.querySelectorAll('section[class*="page-section"]');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate sponsor cards within the section
                const sponsorCards = entry.target.querySelectorAll('[class*="rounded"]');
                sponsorCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Initially hide sections for animation
    sponsorSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Hide sponsor cards initially
        const sponsorCards = section.querySelectorAll('[class*="rounded"]');
        sponsorCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        sectionObserver.observe(section);
    });
    
    // Add click analytics for sponsor links
    const sponsorLinks = document.querySelectorAll('a[href*="http"]');
    sponsorLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sponsorName = this.closest('[class*="rounded"]')?.querySelector('h3')?.textContent || 'Unknown';
            
            // You can integrate with Google Analytics or other tracking here
            console.log(`Sponsor link clicked: ${sponsorName} - ${this.href}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add hover effects for sponsor cards
    const sponsorCards = document.querySelectorAll('[class*="hover:shadow"]');
    sponsorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Lazy load sponsor images for better performance
    const lazyImages = document.querySelectorAll('img[src*="sponsors"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add search/filter functionality (if needed in future)
    function initSponsorFilter() {
        const searchInput = document.getElementById('sponsor-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const allSponsors = document.querySelectorAll('[class*="sponsor-card"]');
                
                allSponsors.forEach(sponsor => {
                    const sponsorName = sponsor.querySelector('h3')?.textContent.toLowerCase() || '';
                    const sponsorDesc = sponsor.querySelector('p')?.textContent.toLowerCase() || '';
                    
                    if (sponsorName.includes(searchTerm) || sponsorDesc.includes(searchTerm)) {
                        sponsor.style.display = 'block';
                        sponsor.style.opacity = '1';
                    } else {
                        sponsor.style.display = 'none';
                        sponsor.style.opacity = '0.5';
                    }
                });
            });
        }
    }
    
    // Initialize filter if search input exists
    initSponsorFilter();
});

// Utility functions for sponsor management
const SponsorUtils = {
    // Track sponsor interactions
    trackSponsorClick: function(sponsorName, sponsorTier, url) {
        // Integration with analytics services
        if (window.gtag) {
            gtag('event', 'sponsor_click', {
                'sponsor_name': sponsorName,
                'sponsor_tier': sponsorTier,
                'sponsor_url': url
            });
        }
    },
    
    // Check if sponsor links are working
    validateSponsorLinks: function() {
        const links = document.querySelectorAll('a[href*="http"]');
        links.forEach(link => {
            fetch(link.href, { mode: 'no-cors' })
                .catch(() => {
                    console.warn(`Sponsor link may be broken: ${link.href}`);
                    link.style.opacity = '0.6';
                    link.title = 'Link may not be working';
                });
        });
    }
};

// Export utilities for potential use
window.SponsorUtils = SponsorUtils;
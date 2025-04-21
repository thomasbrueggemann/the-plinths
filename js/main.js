document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile navigation - completely remove nav arrows on mobile
    function handleMobileNavigation() {
        const prevButton = document.getElementById('prevSection');
        const nextButton = document.getElementById('nextSection');
        
        if (window.innerWidth <= 768) {
            // On mobile, remove the navigation arrows completely
            if (prevButton) prevButton.parentNode.removeChild(prevButton);
            if (nextButton) nextButton.parentNode.removeChild(nextButton);
        }
    }
    
    // Run on page load
    handleMobileNavigation();
    
    // Run on resize
    window.addEventListener('resize', handleMobileNavigation);
    
    // Video functionality
    const video = document.getElementById('mainVideo');
    
    // Enable vertical scrolling for photos section
    const photosSection = document.getElementById('photos');
    if (photosSection) {
        photosSection.style.overflowY = 'auto';
        
        // Prevent horizontal scroll container from capturing wheel events in photos section
        photosSection.addEventListener('wheel', function(e) {
            // Allow vertical scrolling within the photos section
            const isAtTop = this.scrollTop === 0;
            const isAtBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
            
            // Only prevent default if we're not at the top/bottom or if scrolling in the appropriate direction
            if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
                e.stopPropagation();
            }
        });
    }
    
    // Band member carousel functionality
    const bandMembers = [
        {
            name: "Jack Plinth",
            role: "Lead vocals and guitar, Jack founded The Plinths in 2019 after leaving his previous band. His distinctive voice and energetic stage presence have become the signature sound of the band."
        },
        {
            name: "Emma Stone",
            role: "Bass and backing vocals, Emma joined the band in 2020 and has been essential to creating The Plinths' unique rhythm section. Her background in jazz brings a distinctive flair to their sound."
        },
        {
            name: "Mike Rhythm",
            role: "Drums and percussion, Mike is the heartbeat of The Plinths. His innovative drumming style and technical precision have helped shape the band's high-energy performances."
        }
    ];
    
    const memberDots = document.querySelectorAll('.member-nav-dot');
    const memberPortraits = document.querySelectorAll('.band-member-portrait');
    const memberInfo = document.querySelector('.band-member-info');
    
    memberDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const memberIndex = parseInt(dot.getAttribute('data-member'));
            
            // Update active dot
            document.querySelector('.member-nav-dot.active').classList.remove('active');
            dot.classList.add('active');
            
            // Update portrait
            document.querySelector('.band-member-portrait.active').classList.remove('active');
            memberPortraits[memberIndex].classList.add('active');
            
            // Update info
            memberInfo.innerHTML = `
                <h3>${bandMembers[memberIndex].name}</h3>
                <p>${bandMembers[memberIndex].role}</p>
            `;
        });
    });
    
    // Auto rotate band members every 5 seconds
    let currentMember = 0;
    setInterval(() => {
        currentMember = (currentMember + 1) % 3;
        memberDots[currentMember].click();
    }, 5000);
    
    // Photo grid functionality
    const photoItems = document.querySelectorAll('.photo-item');
    const photoModal = document.querySelector('.photo-modal');
    const modalImg = document.querySelector('.photo-modal-content img');
    const closeModal = document.querySelector('.close-modal');
    
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImg.src = imgSrc;
            photoModal.classList.add('active');
        });
    });
    
    closeModal.addEventListener('click', () => {
        photoModal.classList.remove('active');
    });
    
    // Close modal when clicking outside the image
    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            photoModal.classList.remove('active');
        }
    });
    
    // Horizontal scroll functionality
    const scrollContainer = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    const prevButton = document.getElementById('prevSection');
    const nextButton = document.getElementById('nextSection');
    const sectionNames = {
        'home': 'Home',
        'about': 'Band',
        'photos': 'Photos'
    };
    
    // Function to update navigation arrows and hints
    function updateNavigationArrows() {
        const currentIndex = getCurrentSectionIndex();
        
        // Update left arrow
        if (currentIndex > 0) {
            prevButton.style.display = 'flex';
            const prevSection = sections[currentIndex - 1];
            const prevSectionId = prevSection.getAttribute('id');
            prevButton.querySelector('.nav-hint').textContent = sectionNames[prevSectionId] || prevSectionId;
        } else {
            prevButton.style.display = 'none';
        }
        
        // Update right arrow
        if (currentIndex < sections.length - 1) {
            nextButton.style.display = 'flex';
            const nextSection = sections[currentIndex + 1];
            const nextSectionId = nextSection.getAttribute('id');
            nextButton.querySelector('.nav-hint').textContent = sectionNames[nextSectionId] || nextSectionId;
        } else {
            nextButton.style.display = 'none';
        }
    }
    
    // Function to get current section index
    function getCurrentSectionIndex() {
        const scrollPosition = scrollContainer.scrollLeft;
        const viewportWidth = window.innerWidth;
        return Math.round(scrollPosition / viewportWidth);
    }
    
    // Navigation dots click event
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionId = dot.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            targetSection.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        });
    });
    
    // Navigation arrow click events
    prevButton.addEventListener('click', () => {
        const currentIndex = getCurrentSectionIndex();
        if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
    });
    
    nextButton.addEventListener('click', () => {
        const currentIndex = getCurrentSectionIndex();
        if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
    });
    
    // Update active nav dot based on scroll position
    function updateNavDots() {
        let currentSectionId = '';
        const scrollPosition = scrollContainer.scrollLeft;
        const viewportWidth = window.innerWidth;
        const currentIndex = Math.round(scrollPosition / viewportWidth);
        
        if (sections[currentIndex]) {
            currentSectionId = sections[currentIndex].getAttribute('id');
        }
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSectionId) {
                dot.classList.add('active');
            }
        });
        
        // Update navigation arrows whenever active section changes
        updateNavigationArrows();
    }
    
    // Handle scroll events and snap to sections
    let isScrolling = false;
    let lastScrollTime = Date.now();
    const scrollDelay = 1000; // Delay in ms before accepting another scroll
    
    scrollContainer.addEventListener('scroll', () => {
        // Update nav dots on any scroll
        updateNavDots();
        
        // Only handle scroll snapping if not currently scrolling
        if (!isScrolling) {
            const now = Date.now();
            if (now - lastScrollTime > scrollDelay) {
                lastScrollTime = now;
            }
        }
    });
    
    // Mouse wheel navigation has been disabled as requested
    // Navigation is now only available through nav dots and arrow buttons
    
    // Initialize the active nav dot
    updateNavDots();
    
    // Mobile touch support for scrolling between sections
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;
    
    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    scrollContainer.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        
        touchEndY = e.changedTouches[0].screenY;
        const distance = touchStartY - touchEndY;
        
        if (Math.abs(distance) < minSwipeDistance) return;
        
        const now = Date.now();
        if (now - lastScrollTime < scrollDelay) return;
        
        lastScrollTime = now;
        isScrolling = true;
        
        let targetSection;
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        if (distance > 0) {
            // Swipe up (scroll down)
            targetSection = currentSection.nextElementSibling;
        } else {
            // Swipe down (scroll up)
            targetSection = currentSection.previousElementSibling;
        }
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                isScrolling = false;
            }, 750);
        } else {
            isScrolling = false;
        }
    }, { passive: true });
});

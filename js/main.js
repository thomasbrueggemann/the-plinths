document.addEventListener('DOMContentLoaded', function() {
    // Video functionality
    const video = document.getElementById('mainVideo');
    
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
    const photoCopyright = document.querySelector('.photo-copyright');
    const closeModal = document.querySelector('.close-modal');
    
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const copyright = item.getAttribute('data-copyright');
            
            modalImg.src = imgSrc;
            
            // Show copyright text if it exists
            if (copyright) {
                photoCopyright.textContent = copyright;
                photoCopyright.style.display = 'block';
            } else {
                photoCopyright.style.display = 'none';
            }
            
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
});

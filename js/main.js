document.addEventListener('DOMContentLoaded', function () {
  // sticky nav state
  const nav = document.getElementById('nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // click-to-play YouTube (avoid autoplay + sandboxed iframe issues)
  const poster = document.getElementById('videoPoster');
  const frame = document.getElementById('videoFrame');
  if (poster && frame) {
    poster.addEventListener('click', () => {
      frame.src = 'https://www.youtube.com/embed/Z06eoUzI-Hk?autoplay=1&rel=0';
      poster.classList.add('hidden');
    });
  }

  // newsletter (fake submit)
  const form = document.getElementById('signupForm');
  const confirm = document.getElementById('signupConfirm');
  if (form && confirm) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      confirm.classList.add('show');
      form.querySelector('input').value = '';
    });
  }

  // smooth scroll with nav offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 60,
        behavior: 'smooth',
      });
    });
  });

  // photo modal
  const photoItems = document.querySelectorAll('.photo-item');
  const photoModal = document.querySelector('.photo-modal');
  const modalImg = document.querySelector('.photo-modal-content img');
  const photoCopyright = document.querySelector('.photo-copyright');
  const closeModal = document.querySelector('.close-modal');

  if (photoModal && modalImg && closeModal) {
    photoItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        modalImg.src = img.src;
        const copyright = item.getAttribute('data-copyright');
        if (copyright) {
          photoCopyright.textContent = copyright;
          photoCopyright.style.display = 'block';
        } else {
          photoCopyright.style.display = 'none';
        }
        photoModal.classList.add('active');
      });
    });

    closeModal.addEventListener('click', () => photoModal.classList.remove('active'));
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) photoModal.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') photoModal.classList.remove('active');
    });
  }
});

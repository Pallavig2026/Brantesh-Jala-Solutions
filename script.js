const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = '1';
    const target = Number(entry.target.dataset.count);
    let current = 0;
    const duration = 1100, start = performance.now();
    const tick = now => {
      const p = Math.min((now-start)/duration,1);
      current = Math.floor((1-Math.pow(1-p,3))*target);
      entry.target.textContent = current + (target < 100 ? '+' : '');
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
},{threshold:.7});
counters.forEach(el=>counterObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('quoteForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  status.textContent = 'Thank you. Your enquiry has been captured in this demo.';
  form.reset();
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20 ? '0 8px 30px rgba(5,40,55,.08)' : 'none';
});

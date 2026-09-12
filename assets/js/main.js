'use strict';
const menu = document.getElementById('nav-menu');
const toggle = document.getElementById('nav-toggle');
const close = document.getElementById('nav-close');
function setMenu(open, restoreFocus = false) {
  menu.classList.toggle('show-menu', open);
  toggle.setAttribute('aria-expanded', String(open));
  if (open) menu.querySelector('a').focus();
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('show-menu')));
close.addEventListener('click', () => setMenu(false, true));
document.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('show-menu')) setMenu(false, true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) setMenu(false);
});
const mobileQuery = window.matchMedia('(max-width: 700px)');
mobileQuery.addEventListener('change', () => setMenu(false));
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav__link')];
function updateScroll() {
  document.getElementById('header').classList.toggle('shadow-header', window.scrollY > 50);
  document.getElementById('scroll-up').classList.toggle('show-scroll', window.scrollY > 350);
  let current = 'home';
  sections.forEach(section => { if (section.getBoundingClientRect().top <= 150) current = section.id; });
  links.forEach(link => {
    const active = link.getAttribute('href') === '#' + current;
    link.classList.toggle('active-link', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();
const form = document.getElementById('contact-form');
const message = document.getElementById('contact-message');
const submit = form.querySelector('button[type="submit"]');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submit.disabled) return;
  submit.disabled = true;
  message.textContent = 'Sending your message…';
  try {
    if (!window.emailjs) throw new Error('Email service unavailable');
    await window.emailjs.sendForm('service_58bqrxa', 'template_65aef5k', form, 'lzWaFVaV2x1PImQz4');
    message.textContent = 'Thank you! Your message has been sent.';
    form.reset();
  } catch (error) {
    message.textContent = 'Your message could not be sent. Please try again, or contact me on LinkedIn.';
  } finally {
    submit.disabled = false;
  }
});

/* ============================================================
   ESTCOURT WASTE COLLECTORS — script.js
   Shared interactive behaviour across all pages
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Nav Toggle ─────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── Contact Form (EmailJS) ────────────────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    const btn  = form.querySelector('.form-submit');
    const msg  = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      btn.disabled = true;
      btn.textContent = 'Sending…';

      const data = {
        from_name:  form.querySelector('[name="name"]').value,
        from_email: form.querySelector('[name="email"]').value,
        phone:      form.querySelector('[name="phone"]')?.value || '',
        subject:    form.querySelector('[name="subject"]')?.value || 'Website Enquiry',
        message:    form.querySelector('[name="message"]').value,
        to_email:   'estcourtwaste@gmail.com'
      };

      try {
        // EmailJS send — replace with your own Service ID, Template ID, Public Key
        await emailjs.send(
          'service_84mbqzb',
          'template_qst3raa',
          data,
          'O7zXi6ExJZ1hlYPfZ'
        );

        msg.textContent = '✅ Thank you! We\'ll be in touch shortly.';
        msg.className = 'form-msg success';
        form.reset();
      } catch (err) {
        // Fallback: open mailto link so message is never lost
        const body = `Name: ${data.from_name}\nPhone: ${data.phone}\n\n${data.message}`;
        window.location.href =
          `mailto:estcourtwaste@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;

        msg.textContent = '📧 Your email client has opened — please send the email to reach us.';
        msg.className = 'form-msg info';
      } finally {
        btn.disabled = false;
        btn.textContent = 'Send Message';
      }
    });
  }

  /* ── Intersection-observer fade-in ─────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });

  /* ── Animated counters ──────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const end   = parseInt(el.dataset.count, 10);
        const dur   = 1800;
        const step  = end / (dur / 16);
        let current = 0;
        const tick  = () => {
          current += step;
          if (current >= end) {
            el.textContent = end.toLocaleString() + (el.dataset.suffix || '');
          } else {
            el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => countObs.observe(c));
  }

  /* ── Sticky nav shadow on scroll ───────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 18px rgba(0,0,0,.12)'
        : '0 2px 12px rgba(0,0,0,.07)';
    });
  }

});
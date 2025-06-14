const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetTab = link.getAttribute('data-tab');

    // remove all active states
    tabLinks.forEach(l => l.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // set active on clicked tab and corresponding content
    link.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetTab = link.getAttribute('data-tab');

    tabLinks.forEach(l => l.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    link.classList.add('active');
    document.getElementById(targetTab).classList.add('active');

    if (targetTab === 'clips') {
      loadRaidClips();
    }
  });
});

function loadRaidClips() {
  const container = document.getElementById('clips-container');
  container.innerHTML = '';

  fetch('raids.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(raid => {
        const card = document.createElement('div');
        card.className = 'clip-card';
        card.innerHTML = `
          <h3>${raid.title}</h3>
          <div class="clip-video">
            <iframe 
              src="${raid.video}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = '<p>Failed to load clips.</p>';
      console.error(err);
    });
}

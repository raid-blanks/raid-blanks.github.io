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

const raids = [
  { server: "Foresaken Wiki Discord", date: "June 12, 2025", reason: "Being Weird trolls" }
];

const raidsContainer = document.getElementById("raids-container");

raids.forEach(raid => {
  const card = document.createElement("div");
  card.className = "raid-card";
  card.innerHTML = `
    <h3>${raid.server}</h3>
    <p><strong>Date:</strong> ${raid.date}</p>
    <p><strong>Reason:</strong> ${raid.reason}</p>
  `;
  raidsContainer.appendChild(card);
});

function createGalaxyStar() {
  const star = document.createElement("div");
  star.className = "galaxy-star";

  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.opacity = Math.random() * 0.8 + 0.2;
  star.style.animationDuration = (30 + Math.random() * 60) + "s";

  document.getElementById("background-anim").appendChild(star);
}

for (let i = 0; i < 150; i++) {
  createGalaxyStar();
}


// Generate one every 500ms
setInterval(createShootingStar, 500);

function loadRaidClips() {
  const container = document.getElementById('clips-container');
  container.innerHTML = '';

  fetch('raids.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(raid => {
        const card = document.createElement('div');
        card.className = 'clip-card';

        // Convert YouTube watch link to embed link
        let embedUrl = raid.video;
        if (embedUrl.includes("youtube.com/watch?v=")) {
          embedUrl = embedUrl.replace("watch?v=", "embed/");
        }

        card.innerHTML = `
          <h3>${raid.title}</h3>
          <div class="clip-video">
            <iframe 
              src="${embedUrl}" 
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

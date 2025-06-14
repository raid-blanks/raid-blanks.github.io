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
  { server: "Foresaken Wiki Discord", date: "June 14, 2025", reason: "Being Assholes" }
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

function createShootingStar() {
  const star = document.createElement("div");
  star.className = "shooting-star";

  // Random horizontal start position (anywhere in viewport width)
  star.style.left = Math.random() * window.innerWidth + "px";

  // Random vertical start offset to vary starting heights
  star.style.top = Math.random() * -300 + "px";

  // Random delay to stagger appearances
  star.style.animationDelay = Math.random() * 3 + "s";

  document.getElementById("background-anim").appendChild(star);

  // Remove after animation completes to keep DOM clean
  setTimeout(() => {
    star.remove();
  }, 3000);
}

// Generate a new shooting star every 600ms
setInterval(createShootingStar, 600);

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

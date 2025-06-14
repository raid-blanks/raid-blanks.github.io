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

const plans = document.querySelectorAll('.btn-purchase[data-plan]');
const checkout = document.getElementById('checkout');
const success = document.getElementById('success');
const planText = document.getElementById('selected-plan-text').querySelector('strong');
const walletAddress = document.getElementById('wallet-address');
const paymentMethod = document.getElementById('payment-method');

const addresses = {
  btc: 'bc1qx4y4p9zn6u8kfny86wzysrdcx3chrjen085s32',
  eth: '0xc0660Dc9748f6Da7Fe040dd32B9FDe8D4e213EB8',
  ltc: 'LhonVVs88dRzjf3ZvAMTTGMvGveS9vsuBQ'
};

plans.forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.getAttribute('data-plan');
    planText.textContent = plan;
    document.querySelectorAll('.tab-content').forEach(sec => sec.style.display = 'none');
    checkout.style.display = 'block';
  });
});

paymentMethod.addEventListener('change', (e) => {
  walletAddress.textContent = addresses[e.target.value];
});

// Initial address on load
walletAddress.textContent = addresses[paymentMethod.value];

document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  checkout.style.display = 'none';
  success.style.display = 'block';
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

  // Position star inside viewport minus max drift distance
  const maxXDrift = 100;
  const maxYDrift = 200;

  star.style.left = Math.random() * (window.innerWidth - maxXDrift) + "px";
  star.style.top = Math.random() * (window.innerHeight - maxYDrift) + "px";
  star.style.opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
  star.style.animationDuration = (30 + Math.random() * 60) + "s";

  document.getElementById("background-anim").appendChild(star);
}

for (let i = 0; i < 150; i++) {
  createGalaxyStar();
}

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

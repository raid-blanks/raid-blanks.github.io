function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
}

// Add dynamic announcements
const announcements = [
  "🚨 Private tool beta launching soon.",
  "💣 Big raid drop Friday night."
];

const list = document.getElementById("announcement-list");
announcements.forEach(msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  list.appendChild(li);
});

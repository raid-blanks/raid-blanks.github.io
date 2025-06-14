function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
}

// Sample dynamic announcements
const announcements = [
  "🚨 Raid wave dropping Friday 8PM EST.",
  "💾 New stealth modules in testing phase.",
  "📦 Token packs launching soon."
];

const list = document.getElementById("announcement-list");
announcements.forEach(msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  list.appendChild(li);
});

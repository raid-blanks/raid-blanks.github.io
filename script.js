// Dynamically add new announcements
const announcements = [
  "🚨 Private tool beta launching soon.",
  "💣 Expect another big raid drop on Friday night."
];

const list = document.getElementById("announcement-list");
announcements.forEach(msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  list.appendChild(li);
});

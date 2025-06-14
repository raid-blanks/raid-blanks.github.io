// Example: fetch or add announcements dynamically
const announcements = [
  "🚨 New private raid tool update coming soon.",
  "💣 Expect a big drop on Friday."
];

const list = document.getElementById("announcement-list");
announcements.forEach(msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  list.appendChild(li);
});

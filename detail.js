// ================= CONFIG =================
const API_URL = "https://api.jsonbin.io/v3/b/6a200c9fda38895dfe806f50/latest";
const API_KEY = "$2a$10$KW.JD1hnvj8/0rP/GbVIv.B78rQhrPAvACzs74o7ysp/g.LVbLBM2";

// ================= GET ID =================
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// ================= INIT =================
document.addEventListener("DOMContentLoaded", loadDetail);

// ================= LOAD DETAIL =================
async function loadDetail() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });

    const data = await res.json();
    const posts = data?.record?.posts;

    if (!posts) {
      console.error("Posts tidak ditemukan");
      return;
    }

    const post = posts.find(p => p.id == id);

    if (!post) {
      document.getElementById("detail-container").innerHTML = "<p>Berita tidak ditemukan</p>";
      return;
    }

    renderDetail(post);
    loadPopular(posts, id);

  } catch (err) {
    console.error("ERROR:", err);
  }
}

// ================= RENDER DETAIL (FIX UTAMA) =================
function renderDetail(post) {
  const container = document.getElementById("detail-container");

  container.innerHTML = `
    <span class="detail-category">${post.category}</span>

    <h1 class="detail-title">${post.title}</h1>

    <div class="detail-meta">
      Dipublish • ${post.date || "rekbertokogame.pro"}
    </div>

    <div class="detail-image">
      <img src="${post.image}" alt="${post.title}">
    </div>

    <div class="detail-content">
      ${post.content || `<p>${post.description}</p>`}
    </div>
  `;
}

// ================= POPULAR =================
function loadPopular(posts, currentId) {
  const container = document.getElementById("popular-container");

  if (!container) return;

  const filtered = posts.filter(p => p.id != currentId);

  const popular = filtered.slice(0, 5);

  container.innerHTML = popular.map(post => `
    <a href="detail.html?id=${post.id}" class="popular-item">
      <img src="${post.image}" alt="">
      <div>
        <h4>${post.title}</h4>
        <span>${post.category}</span>
      </div>
    </a>
  `).join("");
}
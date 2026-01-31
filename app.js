// API URL
const API_URL = "https://api.escuelajs.co/api/v1/products";

// State management
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let pageSize = 10;

// DOM Elements
const searchInput = document.getElementById("searchInput");
const productTableBody = document.getElementById("productTableBody");
const pageSizeSelect = document.getElementById("pageSize");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumbers = document.getElementById("pageNumbers");
const paginationInfo = document.getElementById("paginationInfo");

// Sort buttons
const sortPriceAsc = document.getElementById("sortPriceAsc");
const sortPriceDesc = document.getElementById("sortPriceDesc");
const sortNameAsc = document.getElementById("sortNameAsc");
const sortNameDesc = document.getElementById("sortNameDesc");

// Fetch all products from API
async function getAll() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    allProducts = data;
    filteredProducts = [...allProducts];
    renderProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    productTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="loading" style="color: red;">
                    ❌ Lỗi khi tải dữ liệu. Vui lòng thử lại sau.
                </td>
            </tr>
        `;
  }
}

// Search functionality
function searchProducts(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  if (term === "") {
    filteredProducts = [...allProducts];
  } else {
    filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(term),
    );
  }
  currentPage = 1;
  renderProducts();
}

// Sort functions
function sortByPriceAscending() {
  filteredProducts.sort((a, b) => a.price - b.price);
  currentPage = 1;
  renderProducts();
}

function sortByPriceDescending() {
  filteredProducts.sort((a, b) => b.price - a.price);
  currentPage = 1;
  renderProducts();
}

function sortByNameAscending() {
  filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  currentPage = 1;
  renderProducts();
}

function sortByNameDescending() {
  filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  currentPage = 1;
  renderProducts();
}

// Pagination functions
function getTotalPages() {
  return Math.ceil(filteredProducts.length / pageSize);
}

function getPaginatedProducts() {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return filteredProducts.slice(startIndex, endIndex);
}

function updatePaginationInfo() {
  const totalProducts = filteredProducts.length;
  const startIndex = totalProducts === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalProducts);

  paginationInfo.textContent = `Hiển thị ${startIndex} - ${endIndex} của ${totalProducts} sản phẩm`;
}

function renderPageNumbers() {
  const totalPages = getTotalPages();
  pageNumbers.innerHTML = "";

  // Show max 5 page numbers
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("div");
    pageBtn.className = "page-number";
    if (i === currentPage) {
      pageBtn.classList.add("active");
    }
    pageBtn.textContent = i;
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderProducts();
    });
    pageNumbers.appendChild(pageBtn);
  }
}

function updatePaginationButtons() {
  const totalPages = getTotalPages();
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Main render function
function renderProducts() {
  const paginatedProducts = getPaginatedProducts();

  if (paginatedProducts.length === 0) {
    productTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="loading">
                    ${
                      filteredProducts.length === 0 && allProducts.length > 0
                        ? "🔍 Không tìm thấy sản phẩm nào."
                        : "📦 Chưa có sản phẩm nào."
                    }
                </td>
            </tr>
        `;
  } else {
    productTableBody.innerHTML = paginatedProducts
      .map(
        (product) => `
            <tr>
                <td>${product.id}</td>
                <td>
                    <img src="${product.images[0]}" 
                         alt="${product.title}" 
                         class="product-image"
                         onerror="this.src='https://via.placeholder.com/100?text=No+Image'">
                </td>
                <td>${product.title}</td>
                <td class="price">$${product.price}</td>
                <td><span class="category">${product.category.name}</span></td>
                <td>${product.description.substring(0, 100)}...</td>
            </tr>
        `,
      )
      .join("");
  }

  updatePaginationInfo();
  renderPageNumbers();
  updatePaginationButtons();
}

// Event listeners
searchInput.addEventListener("input", (e) => {
  searchProducts(e.target.value);
});

pageSizeSelect.addEventListener("change", (e) => {
  pageSize = parseInt(e.target.value);
  currentPage = 1;
  renderProducts();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = getTotalPages();
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts();
  }
});

sortPriceAsc.addEventListener("click", sortByPriceAscending);
sortPriceDesc.addEventListener("click", sortByPriceDescending);
sortNameAsc.addEventListener("click", sortByNameAscending);
sortNameDesc.addEventListener("click", sortByNameDescending);

// Initialize the application
getAll();

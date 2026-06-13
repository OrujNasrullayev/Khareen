const API_URL = 'http://127.0.0.1:1111';

const appContent = document.getElementById('app-content');
const navHome = document.getElementById('nav-home');
const navCollection = document.getElementById('nav-collection');
const navAbout = document.getElementById('nav-about');
const navContact = document.getElementById('nav-contact');
const navLogo = document.getElementById('nav-logo');

// Global variable for Admin modal editing state
let editingItemId = null;

// Helper to build headers for authorized admin requests
function getAuthHeaders() {
    const token = sessionStorage.getItem('admin_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Router function to handle hash-based navigation
function handleRouting() {
    const hash = window.location.hash;
    if (hash === '#admin') {
        const token = sessionStorage.getItem('admin_token');
        if (token) {
            renderAdmin();
        } else {
            renderLogin();
        }
    } else {
        ensureSinglePageLayout();
        
        const targetId = (hash && hash !== '#home') ? hash.substring(1) : 'home';
        if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        updateActiveNavbar(targetId);
    }
}

function ensureSinglePageLayout() {
    if (document.getElementById('home')) {
        return; // Already rendered!
    }

    appContent.innerHTML = `
        <!-- Floating decorative background blobs for rich aesthetic -->
        <div class="background-blobs">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>
        
        <!-- Hero / Home Section -->
        <section id="home" class="hero-section reveal-slide-up">
            <div class="hero-content">
                <span class="hero-tag">Premium Event Dress Rentals</span>
                <h1 class="hero-title">Elevate Your Style.<br>Rent the <span class="gradient-text">Extraordinary</span>.</h1>
                <p class="hero-subtitle">Access curated designer gowns and runway-ready event dresses for a fraction of the retail price. Sustainable luxury tailored for your most memorable moments.</p>
                <div class="hero-actions">
                    <a href="#collection" class="btn-primary">Browse Collection</a>
                    <a href="#about" class="btn-secondary">Our Story</a>
                </div>
            </div>
            
            <div class="hero-image-container">
                <div class="hero-image-card"></div>
            </div>
        </section>

        <!-- Collection Section -->
        <section id="collection" class="scroll-section reveal-slide-left">
            <h2 class="section-title text-center">Our Collection</h2>
            <p class="section-subtitle text-center">Premium clothing available for rent.</p>
            <div class="collection-slider-wrapper">
                <button class="slider-btn prev-btn" id="sliderPrevBtn" aria-label="Previous dress">←</button>
                <div class="slider-track-container" id="sliderTrackContainer">
                    <div class="slider-track" id="items-grid">
                        <p>Loading items...</p>
                    </div>
                </div>
                <button class="slider-btn next-btn" id="sliderNextBtn" aria-label="Next dress">→</button>
            </div>
        </section>

        <!-- About Us Section -->
        <section id="about" class="scroll-section reveal-zoom-in">
            <h2 class="section-title text-center">About Us</h2>
            <div class="about-text">
                <p>Welcome to LuminaRent. We believe in sustainable fashion and looking your best without breaking the bank. Our curated collection of premium clothing is available for you to rent for any occasion.</p>
                <br>
                <p>Our mission is to build trust through quality service, transparent pricing, and an ever-expanding wardrobe that you can call your own.</p>
            </div>
        </section>

        <!-- Contact Us Section -->
        <section id="contact" class="scroll-section reveal-slide-right">
            <h2 class="section-title text-center">Contact Us</h2>
            <p class="section-subtitle text-center">We'd love to hear from you.</p>
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea id="message" rows="5" required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
            <p id="formStatus" style="text-align:center; margin-top:1rem; color:#818cf8;"></p>
        </section>
    `;

    loadCollectionItems();
    bindContactFormListener();
    setupScrollObserver();
    setupRevealObserver();
    setupSliderControls();
}

function loadCollectionItems() {
    const grid = document.getElementById('items-grid');
    if (!grid) return;
    
    fetch(`${API_URL}/items/`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                grid.innerHTML = '<p>No items available right now. Check back later!</p>';
                return;
            }
            grid.innerHTML = data.map(item => `
                <div class="card">
                    <div class="card-img" style="background-image: url('${item.image_url || ''}'); background-size: cover; background-position: center;"></div>
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-desc">${item.description}</p>
                    <p class="card-price">$${item.price} / day</p>
                </div>
            `).join('');
        })
        .catch(err => {
            grid.innerHTML = '<p>Error loading items.</p>';
            console.error(err);
        });
}

function bindContactFormListener() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        fetch(`${API_URL}/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(res => res.json())
        .then(() => {
            document.getElementById('formStatus').innerText = 'Message sent successfully!';
            form.reset();
        })
        .catch(err => {
            document.getElementById('formStatus').innerText = 'Failed to send message.';
            console.error(err);
        });
    });
}

function setupSliderControls() {
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');
    const container = document.getElementById('sliderTrackContainer');
    
    if (!prevBtn || !nextBtn || !container) return;
    
    prevBtn.addEventListener('click', () => {
        const cardWidth = container.querySelector('.card')?.offsetWidth || 300;
        const scrollAmount = cardWidth + 32; // card width + gap
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        const cardWidth = container.querySelector('.card')?.offsetWidth || 300;
        const scrollAmount = cardWidth + 32; // card width + gap
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

function updateActiveNavbar(activeId) {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const id = link.getAttribute('id');
        if (id === `nav-${activeId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

let observer = null;
function setupScrollObserver() {
    if (observer) observer.disconnect();
    
    const sections = document.querySelectorAll('#home, #collection, #about, #contact');
    const options = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };
    
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNavbar(id);
                if (window.location.hash !== `#${id}`) {
                    history.replaceState(null, null, `#${id}`);
                }
            }
        });
    }, options);
    
    sections.forEach(section => observer.observe(section));
}

let revealObserver = null;
function setupRevealObserver() {
    if (revealObserver) revealObserver.disconnect();

    const options = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, options);

    const animatedElements = document.querySelectorAll('.reveal-slide-up, .reveal-slide-left, .reveal-zoom-in, .reveal-slide-right');
    animatedElements.forEach(el => revealObserver.observe(el));
}

function renderLogin() {
    appContent.innerHTML = `
        <div class="admin-login-wrapper">
            <div class="login-card">
                <div class="login-icon">🔐</div>
                <h1 class="page-title" style="font-size: 1.8rem; margin-bottom: 0.5rem;">Admin Access</h1>
                <p class="page-subtitle" style="margin-bottom: 2rem; font-size: 1rem;">Enter your credentials to continue</p>
                <form id="loginForm">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" id="login-username" required autocomplete="username" placeholder="admin">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="login-password" required autocomplete="current-password" placeholder="••••••••">
                    </div>
                    <button type="submit" style="margin-top: 0.5rem;">Log In</button>
                    <p id="loginError" style="color: #ef4444; margin-top: 1rem; text-align: center; font-weight: 600;"></p>
                </form>
            </div>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const loginError = document.getElementById('loginError');

        fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) throw new Error("Incorrect credentials");
            return res.json();
        })
        .then(data => {
            sessionStorage.setItem('admin_token', data.token);
            handleRouting();
        })
        .catch(err => {
            loginError.innerText = err.message;
        });
    });
}

function renderAdmin() {
    appContent.innerHTML = `
        <h1 class="page-title">Admin Dashboard</h1>
        
        <div class="admin-tabs">
            <button class="admin-tab-btn active" id="tab-btn-items">Manage Collection</button>
            <button class="admin-tab-btn" id="tab-btn-messages">Contact Messages</button>
        </div>

        <!-- Manage Collection Section -->
        <div class="admin-section active" id="sec-items">
            <div class="admin-container">
                <div class="admin-header">
                    <h2>Collection Items</h2>
                    <div style="display: flex; gap: 1rem;">
                        <button class="admin-btn" id="btn-add-item">Add New Item</button>
                        <button class="admin-btn-secondary" id="btn-logout">Logout</button>
                    </div>
                </div>
                <div class="data-table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="admin-items-list">
                            <!-- Items populated dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Contact Submissions Section -->
        <div class="admin-section" id="sec-messages">
            <div class="admin-container">
                <div class="admin-header">
                    <h2>Contact Submissions</h2>
                </div>
                <div class="data-table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="admin-messages-list">
                            <!-- Submissions populated dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add/Edit Item Modal -->
        <div class="modal" id="itemModal">
            <div class="modal-content">
                <h2 id="modalTitle" style="margin-bottom: 1.5rem;">Add New Item</h2>
                <form id="itemForm">
                    <div class="form-group">
                        <label>Item Name</label>
                        <input type="text" id="item-name" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="item-desc" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Price ($ per day)</label>
                        <input type="number" step="0.01" id="item-price" required>
                    </div>
                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" id="item-img" required>
                    </div>
                    <div class="action-btns" style="margin-top: 2rem;">
                        <button type="submit" class="admin-btn">Save</button>
                        <button type="button" class="admin-btn-secondary" id="btn-close-modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Tab Switching Logic
    const tabBtnItems = document.getElementById('tab-btn-items');
    const tabBtnMessages = document.getElementById('tab-btn-messages');
    const secItems = document.getElementById('sec-items');
    const secMessages = document.getElementById('sec-messages');

    tabBtnItems.addEventListener('click', () => {
        tabBtnItems.classList.add('active');
        tabBtnMessages.classList.remove('active');
        secItems.classList.add('active');
        secMessages.classList.remove('active');
        loadAdminItems();
    });

    tabBtnMessages.addEventListener('click', () => {
        tabBtnMessages.classList.add('active');
        tabBtnItems.classList.remove('active');
        secMessages.classList.add('active');
        secItems.classList.remove('active');
        loadAdminMessages();
    });

    // Modal Controls
    const modal = document.getElementById('itemModal');
    const btnAddItem = document.getElementById('btn-add-item');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const itemForm = document.getElementById('itemForm');
    const modalTitle = document.getElementById('modalTitle');

    btnAddItem.addEventListener('click', () => {
        editingItemId = null;
        modalTitle.innerText = "Add New Item";
        itemForm.reset();
        modal.style.display = 'flex';
    });

    btnCloseModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Logout Control
    document.getElementById('btn-logout').addEventListener('click', () => {
        sessionStorage.removeItem('admin_token');
        window.location.hash = '';
    });

    // Item Submit (Create / Update)
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const payload = {
            name: document.getElementById('item-name').value,
            description: document.getElementById('item-desc').value,
            price: parseFloat(document.getElementById('item-price').value),
            image_url: document.getElementById('item-img').value
        };

        const url = editingItemId ? `${API_URL}/items/${editingItemId}` : `${API_URL}/items/`;
        const method = editingItemId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to save item. Make sure you are logged in.");
            return res.json();
        })
        .then(() => {
            modal.style.display = 'none';
            loadAdminItems();
        })
        .catch(err => {
            alert(err.message);
        });
    });

    // Load Initial Tab Data
    loadAdminItems();
}

function loadAdminItems() {
    const listContainer = document.getElementById('admin-items-list');
    listContainer.innerHTML = '<tr><td colspan="3">Loading items...</td></tr>';

    fetch(`${API_URL}/items/`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                listContainer.innerHTML = '<tr><td colspan="3" style="text-align:center;">No items found.</td></tr>';
                return;
            }
            listContainer.innerHTML = data.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price} / day</td>
                    <td>
                        <div class="action-btns">
                            <button class="admin-btn" onclick="editItem(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}', ${item.price}, '${item.image_url}')">Edit</button>
                            <button class="admin-btn-danger" onclick="deleteItem(${item.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        })
        .catch(err => {
            listContainer.innerHTML = '<tr><td colspan="3">Error loading items.</td></tr>';
            console.error(err);
        });
}

function loadAdminMessages() {
    const listContainer = document.getElementById('admin-messages-list');
    listContainer.innerHTML = '<tr><td colspan="4">Loading messages...</td></tr>';

    fetch(`${API_URL}/contact/`, {
        headers: getAuthHeaders()
    })
        .then(res => {
            if (!res.ok) throw new Error("Unauthorized access. Log in again.");
            return res.json();
        })
        .then(data => {
            if (data.length === 0) {
                listContainer.innerHTML = '<tr><td colspan="4" style="text-align:center;">No submissions found.</td></tr>';
                return;
            }
            listContainer.innerHTML = data.map(msg => `
                <tr>
                    <td>${msg.name}</td>
                    <td>${msg.email}</td>
                    <td>${msg.message}</td>
                    <td>
                        <button class="admin-btn-danger" onclick="deleteMessage(${msg.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        })
        .catch(err => {
            listContainer.innerHTML = `<tr><td colspan="4">Error loading messages: ${err.message}</td></tr>`;
            console.error(err);
        });
}

// Global actions attached to window for inline onclick execution
window.editItem = function(id, name, description, price, imageUrl) {
    editingItemId = id;
    document.getElementById('modalTitle').innerText = "Edit Item";
    document.getElementById('item-name').value = name;
    document.getElementById('item-desc').value = description;
    document.getElementById('item-price').value = price;
    document.getElementById('item-img').value = imageUrl;
    document.getElementById('itemModal').style.display = 'flex';
};

window.deleteItem = function(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    fetch(`${API_URL}/items/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to delete item");
            loadAdminItems();
        })
        .catch(err => alert(err.message));
};

window.deleteMessage = function(id) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    fetch(`${API_URL}/contact/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to delete message");
            loadAdminMessages();
        })
        .catch(err => alert(err.message));
};

// Navigation Events
if (navLogo) {
    navLogo.addEventListener('click', () => { window.location.hash = '#home'; });
}

// Routing Setup — run immediately since script is at end of body (DOM is ready)
window.addEventListener('hashchange', handleRouting);
handleRouting();

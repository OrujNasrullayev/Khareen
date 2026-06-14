const API_URL = 'http://127.0.0.1:1111';

const appContent = document.getElementById('app-content');
const navHome = document.getElementById('nav-home');
const navCollection = document.getElementById('nav-collection');
const navAbout = document.getElementById('nav-about');
const navContact = document.getElementById('nav-contact');
const navLogo = document.getElementById('nav-logo');

let currentLang = localStorage.getItem('lang') || 'az';

const translations = {
    az: {
        navHome: "Ana Səhifə",
        navCollection: "Kolleksiya",
        navAbout: "Haqqımızda",
        navContact: "Bizimlə Əlaqə",
        heroTag: "Premium Tədbir Libaslarının İcarəsi",
        heroTitle: "Üslubunuzu Ucaldın.<br>Ən fərqlini <br><span class=\"gradient-text\">İcarə edin</span>.",
        heroSubtitle: "Kürator tərəfindən seçilmiş dizayner geyimlərinə və podiuma hazır ziyafət libaslarına pərakəndə satış qiymətinin cüzi bir hissəsi ilə sahib olun. Ən yaddaqalan anlarınız üçün hazırlanmış davamlı dəbdəbə.",
        heroBtnBrowse: "Kolleksiyaya Baxın",
        heroBtnStory: "Hekayəmiz",
        collTitle: "Bizim Kolleksiya",
        collSubtitle: "İcarəyə verilən premium geyimlər.",
        loading: "Məhsullar yüklənir...",
        noItems: "Hazırda heç bir məhsul yoxdur. Sonra yenidən yoxlayın!",
        errorLoading: "Məhsulların yüklənməsində xəta baş verdi.",
        perDay: "/ gün",
        aboutTitle: "Haqqımızda",
        aboutText1: "KháReen-ə xoş gəlmisiniz. Biz davamlı dəbə və büdcənizə zərər vermədən ən yaxşı görünüşə sahib olmağa inanırıq. Premium geyimlərdən ibarət kolleksiyamız istənilən tədbir üçün icarəyə verilir.",
        aboutText2: "Missiyamız keyfiyyətli xidmət, şəffaf qiymətlər və sizin hesab edə biləcəyiniz daim genişlənən qarderob vasitəsilə etibar yaratmaqdır.",
        contactTitle: "Bizimlə Əlaqə",
        contactSubtitle: "Sizin fikirlərinizi eşitmək bizim üçün xoşdur.",
        labelName: "Ad",
        labelEmail: "E-poçt",
        labelMessage: "Mesaj",
        btnSend: "Mesajı Göndər",
        statusSuccess: "Mesaj uğurla göndərildi!",
        statusError: "Mesajın göndərilməsi alınmadı.",
        adminAccess: "Admin Girişi",
        enterCredentials: "Davam etmək üçün məlumatlarınızı daxil edin",
        labelUsername: "İstifadəçi adı",
        labelPassword: "Şifrə",
        btnLogin: "Daxil ol",
        incorrectCreds: "İstifadəçi adı və ya şifrə yanlışdır",
        adminDashboard: "Admin Paneli",
        manageColl: "Kolleksiyanı İdarə Et",
        contactMsgs: "Əlaqə Mesajları",
        collItems: "Kolleksiya Məhsulları",
        addNewItem: "Yeni Məhsul Əlavə Et",
        logout: "Çıxış",
        thName: "Ad",
        thPrice: "Qiymət",
        thActions: "Əməliyyatlar",
        thEmail: "E-poçt",
        thMessage: "Mesaj",
        btnEdit: "Redaktə et",
        btnDelete: "Sil",
        btnSave: "Yadda saxla",
        btnCancel: "İmtina",
        modalAddTitle: "Yeni Məhsul Əlavə Et",
        modalEditTitle: "Məhsulu Redaktə Et",
        labelItemName: "Məhsulun Adı",
        labelItemDesc: "Təsvir",
        labelItemPrice: "Qiymət ($ günə)",
        labelItemImg: "Şəkil URL-i",
        confirmDelete: "Bu məhsulu silmək istədiyinizdən əminsiniz?",
        confirmDeleteMsg: "Bu mesajı silmək istədiyinizdən əminsiniz?",
        items: {
            "Velvet Evening Gown": {
                name: "Məxmər Ziyafət Libası",
                desc: "Eleqant tünd göy rəngli məxmər ziyafət libası, rəsmi tədbirlər və qala gecələri üçün mükəmməldir."
            },
            "Classic Tweed Blazer": {
                name: "Klassik Tvidd Blazer",
                desc: "Zərif qızılı düymələrlə premium tvidd blazer. Zamanı üstələyən üslub."
            },
            "Designer Silk Trench Coat": {
                name: "Dizayner İpək Trençkotu",
                desc: "Qumlu bej rəngdə yüngül ipək qarışığı trençkot. Nəfəs ala bilən və ultra-premium."
            },
            "Satin Floral Midi Dress": {
                name: "Satin Güllü Midi Libas",
                desc: "Axıcı satendə parlaq güllü midi libas. Toylar və yay partiləri üçün əladır."
            }
        }
    },
    en: {
        navHome: "Home",
        navCollection: "Collection",
        navAbout: "About Us",
        navContact: "Contact Us",
        heroTag: "Premium Event Dress Rentals",
        heroTitle: "Elevate Your Style.<br>Rent the <span class=\"gradient-text\">Extraordinary</span>.",
        heroSubtitle: "Access curated designer gowns and runway-ready event dresses for a fraction of the retail price. Sustainable luxury tailored for your most memorable moments.",
        heroBtnBrowse: "Browse Collection",
        heroBtnStory: "Our Story",
        collTitle: "Our Collection",
        collSubtitle: "Premium clothing available for rent.",
        loading: "Loading items...",
        noItems: "No items available right now. Check back later!",
        errorLoading: "Error loading items.",
        perDay: "/ day",
        aboutTitle: "About Us",
        aboutText1: "Welcome to KháReen. We believe in sustainable fashion and looking your best without breaking the bank. Our curated collection of premium clothing is available for you to rent for any occasion.",
        aboutText2: "Our mission is to build trust through quality service, transparent pricing, and an ever-expanding wardrobe that you can call your own.",
        contactTitle: "Contact Us",
        contactSubtitle: "We'd love to hear from you.",
        labelName: "Name",
        labelEmail: "Email",
        labelMessage: "Message",
        btnSend: "Send Message",
        statusSuccess: "Message sent successfully!",
        statusError: "Failed to send message.",
        adminAccess: "Admin Access",
        enterCredentials: "Enter your credentials to continue",
        labelUsername: "Username",
        labelPassword: "Password",
        btnLogin: "Log In",
        incorrectCreds: "Incorrect credentials",
        adminDashboard: "Admin Dashboard",
        manageColl: "Manage Collection",
        contactMsgs: "Contact Messages",
        collItems: "Collection Items",
        addNewItem: "Add New Item",
        logout: "Logout",
        thName: "Name",
        thPrice: "Price",
        thActions: "Actions",
        thEmail: "Email",
        thMessage: "Message",
        btnEdit: "Edit",
        btnDelete: "Delete",
        btnSave: "Save",
        btnCancel: "Cancel",
        modalAddTitle: "Add New Item",
        modalEditTitle: "Edit Item",
        labelItemName: "Item Name",
        labelItemDesc: "Description",
        labelItemPrice: "Price ($ per day)",
        labelItemImg: "Image URL",
        confirmDelete: "Are you sure you want to delete this item?",
        confirmDeleteMsg: "Are you sure you want to delete this message?",
        items: {}
    }
};

function updateUIText() {
    const t = translations[currentLang];
    if (navHome) navHome.textContent = t.navHome;
    if (navCollection) navCollection.textContent = t.navCollection;
    if (navAbout) navAbout.textContent = t.navAbout;
    if (navContact) navContact.textContent = t.navContact;

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang.toUpperCase();
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateUIText();

    const hash = window.location.hash;
    if (hash === '#admin') {
        const token = sessionStorage.getItem('admin_token');
        if (token) {
            renderAdmin();
        } else {
            renderLogin();
        }
    } else {
        const oldHome = document.getElementById('home');
        if (oldHome) {
            oldHome.remove();
        }
        ensureSinglePageLayout();
    }
}

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

    const t = translations[currentLang];

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
                <span class="hero-tag">${t.heroTag}</span>
                <h1 class="hero-title">${t.heroTitle}</h1>
                <p class="hero-subtitle">${t.heroSubtitle}</p>
                <div class="hero-actions">
                    <a href="#collection" class="btn-primary">${t.heroBtnBrowse}</a>
                    <a href="#about" class="btn-secondary">${t.heroBtnStory}</a>
                </div>
            </div>
            
            <div class="hero-image-container">
                <div class="hero-image-card"></div>
            </div>
        </section>

        <!-- Collection Section -->
        <section id="collection" class="scroll-section reveal-slide-left">
            <h2 class="section-title text-center">${t.collTitle}</h2>
            <p class="section-subtitle text-center">${t.collSubtitle}</p>
            <div class="collection-slider-wrapper">
                <button class="slider-btn prev-btn" id="sliderPrevBtn" aria-label="Previous dress">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div class="slider-track-container" id="sliderTrackContainer">
                    <div class="slider-track" id="items-grid">
                        <p>${t.loading}</p>
                    </div>
                </div>
                <button class="slider-btn next-btn" id="sliderNextBtn" aria-label="Next dress">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </section>

        <!-- About Us Section -->
        <section id="about" class="scroll-section reveal-zoom-in">
            <h2 class="section-title text-center">${t.aboutTitle}</h2>
            <div class="about-grid">
                <div class="about-content">
                    <div class="about-text">
                        <p>${t.aboutText1}</p>
                        <br>
                        <p>${t.aboutText2}</p>
                    </div>
                    <div class="about-socials">
                        <a href="https://instagram.com" target="_blank" class="social-link" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            <span>Instagram</span>
                        </a>
                        <a href="https://facebook.com" target="_blank" class="social-link" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            <span>Facebook</span>
                        </a>
                        <a href="https://pinterest.com" target="_blank" class="social-link" aria-label="Pinterest">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.91 6.46 9.39-.09-.8-.17-2.03.03-2.91.19-.8 1.21-5.13 1.21-5.13s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.88 0 1.31.67 1.31 1.47 0 .89-.57 2.22-.86 3.45-.24 1.03.52 1.87 1.54 1.87 1.85 0 3.27-1.95 3.27-4.77 0-2.49-1.79-4.24-4.35-4.24-2.96 0-4.7 2.22-4.7 4.52 0 .89.34 1.85.77 2.38.08.1.1.17.07.28-.08.33-.26 1.05-.3 1.19-.05.2-.17.24-.39.14-1.46-.68-2.38-2.82-2.38-4.54 0-3.69 2.68-7.08 7.73-7.08 4.06 0 7.21 2.89 7.21 6.75 0 4.03-2.54 7.28-6.07 7.28-1.19 0-2.3-.62-2.68-1.35l-.73 2.79c-.26 1.02-.98 2.3-1.46 3.08C10.09 21.78 11.02 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"></path></svg>
                            <span>Pinterest</span>
                        </a>
                    </div>
                </div>
                <div class="about-images">
                    <div class="about-img-wrapper img-1">
                        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" alt="KháReen Boutique" loading="lazy">
                    </div>
                    <div class="about-img-wrapper img-2">
                        <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80" alt="KháReen Editorial" loading="lazy">
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Us Section -->
        <section id="contact" class="scroll-section reveal-slide-right">
            <h2 class="section-title text-center">${t.contactTitle}</h2>
            <p class="section-subtitle text-center">${t.contactSubtitle}</p>
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label>${t.labelName}</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label>${t.labelEmail}</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label>${t.labelMessage}</label>
                    <textarea id="message" rows="5" required></textarea>
                </div>
                <button type="submit">${t.btnSend}</button>
            </form>
            <p id="formStatus" style="text-align:center; margin-top:1rem; color:#818cf8;"></p>
        </section>
    `;

    loadCollectionItems();
    bindContactFormListener();
    setupScrollObserver();
    setupRevealObserver();
}

function translateItem(item) {
    const t = translations[currentLang];
    if (t.items && t.items[item.name]) {
        return {
            name: t.items[item.name].name,
            description: t.items[item.name].desc,
            price: item.price
        };
    }
    return item;
}

function loadCollectionItems() {
    const grid = document.getElementById('items-grid');
    if (!grid) return;

    const t = translations[currentLang];

    fetch(`${API_URL}/items/`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                grid.innerHTML = `<p>${t.noItems}</p>`;
                return;
            }

            // Preload and decode all images in background to prevent lazy-loading pop-in
            data.forEach(item => {
                if (item.image_url) {
                    const img = new Image();
                    img.src = item.image_url;
                    if (img.decode) {
                        img.decode().catch(() => { });
                    }
                }
            });

            // Ensure we have at least 6 cards for smooth visual buffering on both sides
            const listToRender = data.length < 6 ? [...data, ...data] : data;

            grid.innerHTML = listToRender.map(item => {
                const translated = translateItem(item);
                return `
                    <div class="card">
                        <img class="card-img" src="${item.image_url || ''}" alt="${translated.name}" decoding="sync">
                        <h3 class="card-title">${translated.name}</h3>
                        <p class="card-desc">${translated.description}</p>
                        <p class="card-price">$${translated.price}${t.perDay}</p>
                    </div>
                `;
            }).join('');

            setupEndlessCarousel();
        })
        .catch(err => {
            grid.innerHTML = `<p>${t.errorLoading}</p>`;
            console.error(err);
        });
}

let carouselAnimationFrameId = null;
let carouselResumeTimeout = null;
let isCarouselAutoScrolling = true;
let carouselCurrentX = 0;
let carouselLastScrollAmount = 0;
let isCarouselTransitioning = false;
const carouselSpeed = 0.8; // pixels per frame at 60fps (~48px/s)

function setupEndlessCarousel() {
    const container = document.getElementById('sliderTrackContainer');
    const grid = document.getElementById('items-grid');
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');

    if (!container || !grid || !prevBtn || !nextBtn) return;

    // Clean up any existing auto-scroll animation or timeout
    if (carouselAnimationFrameId) {
        cancelAnimationFrame(carouselAnimationFrameId);
        carouselAnimationFrameId = null;
    }
    if (carouselResumeTimeout) {
        clearTimeout(carouselResumeTimeout);
        carouselResumeTimeout = null;
    }
    isCarouselTransitioning = false;
    isCarouselAutoScrolling = true;

    function getScrollAmount() {
        const firstCard = grid.querySelector('.card');
        if (!firstCard) return 352;
        const style = window.getComputedStyle(grid);
        const gap = parseInt(style.gap) || 32;
        return firstCard.offsetWidth + gap;
    }

    // Prepend the last two cards to the beginning to act as left buffers (total 2 cards cached on the left)
    const initialCards = grid.querySelectorAll('.card');
    if (initialCards.length <= 2) return;

    const lastCard1 = initialCards[initialCards.length - 1];
    const lastCard2 = initialCards[initialCards.length - 2];
    grid.insertBefore(lastCard1, grid.firstChild);
    grid.insertBefore(lastCard2, grid.firstChild);

    // Initial offset of the two prepended cards
    const initialScrollAmount = getScrollAmount();
    carouselLastScrollAmount = initialScrollAmount;
    carouselCurrentX = -initialScrollAmount * 2;

    grid.style.transition = 'none';
    grid.style.transform = `translate3d(${carouselCurrentX}px, 0, 0)`;

    // Marquee continuous loop
    function marquee() {
        if (!isCarouselAutoScrolling) return;

        const scrollAmount = getScrollAmount();

        // Handle window resize dynamically to scale the scroll position and prevent layout jumps
        if (scrollAmount !== carouselLastScrollAmount) {
            carouselCurrentX = (carouselCurrentX / carouselLastScrollAmount) * scrollAmount;
            carouselLastScrollAmount = scrollAmount;
        }

        carouselCurrentX -= carouselSpeed;

        // If we scrolled past a full card width, append first card to the end and adjust X
        if (carouselCurrentX <= -3 * scrollAmount) {
            const firstCard = grid.querySelector('.card');
            if (firstCard) {
                grid.appendChild(firstCard);
            }
            carouselCurrentX += scrollAmount;
        }

        grid.style.transform = `translate3d(${carouselCurrentX}px, 0, 0)`;
        carouselAnimationFrameId = requestAnimationFrame(marquee);
    }

    // Start auto-scroll
    carouselAnimationFrameId = requestAnimationFrame(marquee);

    // Centralized manual transition logic with easing
    function startManualTransition(targetX, isNext, shouldShift) {
        if (isCarouselTransitioning) return;
        isCarouselTransitioning = true;
        isCarouselAutoScrolling = false;

        if (carouselAnimationFrameId) {
            cancelAnimationFrame(carouselAnimationFrameId);
            carouselAnimationFrameId = null;
        }
        if (carouselResumeTimeout) {
            clearTimeout(carouselResumeTimeout);
            carouselResumeTimeout = null;
        }

        grid.style.transition = 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        grid.style.transform = `translate3d(${targetX}px, 0, 0)`;

        function onTransitionEnd() {
            grid.removeEventListener('transitionend', onTransitionEnd);
            grid.style.transition = 'none';

            if (shouldShift) {
                if (isNext) {
                    const firstCard = grid.querySelector('.card');
                    if (firstCard) grid.appendChild(firstCard);
                } else {
                    const cards = grid.querySelectorAll('.card');
                    const lastCard = cards[cards.length - 1];
                    if (lastCard) grid.insertBefore(lastCard, grid.firstChild);
                }
            }

            const currentScrollAmount = getScrollAmount();
            carouselLastScrollAmount = currentScrollAmount;
            carouselCurrentX = -2 * currentScrollAmount;
            grid.style.transform = `translate3d(${carouselCurrentX}px, 0, 0)`;
            grid.offsetHeight; // Force reflow

            isCarouselTransitioning = false;

            // Schedule auto-scroll resume
            carouselResumeTimeout = setTimeout(() => {
                isCarouselAutoScrolling = true;
                carouselLastScrollAmount = getScrollAmount();
                carouselAnimationFrameId = requestAnimationFrame(marquee);
            }, 3000);
        }

        grid.addEventListener('transitionend', onTransitionEnd);
    }

    function scrollNext() {
        if (isCarouselTransitioning) return;
        const scrollAmount = getScrollAmount();
        const targetX = -3 * scrollAmount;
        startManualTransition(targetX, true, true);
    }

    function scrollPrev() {
        if (isCarouselTransitioning) return;
        const scrollAmount = getScrollAmount();
        const currentSlot = -carouselCurrentX / scrollAmount;

        // Snapping decision based on current auto-scroll position
        if (currentSlot < 2.5) {
            // Transition back to slot 1, which shifts cards and resets to slot 2
            const targetX = -1 * scrollAmount;
            startManualTransition(targetX, false, true);
        } else {
            // Snaps back to slot 2 without shifting cards
            const targetX = -2 * scrollAmount;
            startManualTransition(targetX, false, false);
        }
    }

    // Clean up event listeners by replacing buttons with fresh clones
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

    newNextBtn.addEventListener('click', scrollNext);
    newPrevBtn.addEventListener('click', scrollPrev);

    // Touch support for swiping on mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                scrollNext();
            } else {
                scrollPrev();
            }
        }
    }, { passive: true });
}

function bindContactFormListener() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const t = translations[currentLang];

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
                document.getElementById('formStatus').innerText = t.statusSuccess;
                form.reset();
            })
            .catch(err => {
                document.getElementById('formStatus').innerText = t.statusError;
                console.error(err);
            });
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
    const t = translations[currentLang];

    appContent.innerHTML = `
        <div class="admin-login-wrapper">
            <div class="login-card">
                <div class="login-icon">🔐</div>
                <h1 class="page-title" style="font-size: 1.8rem; margin-bottom: 0.5rem;">${t.adminAccess}</h1>
                <p class="page-subtitle" style="margin-bottom: 2rem; font-size: 1rem;">${t.enterCredentials}</p>
                <form id="loginForm">
                    <div class="form-group">
                        <label>${t.labelUsername}</label>
                        <input type="text" id="login-username" required autocomplete="username" placeholder="admin">
                    </div>
                    <div class="form-group">
                        <label>${t.labelPassword}</label>
                        <input type="password" id="login-password" required autocomplete="current-password" placeholder="••••••••">
                    </div>
                    <button type="submit" style="margin-top: 0.5rem;">${t.btnLogin}</button>
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
                if (!res.ok) throw new Error(t.incorrectCreds);
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
    const t = translations[currentLang];

    appContent.innerHTML = `
        <h1 class="page-title">${t.adminDashboard}</h1>
        
        <div class="admin-tabs">
            <button class="admin-tab-btn active" id="tab-btn-items">${t.manageColl}</button>
            <button class="admin-tab-btn" id="tab-btn-messages">${t.contactMsgs}</button>
        </div>

        <!-- Manage Collection Section -->
        <div class="admin-section active" id="sec-items">
            <div class="admin-container">
                <div class="admin-header">
                    <h2>${t.collItems}</h2>
                    <div style="display: flex; gap: 1rem;">
                        <button class="admin-btn" id="btn-add-item">${t.addNewItem}</button>
                        <button class="admin-btn-secondary" id="btn-logout">${t.logout}</button>
                    </div>
                </div>
                <div class="data-table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>${t.thName}</th>
                                <th>${t.thPrice}</th>
                                <th>${t.thActions}</th>
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
                    <h2>${t.contactMsgs}</h2>
                </div>
                <div class="data-table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>${t.thName}</th>
                                <th>${t.thEmail}</th>
                                <th>${t.thMessage}</th>
                                <th>${t.thActions}</th>
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
                <h2 id="modalTitle" style="margin-bottom: 1.5rem;">${t.addNewItem}</h2>
                <form id="itemForm">
                    <div class="form-group">
                        <label>${t.labelItemName}</label>
                        <input type="text" id="item-name" required>
                    </div>
                    <div class="form-group">
                        <label>${t.labelItemDesc}</label>
                        <textarea id="item-desc" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>${t.labelItemPrice}</label>
                        <input type="number" step="0.01" id="item-price" required>
                    </div>
                    <div class="form-group">
                        <label>${t.labelItemImg}</label>
                        <input type="url" id="item-img" required>
                    </div>
                    <div class="action-btns" style="margin-top: 2rem;">
                        <button type="submit" class="admin-btn">${t.btnSave}</button>
                        <button type="button" class="admin-btn-secondary" id="btn-close-modal">${t.btnCancel}</button>
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
        modalTitle.innerText = t.modalAddTitle;
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
                if (!res.ok) throw new Error(currentLang === 'az' ? "Məhsulu yadda saxlamaq mümkün olmadı. Daxil olduğunuza əmin olun." : "Failed to save item. Make sure you are logged in.");
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
    const t = translations[currentLang];
    const listContainer = document.getElementById('admin-items-list');
    listContainer.innerHTML = `<tr><td colspan="3">${t.loading}</td></tr>`;

    fetch(`${API_URL}/items/`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                listContainer.innerHTML = `<tr><td colspan="3" style="text-align:center;">${currentLang === 'az' ? 'Heç bir məhsul tapılmadı.' : 'No items found.'}</td></tr>`;
                return;
            }
            listContainer.innerHTML = data.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price}${t.perDay}</td>
                    <td>
                        <div class="action-btns">
                            <button class="admin-btn" onclick="editItem(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.description.replace(/'/g, "\\'")}', ${item.price}, '${item.image_url}')">${t.btnEdit}</button>
                            <button class="admin-btn-danger" onclick="deleteItem(${item.id})">${t.btnDelete}</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        })
        .catch(err => {
            listContainer.innerHTML = `<tr><td colspan="3">${t.errorLoading}</td></tr>`;
            console.error(err);
        });
}

function loadAdminMessages() {
    const t = translations[currentLang];
    const listContainer = document.getElementById('admin-messages-list');
    listContainer.innerHTML = `<tr><td colspan="4">${t.loading}</td></tr>`;

    fetch(`${API_URL}/contact/`, {
        headers: getAuthHeaders()
    })
        .then(res => {
            if (!res.ok) throw new Error(currentLang === 'az' ? "Yetkisiz giriş. Yenidən daxil olun." : "Unauthorized access. Log in again.");
            return res.json();
        })
        .then(data => {
            if (data.length === 0) {
                listContainer.innerHTML = `<tr><td colspan="4" style="text-align:center;">${currentLang === 'az' ? 'Heç bir müraciət tapılmadı.' : 'No submissions found.'}</td></tr>`;
                return;
            }
            listContainer.innerHTML = data.map(msg => `
                <tr>
                    <td>${msg.name}</td>
                    <td>${msg.email}</td>
                    <td>${msg.message}</td>
                    <td>
                        <button class="admin-btn-danger" onclick="deleteMessage(${msg.id})">${t.btnDelete}</button>
                    </td>
                </tr>
            `).join('');
        })
        .catch(err => {
            listContainer.innerHTML = `<tr><td colspan="4">${currentLang === 'az' ? 'Mesajların yüklənməsində xəta' : 'Error loading messages'}: ${err.message}</td></tr>`;
            console.error(err);
        });
}

// Global actions attached to window for inline onclick execution
window.editItem = function (id, name, description, price, imageUrl) {
    const t = translations[currentLang];
    editingItemId = id;
    document.getElementById('modalTitle').innerText = t.modalEditTitle;
    document.getElementById('item-name').value = name;
    document.getElementById('item-desc').value = description;
    document.getElementById('item-price').value = price;
    document.getElementById('item-img').value = imageUrl;
    document.getElementById('itemModal').style.display = 'flex';
};

window.deleteItem = function (id) {
    if (!confirm(translations[currentLang].confirmDelete)) return;

    fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
        .then(res => {
            if (!res.ok) throw new Error(currentLang === 'az' ? "Məhsulu silmək mümkün olmadı" : "Failed to delete item");
            loadAdminItems();
        })
        .catch(err => alert(err.message));
};

window.deleteMessage = function (id) {
    if (!confirm(translations[currentLang].confirmDeleteMsg)) return;

    fetch(`${API_URL}/contact/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
        .then(res => {
            if (!res.ok) throw new Error(currentLang === 'az' ? "Mesajı silmək mümkün olmadı" : "Failed to delete message");
            loadAdminMessages();
        })
        .catch(err => alert(err.message));
};

// Navigation Events
if (navLogo) {
    navLogo.addEventListener('click', () => { window.location.hash = '#home'; });
}

// Language Switcher Event
const langBtn = document.getElementById('lang-btn');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        const nextLang = currentLang === 'az' ? 'en' : 'az';
        setLanguage(nextLang);
    });
}

// Initial UI Text Update
updateUIText();

// Routing Setup — run immediately since script is at end of body (DOM is ready)
window.addEventListener('hashchange', handleRouting);
handleRouting();

// IMPORTANT: Replace this URL with your actual Render URL after deploying!
const PRODUCTION_API_URL = 'https://khareen-api.onrender.com';

const API_URL = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
    ? 'http://127.0.0.1:1111'
    : PRODUCTION_API_URL;

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
        contactTitle: "Özəl Libas Tövsiyəsi Alın",
        contactSubtitle: "Növbəti tədbiriniz haqqında bizə bir az məlumat verin və biz sizə ən yaxşı libasları tövsiyə edək!",
        requiredNote: "* Vacib sahələr",
        labelName: "Ad *",
        labelWhatsapp: "Whatsapp nömrəsi *",
        labelEventDate: "Tədbiriniz nə vaxtdır?",
        labelOccasion: "Tədbirin dress-kodu/növü nədir?",
        labelSize: "Adətən hansı ölçünü geyinirsiniz?",
        labelNotes: "Əlavə qeydlər / suallar (Könüllü)",
        btnSend: "Özəl Libas Seçimlərimi Əldə Edin",
        ctaCaption: "Biz adətən 5–6 saat ərzində fərdiləşdirilmiş libas seçimləri ilə cavab veririk.",
        statusSuccess: "Mesaj uğurla göndərildi!",
        statusError: "Mesajın göndərilməsi alınmadı.",
        footerRights: "Bütün hüquqlar qorunur.",
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
        thWhatsapp: "Whatsapp",
        thEventDate: "Tədbir Tarixi",
        thOccasion: "Tədbir Növü",
        thSize: "Ölçü",
        thNotes: "Qeydlər",
        btnEdit: "Redaktə et",
        btnDelete: "Sil",
        btnSave: "Yadda saxla",
        btnCancel: "İmtina",
        modalAddTitle: "Yeni Məhsul Əlavə Et",
        modalEditTitle: "Məhsulu Redaktə Et",
        labelItemName: "Məhsulun Adı",
        labelItemDesc: "Təsvir",
        labelItemPrice: "Qiymət (₼ günə)",
        labelItemImg: "Şəkil URL-i",
        confirmDelete: "Bu məhsulu silmək istədiyinizdən əminsiniz?",
        confirmDeleteMsg: "Bu mesajı silmək istədiyinizdən əminsiniz?",
        items: {}
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
        contactTitle: "Get a Custom Recommendation",
        contactSubtitle: "Tell us a bit about your upcoming event, and we will recommend you the best dresses for it!",
        requiredNote: "* Required fields",
        labelName: "Name *",
        labelWhatsapp: "Whatsapp number *",
        labelEventDate: "When is your event?",
        labelOccasion: "What is the dress code/occasion?",
        labelSize: "What size do you typically wear?",
        labelNotes: "Additional notes/ questions (Optional)",
        btnSend: "Get My Custom Dress Options",
        ctaCaption: "We typically reply with personalized dress options within 5–6 hours.",
        statusSuccess: "Message sent successfully!",
        statusError: "Failed to send message.",
        footerRights: "All rights reserved.",
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
        thWhatsapp: "Whatsapp",
        thEventDate: "Event Date",
        thOccasion: "Occasion",
        thSize: "Size",
        thNotes: "Notes",
        btnEdit: "Edit",
        btnDelete: "Delete",
        btnSave: "Save",
        btnCancel: "Cancel",
        modalAddTitle: "Add New Item",
        modalEditTitle: "Edit Item",
        labelItemName: "Item Name",
        labelItemDesc: "Description",
        labelItemPrice: "Price (₼ per day)",
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
                        <a href="https://tiktok.com" target="_blank" class="social-link" aria-label="TikTok">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                            <span>TikTok</span>
                        </a>
                        <a href="https://youtube.com" target="_blank" class="social-link" aria-label="YouTube">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            <span>YouTube</span>
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
                <div class="contact-form-grid">
                    <div class="form-group">
                        <label for="name">${t.labelName}</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="event_date">${t.labelEventDate}</label>
                        <input type="date" id="event_date">
                    </div>
                    <div class="form-group">
                        <label for="whatsapp_number">${t.labelWhatsapp}</label>
                        <input type="tel" id="whatsapp_number" required>
                    </div>
                    <div class="form-group">
                        <label for="occasion">${t.labelOccasion}</label>
                        <select id="occasion">
                            <option value="" disabled selected>${currentLang === 'az' ? 'Seçin...' : 'Select...'}</option>
                            <option value="Gala">${currentLang === 'az' ? 'Qala' : 'Gala'}</option>
                            <option value="Wedding">${currentLang === 'az' ? 'Toy' : 'Wedding'}</option>
                            <option value="Prom">${currentLang === 'az' ? 'Buraxılış' : 'Prom'}</option>
                            <option value="Cocktail">${currentLang === 'az' ? 'Kokteyl' : 'Cocktail'}</option>
                            <option value="Birthday">${currentLang === 'az' ? 'Ad Günü' : 'Birthday'}</option>
                            <option value="Other">${currentLang === 'az' ? 'Digər' : 'Other'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="size">${t.labelSize}</label>
                        <select id="size">
                            <option value="" disabled selected>${currentLang === 'az' ? 'Seçin...' : 'Select...'}</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">${t.labelNotes}</label>
                        <textarea id="message" rows="1"></textarea>
                    </div>
                </div>
                <div class="form-footer">
                    <span class="form-note">${t.requiredNote}</span>
                </div>
                <button type="submit">${t.btnSend}</button>
                <p class="cta-caption">${t.ctaCaption}</p>
            </form>
            <p id="formStatus" style="text-align:center; margin-top:1rem; color:#818cf8;"></p>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <p>&copy; 2026 KháReen. ${t.footerRights}</p>
                <div class="footer-links">
                    <a href="#home">${t.navHome}</a>
                    <a href="#collection">${t.navCollection}</a>
                    <a href="#about">${t.navAbout}</a>
                    <a href="#contact">${t.navContact}</a>
                </div>
            </div>
        </footer>
    `;

    loadCollectionItems();
    bindContactFormListener();
    setupScrollObserver();
    setupRevealObserver();
}

function translateItem(item) {
    if (currentLang === 'az') {
        return {
            name: item.name_az || item.name_en || '',
            description: item.description_az || item.description_en || '',
            price: item.price
        };
    } else {
        return {
            name: item.name_en || item.name_az || '',
            description: item.description_en || item.description_az || '',
            price: item.price
        };
    }
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
                        <p class="card-price">₼${translated.price}${t.perDay}</p>
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
        const whatsapp_number = document.getElementById('whatsapp_number').value;
        const event_date = document.getElementById('event_date').value || null;
        const occasion = document.getElementById('occasion').value || null;
        const size = document.getElementById('size').value || null;
        const message = document.getElementById('message').value || null;

        fetch(`${API_URL}/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, whatsapp_number, event_date, occasion, size, message })
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
                                <th>${t.thWhatsapp}</th>
                                <th>${t.thEventDate}</th>
                                <th>${t.thOccasion}</th>
                                <th>${t.thSize}</th>
                                <th>${t.thNotes}</th>
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
                        <label>${currentLang === 'az' ? 'Məhsulun Adı (AZ)' : 'Item Name (AZ)'}</label>
                        <input type="text" id="item-name-az" required>
                    </div>
                    <div class="form-group">
                        <label>${currentLang === 'az' ? 'Məhsulun Adı (EN)' : 'Item Name (EN)'}</label>
                        <input type="text" id="item-name-en" required>
                    </div>
                    <div class="form-group">
                        <label>${currentLang === 'az' ? 'Təsvir (AZ)' : 'Description (AZ)'}</label>
                        <textarea id="item-desc-az" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>${currentLang === 'az' ? 'Təsvir (EN)' : 'Description (EN)'}</label>
                        <textarea id="item-desc-en" rows="3" required></textarea>
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
    const logoutBtns = [document.getElementById('btn-logout')];
    logoutBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                sessionStorage.removeItem('admin_token');
                window.location.hash = '';
            });
        }
    });

    // Item Submit (Create / Update)
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const payload = {
            name_az: document.getElementById('item-name-az').value,
            name_en: document.getElementById('item-name-en').value,
            description_az: document.getElementById('item-desc-az').value,
            description_en: document.getElementById('item-desc-en').value,
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
            listContainer.innerHTML = data.map(item => {
                const escapedNameAz = (item.name_az || '').replace(/'/g, "\\'");
                const escapedNameEn = (item.name_en || '').replace(/'/g, "\\'");
                const escapedDescAz = (item.description_az || '').replace(/\n/g, '\\n').replace(/'/g, "\\'");
                const escapedDescEn = (item.description_en || '').replace(/\n/g, '\\n').replace(/'/g, "\\'");

                return `
                    <tr>
                        <td>${currentLang === 'az' ? (item.name_az || item.name_en) : (item.name_en || item.name_az)}</td>
                        <td>₼${item.price}${t.perDay}</td>
                        <td>
                            <div class="action-btns">
                                <button class="admin-btn" onclick="editItem(${item.id}, '${escapedNameAz}', '${escapedNameEn}', '${escapedDescAz}', '${escapedDescEn}', ${item.price}, '${item.image_url}')">${t.btnEdit}</button>
                                <button class="admin-btn-danger" onclick="deleteItem(${item.id})">${t.btnDelete}</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        })
        .catch(err => {
            listContainer.innerHTML = `<tr><td colspan="3">${t.errorLoading}</td></tr>`;
            console.error(err);
        });
}



function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function loadAdminMessages() {
    const t = translations[currentLang];
    const listContainer = document.getElementById('admin-messages-list');
    listContainer.innerHTML = `<tr><td colspan="7">${t.loading}</td></tr>`;

    fetch(`${API_URL}/contact/`, {
        headers: getAuthHeaders()
    })
        .then(res => {
            if (!res.ok) throw new Error(currentLang === 'az' ? "Yetkisiz giriş. Yenidən daxil olun." : "Unauthorized access. Log in again.");
            return res.json();
        })
        .then(data => {
            if (data.length === 0) {
                listContainer.innerHTML = `<tr><td colspan="7" style="text-align:center;">${currentLang === 'az' ? 'Heç bir müraciət tapılmadı.' : 'No submissions found.'}</td></tr>`;
                return;
            }
            
            const getOccasionText = (occ) => {
                if (!occ) return '-';
                const mapping = {
                    'Gala': currentLang === 'az' ? 'Qala' : 'Gala',
                    'Wedding': currentLang === 'az' ? 'Toy' : 'Wedding',
                    'Prom': currentLang === 'az' ? 'Buraxılış' : 'Prom',
                    'Cocktail': currentLang === 'az' ? 'Kokteyl' : 'Cocktail',
                    'Birthday': currentLang === 'az' ? 'Ad Günü' : 'Birthday',
                    'Other': currentLang === 'az' ? 'Digər' : 'Other'
                };
                return mapping[occ] || occ;
            };

            listContainer.innerHTML = data.map(msg => `
                <tr>
                    <td>${escapeHtml(msg.name)}</td>
                    <td>${escapeHtml(msg.whatsapp_number) || '-'}</td>
                    <td>${escapeHtml(msg.event_date) || '-'}</td>
                    <td>${getOccasionText(msg.occasion)}</td>
                    <td>${escapeHtml(msg.size) || '-'}</td>
                    <td>${escapeHtml(msg.message) || '-'}</td>
                    <td>
                        <button class="admin-btn-danger" onclick="deleteMessage(${msg.id})">${t.btnDelete}</button>
                    </td>
                </tr>
            `).join('');
        })
        .catch(err => {
            listContainer.innerHTML = `<tr><td colspan="7">${currentLang === 'az' ? 'Mesajların yüklənməsində xəta' : 'Error loading messages'}: ${err.message}</td></tr>`;
            console.error(err);
        });
}

// Global actions attached to window for inline onclick execution
window.editItem = function (id, nameAz, nameEn, descAz, descEn, price, imageUrl) {
    const t = translations[currentLang];
    editingItemId = id;
    document.getElementById('modalTitle').innerText = t.modalEditTitle;
    document.getElementById('item-name-az').value = nameAz;
    document.getElementById('item-name-en').value = nameEn;
    document.getElementById('item-desc-az').value = descAz;
    document.getElementById('item-desc-en').value = descEn;
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

// Load site content from database, updating translations mapping
async function fetchSiteContent() {
    try {
        const res = await fetch(`${API_URL}/site-content/`);
        if (!res.ok) throw new Error("Failed to fetch site content");
        const data = await res.json();
        data.forEach(item => {
            if (item.key.endsWith('_az')) {
                const baseKey = item.key.slice(0, -3);
                const camelKey = baseKey.replace(/_([a-z0-9])/g, (g) => g[1].toUpperCase());
                translations.az[camelKey] = item.value;
            } else if (item.key.endsWith('_en')) {
                const baseKey = item.key.slice(0, -3);
                const camelKey = baseKey.replace(/_([a-z0-9])/g, (g) => g[1].toUpperCase());
                translations.en[camelKey] = item.value;
            }
        });
    } catch (err) {
        console.error("Error loading site content from database, using local fallbacks:", err);
    }
}

// Initialize App
async function initApp() {
    await fetchSiteContent();
    updateUIText();
    window.addEventListener('hashchange', handleRouting);
    handleRouting();
}
initApp();

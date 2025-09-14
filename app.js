// Thar Village Life Website JavaScript - Fixed Version

// Global variables
let currentSlide = 0;
let totalSlides = 3;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDates = [];
let bookingData = {};

// Initialize Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,bn,te,ta,ml,kn,gu,mr,pa,ur,fr,es,de,it,pt,ru,ja,ko,zh,ar',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

// Hero slider functionality
function changeSlide(direction) {
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    
    slides[currentSlide].classList.add('active');
}

// Auto-advance hero slider
function startSlideshow() {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Video player functionality - Fixed
function playVideo(videoId) {
    const videoTitles = {
        'village-morning': 'Morning Village Life - Experience the peaceful morning routines',
        'cooking-traditional': 'Traditional Cooking - Learn authentic Rajasthani recipes',
        'farming-work': 'Farm Work - Join daily agricultural activities',
        'evening-stories': 'Evening Stories - Listen to local folklore and legends'
    };
    
    // Create a more prominent video modal instead of alert
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-modal-overlay" onclick="closeVideoModal()"></div>
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>🎬 ${videoTitles[videoId] || 'Village Life Video'}</h3>
                <button class="video-modal-close" onclick="closeVideoModal()">×</button>
            </div>
            <div class="video-modal-body">
                <div class="video-placeholder-large">
                    <div class="play-btn-large">▶</div>
                    <p>Authentic 9:16 format village life video would play here</p>
                    <p style="margin-top: 16px; font-size: 14px; color: var(--color-text-secondary);">
                        In the actual website, this would be a real video player with authentic village footage.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(videoModal);
    
    // Add video modal styles if not already present
    if (!document.querySelector('#video-modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'video-modal-styles';
        styles.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 3000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .video-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
            }
            .video-modal-content {
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                max-width: 400px;
                width: 90%;
                position: relative;
                z-index: 1;
            }
            .video-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
            }
            .video-modal-close {
                background: none;
                border: none;
                font-size: var(--font-size-2xl);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                line-height: 1;
            }
            .video-modal-body {
                padding: var(--space-24);
            }
            .video-placeholder-large {
                aspect-ratio: 9/16;
                background: var(--color-bg-1);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-lg);
                padding: var(--space-24);
                text-align: center;
            }
            .play-btn-large {
                width: 80px;
                height: 80px;
                background: var(--color-primary);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 32px;
                margin-bottom: var(--space-16);
                cursor: pointer;
            }
        `;
        document.head.appendChild(styles);
    }
}

function closeVideoModal() {
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        videoModal.remove();
    }
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Calendar functionality - Fixed
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const availableMonths = [10, 11, 0, 1, 2]; // Nov, Dec, Jan, Feb, Mar (0-indexed)

function generateCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('current-month');
    
    if (!calendar || !currentMonthElement) return;
    
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    calendar.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '8px 4px';
        dayHeader.style.color = 'var(--color-text-secondary)';
        dayHeader.style.fontSize = 'var(--font-size-sm)';
        calendar.appendChild(dayHeader);
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendar.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const dayDate = new Date(year, month, day);
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check if month is available and date is in future
        if (availableMonths.includes(month) && dayDate >= today) {
            dayElement.classList.add('available');
            dayElement.style.cursor = 'pointer';
            dayElement.addEventListener('click', function() {
                selectDate(dateString, dayElement);
            });
        } else {
            dayElement.classList.add('disabled');
        }
        
        // Check if date is already selected
        if (selectedDates.includes(dateString)) {
            dayElement.classList.add('selected');
        }
        
        calendar.appendChild(dayElement);
    }
}

function selectDate(dateString, element) {
    if (selectedDates.length === 0) {
        // First date selection (check-in)
        selectedDates = [dateString];
        element.classList.add('selected');
        updateSelectedDatesDisplay();
    } else if (selectedDates.length === 1) {
        // Second date selection (check-out)
        const checkIn = new Date(selectedDates[0]);
        const checkOut = new Date(dateString);
        
        if (checkOut <= checkIn) {
            // If second date is before or same as first, replace first date
            document.querySelectorAll('.calendar-day.selected').forEach(day => {
                day.classList.remove('selected');
            });
            selectedDates = [dateString];
            element.classList.add('selected');
        } else {
            // Valid date range
            selectedDates.push(dateString);
            element.classList.add('selected');
        }
        updateSelectedDatesDisplay();
    } else {
        // Reset selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        selectedDates = [dateString];
        element.classList.add('selected');
        updateSelectedDatesDisplay();
    }
}

function updateSelectedDatesDisplay() {
    const selectedDatesElement = document.getElementById('selected-dates');
    if (!selectedDatesElement) return;
    
    if (selectedDates.length === 0) {
        selectedDatesElement.innerHTML = '<strong>Select your check-in date</strong>';
    } else if (selectedDates.length === 1) {
        const date = new Date(selectedDates[0]);
        selectedDatesElement.innerHTML = `<strong>Check-in:</strong> ${date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        })}<br><em>Select check-out date</em>`;
    } else {
        const checkIn = new Date(selectedDates[0]);
        const checkOut = new Date(selectedDates[1]);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        selectedDatesElement.innerHTML = `
            <strong>Selected Dates:</strong><br>
            <strong>Check-in:</strong> ${checkIn.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}<br>
            <strong>Check-out:</strong> ${checkOut.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}<br>
            <em>${nights} nights - Perfect for our 4N5D experience!</em>
        `;
    }
}

function navigateMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    
    generateCalendar(currentMonth, currentYear);
}

// FAQ functionality - Fixed
function toggleFAQ(questionElement) {
    const faqItem = questionElement.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = questionElement.classList.contains('active');
    
    // Close all FAQ items first
    document.querySelectorAll('.faq-question.active').forEach(q => {
        q.classList.remove('active');
    });
    document.querySelectorAll('.faq-answer.active').forEach(a => {
        a.classList.remove('active');
    });
    
    // If this wasn't active, open it
    if (!isActive && answer) {
        questionElement.classList.add('active');
        answer.classList.add('active');
    }
}

// Booking form validation and processing - Fixed
function validateBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return false;
    
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const guestsSelect = form.querySelector('select');
    
    let isValid = true;
    
    // Reset styles
    [nameInput, emailInput, phoneInput, guestsSelect].forEach(input => {
        if (input) input.style.borderColor = 'var(--color-border)';
    });
    
    // Validate name
    if (!nameInput || !nameInput.value.trim()) {
        if (nameInput) nameInput.style.borderColor = 'var(--color-error)';
        isValid = false;
    }
    
    // Validate email
    if (!emailInput || !emailInput.value.trim()) {
        if (emailInput) emailInput.style.borderColor = 'var(--color-error)';
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = 'var(--color-error)';
            alert('Please enter a valid email address.');
            isValid = false;
        }
    }
    
    // Validate phone
    if (!phoneInput || !phoneInput.value.trim()) {
        if (phoneInput) phoneInput.style.borderColor = 'var(--color-error)';
        isValid = false;
    }
    
    // Validate guests
    if (!guestsSelect || !guestsSelect.value) {
        if (guestsSelect) guestsSelect.style.borderColor = 'var(--color-error)';
        isValid = false;
    }
    
    // Validate dates
    if (selectedDates.length !== 2) {
        alert('Please select both check-in and check-out dates from the calendar.');
        isValid = false;
    }
    
    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }
    
    return isValid;
}

function proceedToPayment() {
    console.log('Proceed to payment clicked');
    
    if (!validateBookingForm()) {
        return;
    }
    
    const form = document.getElementById('booking-form');
    if (!form) {
        console.error('Booking form not found');
        return;
    }
    
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const guestsSelect = form.querySelector('select');
    const textareaInput = form.querySelector('textarea');
    
    // Store booking data
    bookingData = {
        name: nameInput ? nameInput.value : '',
        email: emailInput ? emailInput.value : '',
        phone: phoneInput ? phoneInput.value : '',
        guests: guestsSelect ? guestsSelect.value : '1',
        checkIn: selectedDates[0] || '',
        checkOut: selectedDates[1] || '',
        specialRequirements: textareaInput ? textareaInput.value : ''
    };
    
    // Calculate total
    const basePrice = 199;
    const guests = parseInt(bookingData.guests) || 1;
    const totalPrice = basePrice * guests;
    
    // Update payment modal
    const paymentGuests = document.getElementById('payment-guests');
    const paymentDates = document.getElementById('payment-dates');
    const paymentTotal = document.getElementById('payment-total');
    
    if (paymentGuests) paymentGuests.textContent = `${guests} Guest${guests > 1 ? 's' : ''}`;
    if (paymentDates && selectedDates.length >= 2) {
        paymentDates.textContent = `${new Date(selectedDates[0]).toLocaleDateString()} - ${new Date(selectedDates[1]).toLocaleDateString()}`;
    }
    if (paymentTotal) paymentTotal.textContent = `$${totalPrice}`;
    
    // Show payment modal
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.classList.remove('hidden');
        console.log('Payment modal shown');
    } else {
        console.error('Payment modal not found');
        // Fallback: show confirmation
        alert(`Booking Summary:\n\nName: ${bookingData.name}\nEmail: ${bookingData.email}\nGuests: ${bookingData.guests}\nTotal: $${totalPrice}\n\nIn the actual website, this would open a secure payment gateway.`);
    }
}

function closePaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.classList.add('hidden');
    }
}

function processPayment(method) {
    const methodNames = {
        'upi': 'UPI',
        'razorpay': 'Razorpay',
        'paypal': 'PayPal'
    };
    
    const guests = parseInt(bookingData.guests) || 1;
    const total = 199 * guests;
    
    // Show processing state
    const paymentButtons = document.querySelectorAll('.payment-btn');
    paymentButtons.forEach(btn => {
        btn.style.opacity = '0.6';
        btn.style.pointerEvents = 'none';
    });
    
    setTimeout(() => {
        // Close modal and show confirmation
        closePaymentModal();
        
        // Reset button states
        paymentButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        });
        
        alert(`🎉 Payment Successful!\n\nPayment Method: ${methodNames[method]}\nAmount: $${total}\n\nBooking Confirmed for:\n• ${bookingData.name}\n• ${bookingData.email}\n• ${bookingData.guests} guest(s)\n• Dates: ${bookingData.checkIn} to ${bookingData.checkOut}\n\nYou will receive a confirmation email shortly with detailed instructions.\n\nThank you for choosing our authentic village experience!`);
    }, 1500);
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Initialize calendar to show available months
function initializeCalendar() {
    // Start with November if current month is before November
    const now = new Date();
    if (now.getMonth() < 10) { // Before November
        currentMonth = 10; // November
        currentYear = now.getFullYear();
    } else if (now.getMonth() > 2) { // After March
        currentMonth = 10; // November
        currentYear = now.getFullYear() + 1;
    } else {
        // We're in the valid season
        currentMonth = now.getMonth();
        currentYear = now.getFullYear();
    }
    
    generateCalendar(currentMonth, currentYear);
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Start hero slideshow
    startSlideshow();
    
    // Setup navigation
    setupNavigation();
    
    // Initialize calendar with proper month
    initializeCalendar();
    
    // Setup calendar navigation
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            navigateMonth(-1);
        });
    }
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            navigateMonth(1);
        });
    }
    
    // Close modal when clicking overlay
    const modal = document.getElementById('payment-modal');
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closePaymentModal);
        }
    }
    
    // Setup form validation on input change
    const form = document.getElementById('booking-form');
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = 'var(--color-error)';
                } else {
                    this.style.borderColor = 'var(--color-border)';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--color-primary)';
            });
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Setup FAQ click handlers
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
    
    // Setup video click handlers
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('onclick')?.match(/playVideo\('(.+?)'\)/)?.[1];
            if (videoId) {
                playVideo(videoId);
            }
        });
    });
    
    console.log('Initialization complete');
});

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Regenerate calendar if needed
    generateCalendar(currentMonth, currentYear);
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('payment-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closePaymentModal();
        }
        
        // Also close video modal
        closeVideoModal();
    }
    
    // Navigate hero slides with arrow keys when focused on hero
    if (document.activeElement && document.activeElement.closest('.hero')) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// Export functions for global access
window.changeSlide = changeSlide;
window.playVideo = playVideo;
window.closeVideoModal = closeVideoModal;
window.scrollToSection = scrollToSection;
window.toggleFAQ = toggleFAQ;
window.proceedToPayment = proceedToPayment;
window.closePaymentModal = closePaymentModal;
window.processPayment = processPayment;
window.googleTranslateElementInit = googleTranslateElementInit;
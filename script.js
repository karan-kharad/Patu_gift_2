// Love Prescription Generator
class LovePrescriptionGenerator {
    constructor() {
        this.prescriptions = [
            "Take 1 hug, 2 kisses, repeat daily 💕",
            "Take 3 virtual hugs + 5 heart emojis 😘",
            "Text me every morning ☀️",
            "Inject one cute memory of us into your day 💌",
            "5–10 minutes of virtual cuddle therapy 📹",
            "Consume chocolates thinking of me 🍫",
            "Close your eyes, think of our favorite moment 💞",
            "Take one goodnight message before bed 🌙",
            "Watch a funny video/meme I sent 😂",
            "Daily intake: 1 'I love you' from me ❤️"
        ];

        this.currentIndex = -1;
        this.initializeElements();
        this.setupEventListeners();
        this.setCurrentDate();
    }

    initializeElements() {
        this.prescriptionCard = document.getElementById('prescriptionCard');
        this.prescriptionText = document.getElementById('prescriptionText');
        this.generateBtn = document.getElementById('generateBtn');
        this.patientNameInput = document.getElementById('patientName');
        this.doctorNameSpan = document.getElementById('doctorName');
        this.currentDateSpan = document.getElementById('currentDate');
    }

    setupEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generatePrescription());

        // Update doctor name when patient name changes
        this.patientNameInput.addEventListener('input', () => {
            this.updateDoctorName();
        });

        // Add some interactive effects
        this.prescriptionCard.addEventListener('mouseenter', () => {
            this.prescriptionCard.style.transform = 'translateY(-5px) scale(1.02)';
        });

        this.prescriptionCard.addEventListener('mouseleave', () => {
            this.prescriptionCard.style.transform = 'translateY(0) scale(1)';
        });
    }

    setCurrentDate() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        this.currentDateSpan.textContent = now.toLocaleDateString('en-US', options);
    }

    updateDoctorName() {
        const patientName = this.patientNameInput.value.trim();
        if (patientName) {
            this.doctorNameSpan.textContent = `Dr. Love, MD in Love`;
        } else {
            this.doctorNameSpan.textContent = `Your Name, MD in Love`;
        }
    }

    getRandomPrescription() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.prescriptions.length);
        } while (randomIndex === this.currentIndex && this.prescriptions.length > 1);

        this.currentIndex = randomIndex;
        return this.prescriptions[randomIndex];
    }

    generatePrescription() {
        // Disable button temporarily
        this.generateBtn.disabled = true;
        this.generateBtn.textContent = 'Generating...';

        // Add loading animation
        this.prescriptionText.style.opacity = '0.5';
        this.prescriptionText.style.transform = 'scale(0.95)';

        setTimeout(() => {
            const newPrescription = this.getRandomPrescription();

            // Fade out current text
            this.prescriptionText.style.opacity = '0';
            this.prescriptionText.style.transform = 'translateY(20px)';

            setTimeout(() => {
                // Update text
                this.prescriptionText.textContent = newPrescription;

                // Fade in with animation
                this.prescriptionText.style.opacity = '1';
                this.prescriptionText.style.transform = 'translateY(0)';

                // Add bounce animation to the card
                this.prescriptionCard.classList.add('bounce');

                // Reset button
                this.generateBtn.disabled = false;
                this.generateBtn.textContent = 'Generate New Prescription';

                // Remove bounce class after animation
                setTimeout(() => {
                    this.prescriptionCard.classList.remove('bounce');
                }, 600);

            }, 300);

        }, 800);
    }

    // Add some fun interactive features
    addSparkleEffect() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';

        // Random position
        const rect = this.prescriptionCard.getBoundingClientRect();
        sparkle.style.left = Math.random() * rect.width + 'px';
        sparkle.style.top = Math.random() * rect.height + 'px';

        this.prescriptionCard.style.position = 'relative';
        this.prescriptionCard.appendChild(sparkle);

        // Animate sparkle
        sparkle.style.animation = 'sparkle 1s ease-out forwards';

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add sparkle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new LovePrescriptionGenerator();

    // Add some extra interactivity
    const prescriptionCard = document.getElementById('prescriptionCard');

    // Add sparkle effect on click
    prescriptionCard.addEventListener('click', (e) => {
        if (e.target.id !== 'generateBtn') {
            app.addSparkleEffect();
        }
    });

    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            app.generatePrescription();
        }
    });

    // Add some initial animation
    setTimeout(() => {
        prescriptionCard.classList.add('fade-in');
    }, 100);
});

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiIndex) window.konamiIndex = 0;

    if (e.keyCode === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            // Special prescription for Konami code
            const specialPrescription = "🎮 Special Rx: Play games together, Level up your love! 🎮";
            document.getElementById('prescriptionText').textContent = specialPrescription;
            document.getElementById('prescriptionCard').classList.add('bounce');
            setTimeout(() => {
                document.getElementById('prescriptionCard').classList.remove('bounce');
            }, 600);
            window.konamiIndex = 0;
        }
    } else {
        window.konamiIndex = 0;
    }
});

/**
 * ==========================================================================
 * ROYAL 3D INDIAN WEDDING INVITATION - CLIENT INTERACTION SCRIPT
 * Handles:
 * - 3D gate opening sequence with audio & visual effects
 * - Web Audio API temple chimes & background music controller
 * - Lightweight canvas golden particle & marigold/rose petal animations
 * - Dynamic rendering from weddingDetails configuration
 * - Downloadable .ics calendar event generation
 * - Google Maps venue integration
 * - Web Share API & WhatsApp sharing with clipboard copy fallback
 * - Print handling and performance/accessibility optimizations
 * ==========================================================================
 */

(function () {
    "use strict";

    // Guard: only execute if browser DOM is available
    if (typeof window === "undefined" || typeof document === "undefined") {
        return;
    }

    // --------------------------------------------------------------------------
    // 1. DOM Element References
    // --------------------------------------------------------------------------
    const elements = {
        gateExperience: document.getElementById("gateExperience"),
        btnOpenGate: document.getElementById("btnOpenGate"),
        mainContainer: document.getElementById("mainInvitationContainer"),
        particlesCanvas: document.getElementById("particlesCanvas"),
        
        // Music controller
        musicController: document.getElementById("musicController"),
        btnToggleMusic: document.getElementById("btnToggleMusic"),
        musicStatusText: document.getElementById("musicStatusText"),
        weddingAudio: document.getElementById("weddingAudio"),
        
        // Toast
        toastNotice: document.getElementById("toastNotice"),
        
        // Action buttons
        btnAddToCalendar: document.getElementById("btnAddToCalendar"),
        btnOpenVenueMap: document.getElementById("btnOpenVenueMap"),
        btnShareInvitation: document.getElementById("btnShareInvitation"),
        btnShareWhatsapp: document.getElementById("btnShareWhatsapp"),
        btnPrintInvitation: document.getElementById("btnPrintInvitation")
    };

    // State variables
    let isGateOpened = false;
    let isAudioPlaying = false;
    let webAudioContext = null;
    let synthIntervalId = null;

    // --------------------------------------------------------------------------
    // 2. Data Initialization & Dynamic Rendering
    // --------------------------------------------------------------------------
    function initWeddingContent() {
        const data = window.weddingDetails || {};

        // Helper: safe text setter
        function setSafeText(id, value) {
            const el = document.getElementById(id);
            if (el) {
                if (value !== undefined && value !== null && String(value).trim() !== "") {
                    el.textContent = value;
                } else {
                    // Hide parent or wrapper if value is completely empty
                    const parent = el.closest(".hide-if-empty");
                    if (parent) parent.style.display = "none";
                }
            }
        }

        // Set Gate Introductory Text
        setSafeText("gateSacredHeading", data.sacredHeading || "॥ श्री गणेशाय नमः ॥");
        setSafeText("gateSacredSubtitle", data.sacredSubtitle || "With the Blessings of Lord Ganesha");
        setSafeText("gateCelebrationTagline", data.celebrationTagline || "A Celebration of Love, Family & Togetherness");

        // Set Sanctuary Text
        setSafeText("sanctuaryShree", data.sacredHeading || "॥ श्री गणेशाय नमः ॥");
        setSafeText("sanctuaryBlessing", data.sacredSubtitle || "With the Blessings of Lord Ganesha");

        // Set Main Invitation Content
        setSafeText("invitationBanner", data.invitationBanner || "WEDDING INVITATION");
        setSafeText("invitationOpening", data.invitationOpening || "With immense joy and the blessings of our family, we invite you to celebrate the wedding of");

        // Couple details
        setSafeText("brideNameText", data.brideName || "Radhika");
        
        const brideParentsEl = document.getElementById("brideParentsText");
        if (brideParentsEl) {
            if (data.brideFatherName || data.brideMotherName) {
                const father = data.brideFatherName || "";
                const mother = data.brideMotherName || "";
                const separator = (father && mother) ? " and " : "";
                brideParentsEl.textContent = `Daughter of ${father}${separator}${mother}`;
            } else {
                brideParentsEl.style.display = "none";
            }
        }

        setSafeText("groomNameText", data.groomName || "Aditya");
        const groomParentsEl = document.getElementById("groomParentsText");
        if (groomParentsEl) {
            if (data.groomFatherName || data.groomMotherName) {
                const father = data.groomFatherName || "";
                const mother = data.groomMotherName || "";
                const separator = (father && mother) ? " and " : "";
                groomParentsEl.textContent = `Son of ${father}${separator}${mother}`;
            } else {
                groomParentsEl.style.display = "none";
            }
        }

        // Ceremony Key Details
        setSafeText("displayWeddingDate", data.weddingDateFormatted || data.weddingDate || "Tuesday, 24th November 2026");
        setSafeText("displayWeddingTime", data.weddingTime || "07:00 PM onwards");
        setSafeText("displayMuhuratTime", data.muhuratTime || "Shubh Vivah Muhurat: 09:15 PM");
        setSafeText("displayVenueName", data.venue || "KHATU SHYAM MARIAGE LAWN");
        setSafeText("displayVenueAddress", data.address || "");

        // Couple Portrait image update
        const coupleImg = document.getElementById("couplePortraitImg");
        if (coupleImg && data.brideGroomPhoto) {
            coupleImg.src = data.brideGroomPhoto;
            if (data.brideGroomPhotoFallback) {
                coupleImg.onerror = function() {
                    coupleImg.src = data.brideGroomPhotoFallback;
                };
            }
        }

        // Closing Notes
        setSafeText("closingNoteText", data.closingNote || "Your gracious presence and heartfelt blessings will make our celebration even more special.");
        setSafeText("rsvpNoteText", data.rsvpNote || "With Best Compliments from Near & Dear Relatives and Friends");

        // Render Events Section
        renderEventsList(data.events);

        // Configure Venue Map Link (both card inline button and bottom action button)
        setupVenueMapLink(data);

        // Configure Calendar Button (if present)
        setupCalendarButton(data);
    }

    /**
     * Render the schedule of wedding ceremonies
     */
    function renderEventsList(events) {
        const eventsContainer = document.getElementById("eventsGrid");
        const eventsSection = document.getElementById("eventsSection");
        if (!eventsContainer || !eventsSection) return;

        if (!Array.isArray(events) || events.length === 0) {
            eventsSection.style.display = "none";
            return;
        }

        // Clear existing items
        eventsContainer.innerHTML = "";

        const defaultIcons = {
            haldi: "🌼",
            mehendi: "🌿",
            wedding: "🪔",
            reception: "✨",
            sangeet: "🪕",
            default: "🪷"
        };

        events.forEach((ev) => {
            if (!ev || !ev.name) return;

            const card = document.createElement("div");
            card.className = "event-card";

            const iconChar = defaultIcons[ev.icon] || defaultIcons.default;

            const headerHtml = `
                <div class="event-card-header">
                    <div class="event-card-icon-wrapper" aria-hidden="true">${iconChar}</div>
                    <div class="event-card-titles">
                        ${ev.hindiName ? `<div class="event-hindi-name">${escapeHtml(ev.hindiName)}</div>` : ""}
                        <h3 class="event-english-name">${escapeHtml(ev.name)}</h3>
                    </div>
                </div>
            `;

            let detailsHtml = '<ul class="event-details-list">';
            if (ev.dateFormatted || ev.date) {
                detailsHtml += `
                    <li class="event-detail-row">
                        <span class="row-icon" aria-hidden="true">📅</span>
                        <span><strong>Date:</strong> ${escapeHtml(ev.dateFormatted || ev.date)}</span>
                    </li>
                `;
            }
            if (ev.time) {
                detailsHtml += `
                    <li class="event-detail-row">
                        <span class="row-icon" aria-hidden="true">⏰</span>
                        <span><strong>Time:</strong> ${escapeHtml(ev.time)}</span>
                    </li>
                `;
            }
            if (ev.venue) {
                const mapsUrl = window.weddingDetails && window.weddingDetails.mapsUrl;
                const isWeddingVenue = ev.venue.includes("KHATU SHYAM") || (ev.name && ev.name.includes("Wedding"));
                const venueLinkHtml = (isWeddingVenue && mapsUrl)
                    ? `<br><a href="${escapeHtml(mapsUrl)}" target="_blank" rel="noopener noreferrer" style="color: #780D22; text-decoration: underline; font-weight: 600; font-size: 0.9rem; display: inline-block; margin-top: 4px;">📍 Open in Google Maps ↗</a>`
                    : "";
                detailsHtml += `
                    <li class="event-detail-row">
                        <span class="row-icon" aria-hidden="true">📍</span>
                        <span><strong>Venue:</strong> ${escapeHtml(ev.venue)}${venueLinkHtml}</span>
                    </li>
                `;
            }
            if (ev.description) {
                detailsHtml += `
                    <li class="event-detail-row">
                        <span class="row-icon" aria-hidden="true">🌸</span>
                        <span style="font-style: italic;">${escapeHtml(ev.description)}</span>
                    </li>
                `;
            }
            detailsHtml += '</ul>';

            let dressCodeHtml = "";
            if (ev.dressCode) {
                dressCodeHtml = `
                    <div class="event-dress-code">
                        <strong>Dress Code:</strong> ${escapeHtml(ev.dressCode)}
                    </div>
                `;
            }

            card.innerHTML = headerHtml + detailsHtml + dressCodeHtml;
            eventsContainer.appendChild(card);
        });
    }

    /**
     * Set up Google Maps navigation button
     */
    function setupVenueMapLink(data) {
        let mapHref = "";
        if (data.mapsUrl && data.mapsUrl.trim() !== "") {
            mapHref = data.mapsUrl.trim();
        } else if (data.address && data.address.trim() !== "") {
            mapHref = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(data.address.trim());
        } else if (data.venue && data.venue.trim() !== "") {
            mapHref = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(data.venue.trim());
        }

        const directLinkEl = document.getElementById("venueDirectMapLink");

        if (mapHref) {
            if (elements.btnOpenVenueMap) {
                elements.btnOpenVenueMap.href = mapHref;
                elements.btnOpenVenueMap.target = "_blank";
                elements.btnOpenVenueMap.rel = "noopener noreferrer";
            }
            if (directLinkEl) {
                directLinkEl.href = mapHref;
                directLinkEl.target = "_blank";
                directLinkEl.rel = "noopener noreferrer";
            }
        } else {
            if (elements.btnOpenVenueMap) elements.btnOpenVenueMap.style.display = "none";
            if (directLinkEl) directLinkEl.style.display = "none";
        }
    }

    /**
     * Set up "Add to Calendar" button to download RFC 5545 .ics file
     */
    function setupCalendarButton(data) {
        if (!elements.btnAddToCalendar) return;

        if (!data.weddingDate || data.weddingDate.trim() === "") {
            elements.btnAddToCalendar.style.display = "none";
            return;
        }

        elements.btnAddToCalendar.addEventListener("click", function (e) {
            e.preventDefault();
            generateAndDownloadICS(data);
        });
    }

    /**
     * Generate and download valid .ics calendar file
     */
    function generateAndDownloadICS(data) {
        const rawDate = data.weddingDate.replace(/-/g, ""); // YYYYMMDD
        const startDate = rawDate + "T133000Z"; // ~7:00 PM IST (UTC +5:30)
        const endDate = rawDate + "T183000Z";   // ~midnight IST

        const title = `Wedding Ceremony: ${data.brideName || 'Bride'} & ${data.groomName || 'Groom'}`;
        const description = `॥ श्री गणेशाय नमः ॥\\nWedding ceremony celebration of ${data.brideName} and ${data.groomName}.\\nVenue: ${data.venue || ''}, ${data.address || ''}`;
        const location = `${data.venue || ''}, ${data.address || ''}`.trim();

        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Royal Wedding Invitation//EN",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            `UID:wedding-${rawDate}-${Date.now()}@weddinginvitation.local`,
            `DTSTAMP:${formatUtcDate(new Date())}`,
            `DTSTART:${startDate}`,
            `DTEND:${endDate}`,
            `SUMMARY:${cleanIcsString(title)}`,
            `DESCRIPTION:${cleanIcsString(description)}`,
            `LOCATION:${cleanIcsString(location)}`,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Wedding_Invitation_${(data.brideName || 'Sister')}_${(data.groomName || 'Groom')}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("📅 Wedding date saved to your calendar!");
    }

    function formatUtcDate(date) {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }

    function cleanIcsString(str) {
        return str.replace(/,/g, "\\,").replace(/;/g, "\\;");
    }

    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // --------------------------------------------------------------------------
    // 3. Audio & Web Audio Synthesizer (Temple Chime & Raga Yaman Drone)
    // --------------------------------------------------------------------------
    function getAudioContext() {
        if (!webAudioContext) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                webAudioContext = new AudioCtx();
            }
        }
        if (webAudioContext && webAudioContext.state === "suspended") {
            webAudioContext.resume();
        }
        return webAudioContext;
    }

    /**
     * Auspicious Sacred Temple Bell Chime on gate open
     */
    function playSacredTempleBell() {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            // Auspicious bell frequencies (Hz): Pa, Sa, Ga high resonance
            const frequencies = [554.37, 659.25, 830.61, 1108.73];

            frequencies.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + idx * 0.12);

                // Bell strike exponential decay envelope
                gain.gain.setValueAtTime(0.0001, now + idx * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.25 / (idx + 1), now + idx * 0.12 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 3.2);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.12);
                osc.stop(now + idx * 0.12 + 3.5);
            });
        } catch (e) {
            console.warn("Web Audio chime could not play:", e);
        }
    }

    /**
     * Start Background Music (HTML5 Audio with Web Audio Synthesizer fallback)
     */
    function startBackgroundMusic() {
        if (isAudioPlaying) return;

        const audioEl = elements.weddingAudio;
        if (audioEl) {
            audioEl.volume = 0.55;
            const playPromise = audioEl.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setAudioPlayingState(true);
                    })
                    .catch((err) => {
                        console.log("Audio file auto-play deferred or unavailable, starting melodic synth fallback:", err);
                        // If local audio file is not playable, start melodic soothing tanpura drone fallback
                        const data = window.weddingDetails || {};
                        if (data.audio && data.audio.enableSynthesizerFallback) {
                            startIndianTanpuraSynth();
                            setAudioPlayingState(true);
                        }
                    });
            }
        }
    }

    function toggleBackgroundMusic() {
        if (isAudioPlaying) {
            // Pause
            if (elements.weddingAudio && !elements.weddingAudio.paused) {
                elements.weddingAudio.pause();
            }
            stopIndianTanpuraSynth();
            setAudioPlayingState(false);
            showToast("🔇 Music paused");
        } else {
            // Play
            getAudioContext();
            startBackgroundMusic();
            showToast("🎵 Playing wedding melodies");
        }
    }

    function setAudioPlayingState(playing) {
        isAudioPlaying = playing;
        if (elements.musicController) {
            if (playing) {
                elements.musicController.classList.add("is-playing");
                if (elements.btnToggleMusic) elements.btnToggleMusic.classList.add("playing");
                if (elements.musicStatusText) elements.musicStatusText.textContent = "Music Playing";
                if (elements.btnToggleMusic) elements.btnToggleMusic.setAttribute("aria-label", "Pause wedding music");
            } else {
                elements.musicController.classList.remove("is-playing");
                if (elements.btnToggleMusic) elements.btnToggleMusic.classList.remove("playing");
                if (elements.musicStatusText) elements.musicStatusText.textContent = "Play Music";
                if (elements.btnToggleMusic) elements.btnToggleMusic.setAttribute("aria-label", "Play wedding music");
            }
        }
    }

    /**
     * Ambient Indian Classical Tanpura synthesizer fallback using Web Audio API
     */
    let synthNodes = [];
    function startIndianTanpuraSynth() {
        stopIndianTanpuraSynth();
        const ctx = getAudioContext();
        if (!ctx) return;

        const stringNotes = [207.65, 277.18, 277.18, 138.59]; // Pa, Sa, Sa, Sa
        let strIdx = 0;

        function pluckString() {
            if (!isAudioPlaying) return;
            try {
                const now = ctx.currentTime;
                const freq = stringNotes[strIdx % stringNotes.length];
                strIdx++;

                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.0001, now);
                gain.gain.exponentialRampToValueAtTime(0.12, now + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 4.0);
                synthNodes.push(osc);
            } catch (e) {
                console.warn(e);
            }
        }

        pluckString();
        synthIntervalId = setInterval(pluckString, 1400);
    }

    function stopIndianTanpuraSynth() {
        if (synthIntervalId) {
            clearInterval(synthIntervalId);
            synthIntervalId = null;
        }
        synthNodes.forEach(node => {
            try { node.stop(); } catch (e) {}
        });
        synthNodes = [];
    }

    // --------------------------------------------------------------------------
    // 4. SCENE TWO: CINEMATIC 3D GATE-OPENING ANIMATION
    // --------------------------------------------------------------------------
    function openWeddingGate() {
        if (isGateOpened) return;
        isGateOpened = true;

        // 1. Disable button immediately
        if (elements.btnOpenGate) {
            elements.btnOpenGate.disabled = true;
            elements.btnOpenGate.style.cursor = "default";
        }

        // 2. Play auspicious temple chimes & start music
        playSacredTempleBell();
        startBackgroundMusic();

        // 3. Trigger 3D door rotation CSS classes
        if (elements.gateExperience) {
            elements.gateExperience.classList.add("opening");
        }

        // 4. Trigger celebration particle & petal burst
        particleSystem.burstCelebration();

        // 5. Allow reduced motion smooth bypass
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const gateDuration = prefersReducedMotion ? 800 : 2600;

        // 6. Reveal invitation content and unlock scrolling
        setTimeout(() => {
            document.body.classList.remove("gate-closed");
            document.body.classList.add("invitation-revealed");

            // Dismiss gate overlay gently
            if (elements.gateExperience) {
                elements.gateExperience.classList.add("dismissed");
                elements.gateExperience.setAttribute("aria-hidden", "true");
            }

            // Smoothly scroll to main invitation if viewport requires
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        }, gateDuration);
    }

    // --------------------------------------------------------------------------
    // 5. SCENE SEVEN: GOLDEN PARTICLES & MARIGOLD/ROSE PETALS CANVAS
    // --------------------------------------------------------------------------
    const particleSystem = (function () {
        const canvas = elements.particlesCanvas;
        if (!canvas) return { burstCelebration: () => {} };

        const ctx = canvas.getContext("2d");
        let width = 0;
        let height = 0;
        let animationFrameId = null;
        let isRunning = false;

        const isMobile = window.innerWidth < 768;
        const maxParticles = isMobile ? 22 : 45;
        const maxPetals = isMobile ? 10 : 20;

        const particles = [];
        const petals = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class GoldParticle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : height + 10;
                this.radius = Math.random() * 2.2 + 0.8;
                this.speedY = Math.random() * 0.7 + 0.3;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.alpha = Math.random() * 0.6 + 0.2;
                this.alphaPulse = Math.random() * 0.02 + 0.005;
                this.color = Math.random() > 0.3 ? "#F5D989" : "#C9A24A";
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.alpha += this.alphaPulse;

                if (this.alpha > 0.85 || this.alpha < 0.15) {
                    this.alphaPulse = -this.alphaPulse;
                }

                if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#F5D989";
                ctx.fill();
                ctx.restore();
            }
        }

        class FlowerPetal {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : -30;
                this.size = Math.random() * 12 + 10;
                this.speedY = Math.random() * 1.2 + 0.8;
                this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
                this.angle = Math.random() * 360;
                this.spinSpeed = (Math.random() - 0.5) * 2;
                this.swayFreq = Math.random() * 0.02 + 0.01;
                this.swayAmp = Math.random() * 25 + 10;
                this.time = Math.random() * 100;
                // Marigold (genda yellow-orange) or Rose (gulab deep red-pink)
                this.isMarigold = Math.random() > 0.45;
                this.color = this.isMarigold ? "#FFB703" : "#C9184A";
                this.highlight = this.isMarigold ? "#FB8500" : "#FF758F";
                this.alpha = Math.random() * 0.35 + 0.55;
            }

            update() {
                this.time++;
                this.y += this.speedY;
                this.x += Math.sin(this.time * this.swayFreq) * 0.8 + this.speedX * 0.5;
                this.angle += this.spinSpeed;

                if (this.y > height + 40 || this.x < -30 || this.x > width + 30) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.angle * Math.PI) / 180);
                ctx.globalAlpha = this.alpha;

                // Draw organic petal teardrop shape
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.bezierCurveTo(this.size * 0.7, -this.size * 0.5, this.size * 0.7, this.size * 0.5, 0, this.size);
                ctx.bezierCurveTo(-this.size * 0.7, this.size * 0.5, -this.size * 0.7, -this.size * 0.5, 0, -this.size);

                const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
                grad.addColorStop(0, this.highlight);
                grad.addColorStop(1, this.color);
                ctx.fillStyle = grad;
                ctx.shadowBlur = 6;
                ctx.shadowColor = "rgba(0,0,0,0.2)";
                ctx.fill();

                ctx.restore();
            }
        }

        function init() {
            resize();
            window.addEventListener("resize", resize, { passive: true });

            for (let i = 0; i < maxParticles; i++) {
                particles.push(new GoldParticle());
            }
            for (let j = 0; j < maxPetals; j++) {
                petals.push(new FlowerPetal());
            }

            start();
        }

        function loop() {
            if (!isRunning) return;

            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            for (let j = 0; j < petals.length; j++) {
                petals[j].update();
                petals[j].draw();
            }

            animationFrameId = requestAnimationFrame(loop);
        }

        function start() {
            if (!isRunning) {
                isRunning = true;
                loop();
            }
        }

        function stop() {
            isRunning = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }

        function burstCelebration() {
            // Add a burst of rising golden sparkles and extra shower petals
            for (let i = 0; i < 20; i++) {
                const p = new GoldParticle();
                p.x = width / 2 + (Math.random() - 0.5) * (width * 0.5);
                p.y = height * 0.5 + (Math.random() - 0.5) * 100;
                p.speedY = Math.random() * 3 + 1.5;
                p.alpha = 0.95;
                particles.push(p);
            }
            // Trim back over time
            setTimeout(() => {
                if (particles.length > maxParticles) {
                    particles.splice(maxParticles, particles.length - maxParticles);
                }
            }, 4000);
        }

        // Pause when tab is hidden to save CPU/battery
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        });

        init();

        return {
            burstCelebration: burstCelebration
        };
    })();

    // --------------------------------------------------------------------------
    // 6. SCENE NINE: SHARING (WEB SHARE API & WHATSAPP)
    // --------------------------------------------------------------------------
    function setupSharing() {
        const shareData = (window.weddingDetails && window.weddingDetails.share) || {};
        const title = shareData.title || "Royal Wedding Invitation";
        const message = shareData.message || "॥ श्री गणेशाय नमः ॥ Please open our interactive Royal Wedding Invitation:";
        
        // Use configured public URL or current location
        let publicUrl = shareData.publicUrl && shareData.publicUrl.trim() !== "" 
            ? shareData.publicUrl.trim() 
            : window.location.href;

        // Native Web Share or Copy Link
        if (elements.btnShareInvitation) {
            elements.btnShareInvitation.addEventListener("click", async () => {
                const fullShareText = `${message}\n${publicUrl}`;

                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: title,
                            text: message,
                            url: publicUrl
                        });
                        showToast("✨ Invitation shared successfully!");
                        return;
                    } catch (err) {
                        if (err.name !== "AbortError") {
                            console.warn("Share API fallback:", err);
                        }
                    }
                }

                // Clipboard Copy Fallback
                copyToClipboard(publicUrl);
            });
        }

        // Dedicated WhatsApp Sharing
        if (elements.btnShareWhatsapp) {
            elements.btnShareWhatsapp.addEventListener("click", () => {
                const fullText = `${message}\n${publicUrl}`;
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            });
        }
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showToast("✨ Invitation link copied to clipboard!");
            }).catch(() => {
                execCommandCopyFallback(text);
            });
        } else {
            execCommandCopyFallback(text);
        }
    }

    function execCommandCopyFallback(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
            showToast("✨ Invitation link copied to clipboard!");
        } catch (err) {
            prompt("Copy this wedding invitation link:", text);
        }
        document.body.removeChild(textArea);
    }

    function showToast(message) {
        if (!elements.toastNotice) return;
        elements.toastNotice.textContent = message;
        elements.toastNotice.classList.add("show");

        setTimeout(() => {
            elements.toastNotice.classList.remove("show");
        }, 3400);
    }

    // --------------------------------------------------------------------------
    // 7. SCENE TEN: PRINT INVITATION
    // --------------------------------------------------------------------------
    function setupPrint() {
        if (elements.btnPrintInvitation) {
            elements.btnPrintInvitation.addEventListener("click", () => {
                window.print();
            });
        }
    }

    // --------------------------------------------------------------------------
    // 8. Event Listeners & Bootstrapping
    // --------------------------------------------------------------------------
    function init() {
        // Render all data
        initWeddingContent();

        // 3D Gate Open Click Event
        if (elements.btnOpenGate) {
            elements.btnOpenGate.addEventListener("click", openWeddingGate);
            // Allow keyboard activation (Enter / Space)
            elements.btnOpenGate.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openWeddingGate();
                }
            });
        }

        // Music toggle click event
        if (elements.btnToggleMusic) {
            elements.btnToggleMusic.addEventListener("click", toggleBackgroundMusic);
        }

        // Audio ended loop reassurance
        if (elements.weddingAudio) {
            elements.weddingAudio.addEventListener("ended", () => {
                elements.weddingAudio.currentTime = 0;
                elements.weddingAudio.play().catch(() => {});
            });
        }

        // Setup Social Sharing & Print
        setupSharing();
        setupPrint();
    }

    // Run on DOM Ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();

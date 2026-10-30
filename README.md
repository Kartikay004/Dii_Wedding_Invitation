# 🪔 Royal Indian 3D Wedding Invitation Website

A cinematic, interactive Hindu wedding invitation website designed with the aesthetics of an Indian royal palace entrance. Features realistic 3D gates that swing open around realistic hinges to reveal Lord Ganesha, a rotating golden mandala chakra, ambient golden particle lights, falling marigold and rose petals, traditional wedding ceremonies schedule, Google Maps venue navigation, "Add to Calendar" (.ics download), WhatsApp sharing, and background wedding music.

---

## ✨ Features & Highlights

1. **Cinematic 3D Palace Gate**:
   - Two doors meet in the center with Rajasthani gold filigree carvings, brass lion knockers, and realistic depth.
   - On clicking **"✨ OPEN WEDDING INVITATION ✨"**, the doors rotate outward in 3D around their respective hinge edges (`rotateY(-115deg)` / `rotateY(115deg)`).
2. **Divine Lord Ganesha & Rotating Golden Chakra**:
   - Continuous golden mandala chakra rotation with soft warm glow.
   - Sacred Sanskrit invocation: *"॥ श्री गणेशाय नमः ॥"*.
3. **Parchment Royal Wedding Card**:
   - Double gold borders with antique corner flourishes.
   - Refined typography emphasizing bride and groom names, parental blessings, muhurat time, and venue.
4. **Wedding Ceremonies Schedule (Events)**:
   - Dedicated cards for Haldi, Mehendi & Sangeet, Wedding Ceremony (Saat Phere), and Reception.
   - Responsive grid on desktop, vertical stack on mobile.
5. **Interactive Controls & Actions**:
   - 📅 **Add to Calendar**: Generates and downloads a valid RFC 5545 `.ics` calendar event.
   - 📍 **Open Venue in Google Maps**: Direct link to the wedding venue address in a new tab.
   - 💬 **WhatsApp & Social Sharing**: Uses Web Share API on mobile, with direct WhatsApp link and one-click clipboard copy fallback with toast confirmation.
   - 🖨️ **Print Invitation**: Clean `@media print` styling to print a high-resolution invitation card.
6. **Background Music Player**:
   - Floating audio widget with play/pause button and animated equalizer soundbars.
   - Supports local audio files (`wedding-music.mp3` / `wedding-music.wav`) and features a soothing Web Audio API classical Tanpura/shehnai synthesizer fallback if the audio file is missing.
7. **Mobile Optimized & Accessible**:
   - Fully responsive for smartphones (360px, 390px, 430px), tablets, and desktop displays.
   - Respects `prefers-reduced-motion` and pauses particle animations when the browser tab is hidden to save battery.

---

## 📁 Project Structure

```text
Adarsh/
├── index.html              # Main website entry point
├── vercel.json             # Static hosting and cache configuration
├── .gitignore              # Ignored files for Git
├── README.md               # Beginner documentation & deployment guide
│
├── css/
│   └── style.css           # 3D transforms, animations, gold gradients & print CSS
│
├── js/
│   ├── wedding-data.js     # CUSTOMIZE WEDDING DETAILS HERE
│   └── script.js           # 3D gate sequencing, audio, canvas particles & sharing
│
└── assets/
    ├── images/
    │   ├── ganesha.webp    # Lord Ganesha illustration
    │   ├── chakra.webp     # Rotating golden mandala chakra
    │   ├── gate-left.webp  # Left door panel
    │   ├── gate-right.webp # Right door panel
    │   └── floral-border.webp # Antique gold filigree divider
    │
    └── audio/
        ├── wedding-music.mp3 # Wedding music track
        └── wedding-music.wav # Auspicious audio track
```

---

## 🛠️ How to Customize Wedding Details

All wedding information is centrally located in **`js/wedding-data.js`**. You do not need to touch any HTML or CSS to change names, dates, or venues!

Open `js/wedding-data.js` in any text editor and update:

```javascript
const weddingDetails = {
    // Sacred Invocations
    sacredHeading: "॥ श्री गणेशाय नमः ॥",
    sacredSubtitle: "With the Blessings of Lord Ganesha",
    celebrationTagline: "A Celebration of Love, Family & Togetherness",

    // Bride Information
    brideName: "Radhika",
    brideFatherName: "Shri Rajeshwar Sharma",
    brideMotherName: "Smt. Sunita Sharma",

    // Groom Information
    groomName: "Aditya",
    groomFatherName: "Shri Mahendra Verma",
    groomMotherName: "Smt. Pushpa Verma",

    // Main Wedding Details (YYYY-MM-DD format for calendar)
    weddingDate: "2026-11-28",
    weddingDateFormatted: "Saturday, 28th November 2026",
    weddingTime: "07:00 PM onwards",
    muhuratTime: "Shubh Vivah Muhurat: 09:15 PM",

    // Venue & Location
    venue: "The Grand Heritage Palace",
    address: "Palace Road, Near Royal Gardens, Civil Lines, Jaipur, Rajasthan - 302006",
    mapsUrl: "https://maps.google.com/?q=The+Grand+Heritage+Palace+Jaipur",

    // Events Schedule
    events: [
        {
            name: "Haldi Ceremony",
            hindiName: "हल्दी की रस्म",
            dateFormatted: "Friday, 27th November 2026",
            time: "10:00 AM",
            venue: "Poolside Courtyard",
            dressCode: "Sunshine Yellow",
            icon: "haldi"
        },
        // ... more events
    ]
};
```

> **Note**: If any field is left empty (`""`), the website will automatically hide that label without displaying empty brackets or broken text.

---

## 🎵 Replacing Images and Audio

- **Replace Music**: Place your chosen MP3 file at `assets/audio/wedding-music.mp3`.
- **Replace Ganesha Image**: Place your preferred transparent PNG or WebP image at `assets/images/ganesha.webp` (or `ganesha.png`).
- **Replace Gate Doors**: The gate door panels are stored at `assets/images/gate-left.webp` and `assets/images/gate-right.webp`.

---

## 💻 How to Run Locally

You can test and view the website locally using any lightweight static web server:

### Option A: Using Python (Built-in)
Open PowerShell or Terminal in the project folder and run:
```bash
python -m http.server 3000
```
Then open your browser at: `http://localhost:3000`

### Option B: Using Node.js (npx)
```bash
npx serve .
```

### Option C: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🚀 Step-by-Step Deployment Guide (Free on Vercel)

This website has zero backend dependencies and is 100% ready for free, instant deployment on **Vercel** or **GitHub Pages**.

### Step 1: Initialize Git and Commit Your Files
Open PowerShell in this folder and run:
```bash
git init
git add .
git commit -m "Initial commit: Royal 3D Indian Wedding Invitation"
```

### Step 2: Push to GitHub
1. Go to [github.com](https://github.com) and click **"New repository"**.
2. Name it (e.g., `wedding-invitation`), set it to **Public** or **Private**, and click **Create repository**.
3. Copy the push commands shown on GitHub and run them in PowerShell:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
   git push -u origin main
   ```

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and log in (or sign up with your GitHub account).
2. Click **"Add New..."** → **"Project"**.
3. Under **Import Git Repository**, find your `wedding-invitation` repository and click **Import**.
4. Leave all build settings at default (Framework Preset: **Other**, Root Directory: `./`).
5. Click **Deploy**.
6. In ~15 seconds, Vercel will give you a public URL (e.g., `https://wedding-invitation-xyz.vercel.app`).

### Step 4: Share with Family & Friends
- Copy the public Vercel URL.
- Open `js/wedding-data.js` and paste your public link into `publicUrl` (or leave it blank so it automatically detects the URL).
- Share the link via WhatsApp, SMS, or email! Relatives can open the link on Android, iPhone, or laptop to enjoy the 3D palace gate experience.

---

## 🔄 Updating After Deployment

Whenever you want to change dates, times, or photos:
1. Edit `js/wedding-data.js` or swap image files.
2. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Update wedding details"
   git push origin main
   ```
3. Vercel automatically detects your push and updates the live website within seconds!

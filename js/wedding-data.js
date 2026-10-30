/**
 * WEDDING INVITATION CONFIGURATION
 * 
 * Customize this file with your sister's wedding details.
 * Instructions:
 * - Replace the placeholder values with actual names, dates, times, and venues.
 * - If any field is left empty (""), the website will gracefully omit that field
 *   without showing broken or empty labels.
 * - The 'weddingDate' in YYYY-MM-DD format is used to generate the downloadable calendar event (.ics).
 * - You can add, edit, or remove events in the 'events' array.
 */

const weddingDetails = {
    // Sacred & Spiritual Heading
    sacredHeading: "॥ श्री गणेशाय नमः ॥",
    sacredSubtitle: "With the Blessings of Lord Ganesha",
    celebrationTagline: "A Celebration of Love, Family & Togetherness",
    invitationBanner: "WEDDING INVITATION",
    invitationOpening: "With immense joy and the blessings of our family, we invite you to celebrate the wedding of",

    // Bride Information
    brideName: "Radhika",
    brideFatherName: "Shri Rajeshwar Sharma",
    brideMotherName: "Smt. Sunita Sharma",
    // Optional bride photo relative path (e.g. "assets/images/bride.jpg" or "dii.jpg"). Leave "" if none.
    bridePhoto: "",

    // Groom Information
    groomName: "Aditya",
    groomFatherName: "Shri Mahendra Verma",
    groomMotherName: "Smt. Pushpa Verma",

    // Main Wedding Details
    // Format YYYY-MM-DD is used for the calendar .ics generator
    weddingDate: "2026-11-28",
    weddingDateFormatted: "Saturday, 28th November 2026",
    weddingTime: "07:00 PM onwards",
    muhuratTime: "Shubh Vivah Muhurat: 09:15 PM",

    // Venue & Location
    venue: "The Grand Heritage Palace",
    address: "Palace Road, Near Royal Gardens, Civil Lines, Jaipur, Rajasthan - 302006",
    // Google Maps link: Leave empty to automatically search using the address
    mapsUrl: "https://maps.google.com/?q=The+Grand+Heritage+Palace+Jaipur",

    // Gracious Note & RSVP
    closingNote: "Your gracious presence and heartfelt blessings will make our celebration even more special.",
    rsvpNote: "With Best Compliments from Near & Dear Relatives and Friends",
    contactPhone: "+91 98765 43210",

    // Wedding Ceremonies / Schedule
    // Leave the array empty [] if you do not want to display an events section.
    // Any event with missing fields will only display available information.
    events: [
        {
            name: "Haldi Ceremony",
            hindiName: "हल्दी की रस्म",
            date: "2026-11-27",
            dateFormatted: "Friday, 27th November 2026",
            time: "10:00 AM",
            venue: "Poolside Courtyard, The Grand Heritage Palace",
            dressCode: "Sunshine Yellow / Traditional",
            description: "A joyful morning of turmeric blessings, marigold showers, and traditional folk sangeet.",
            icon: "haldi"
        },
        {
            name: "Mehendi & Sangeet",
            hindiName: "मेहंदी एवं संगीत",
            date: "2026-11-27",
            dateFormatted: "Friday, 27th November 2026",
            time: "06:30 PM",
            venue: "Royal Rangmahal Lawn, The Grand Heritage Palace",
            dressCode: "Emerald Green & Festive Glamour",
            description: "An enchanting evening of intricate henna artistry, dazzling dance performances, and music.",
            icon: "mehendi"
        },
        {
            name: "Wedding Ceremony",
            hindiName: "शुभ विवाह (सात फेरे)",
            date: "2026-11-28",
            dateFormatted: "Saturday, 28th November 2026",
            time: "07:00 PM (Baraat Swagat: 06:30 PM)",
            venue: "Rajwada Mandap, The Grand Heritage Palace",
            dressCode: "Royal Ethnic Attire",
            description: "The sacred saat phere around the holy agni kund as two souls unite for an eternity.",
            icon: "wedding"
        },
        {
            name: "Reception & Feast",
            hindiName: "आशीर्वाद समारोह एवं प्रीतिभोज",
            date: "2026-11-29",
            dateFormatted: "Sunday, 29th November 2026",
            time: "07:30 PM onwards",
            venue: "Imperial Grand Ballroom, The Grand Heritage Palace",
            dressCode: "Formal Indian / Tuxedos & Lehengas",
            description: "Join us for a royal gala dinner and shower your warm blessings upon the newly wedded couple.",
            icon: "reception"
        }
    ],

    // Audio & Background Music Settings
    audio: {
        musicSrc: "assets/audio/wedding-music.mp3",
        // When true, uses the browser Web Audio API to synthesize relaxing Indian tanpura/shehnai tones
        // if the local mp3 file is not found or not yet provided.
        enableSynthesizerFallback: true
    },

    // WhatsApp & Social Sharing
    share: {
        title: "Royal Wedding Invitation",
        // The message sent via WhatsApp or native share
        message: "॥ श्री गणेशाय नमः ॥\n\nWith immense joy, our family cordially invites you to the wedding ceremony of Radhika & Aditya.\n\nPlease open our interactive 3D Royal Wedding Invitation website:",
        // If left empty (""), the website uses the current public URL automatically
        publicUrl: ""
    }
};

// Export configuration for universal environment compatibility
if (typeof window !== "undefined") {
    window.weddingDetails = weddingDetails;
}
if (typeof globalThis !== "undefined") {
    globalThis.weddingDetails = weddingDetails;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = weddingDetails;
}


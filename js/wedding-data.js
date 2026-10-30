/**
 * WEDDING INVITATION CONFIGURATION
 * 
 * Customize this file with your sister's wedding details.
 * Instructions:
 * - Replace the values with actual names, dates, times, and venues.
 * - If any field is left empty (""), the website will gracefully omit that field
 *   without showing broken or empty labels.
 * - The 'events' array defines the ceremonies schedule.
 */

const weddingDetails = {
    // Sacred & Spiritual Heading
    sacredHeading: "॥ श्री गणेशाय नमः ॥",
    sacredSubtitle: "With the Blessings of Lord Ganesha",
    celebrationTagline: "A Celebration of Love, Family & Togetherness",
    invitationBanner: "WEDDING INVITATION",
    invitationOpening: "With immense joy and the blessings of our family, we invite you to celebrate the wedding of",

    // Bride Information
    brideName: "NAINSI SRIVASTAVA",
    brideFatherName: "Mr. SWADESH SRIVASTAVA",
    brideMotherName: "",

    // Groom Information
    groomName: "AMAN SRIVASTAVA",
    groomFatherName: "Mr. DINESH SRIVASTAVA",
    groomMotherName: "",

    // Couple Portrait Photo
    brideGroomPhoto: "assets/images/bride_groom_img.webp",
    brideGroomPhotoFallback: "assets/images/bride_groom_img.jpg",

    // Main Wedding Details
    weddingDate: "2026-11-24",
    weddingDateFormatted: "Tuesday, 24th November 2026",
    weddingTime: "07:00 PM onwards",
    muhuratTime: "Shubh Vivah Muhurat: 09:15 PM",

    // Venue & Location
    venue: "KHATU SHYAM MARIAGE LAWN",
    address: "Sidhauli Mishrikh Road Near Dak Bangla 261303",
    // Google Maps link provided
    mapsUrl: "https://www.google.com/maps/place/Care+%26+Fair/@27.284233,80.8283077,17z/data=!3m1!5s0x39993522c83c6a67:0xcc0960d0f6d86b84!4m20!1m13!4m12!1m3!2m2!1d80.8306743!2d27.2842757!1m6!1m2!1s0x399935beffe52cb1:0xec45006f1ca7ba58!2sCare+%26+Fair,+1+FLOOR,+NEW+MARKET,+near+NAGAR+PANCHAYAT,+Sidhauli,+Kashipur,+Uttar+Pradesh+261303!2m2!1d80.830822!2d27.2841154!3e2!3m5!1s0x399935beffe52cb1:0xec45006f1ca7ba58!8m2!3d27.2841154!4d80.830822!16s%2Fg%2F11sjhfj2lc?entry=ttu&g_ep=EgoyMDI2MTAyNy4wIKXMDSoASAFQAw%3D%3D",

    // Gracious Note & RSVP
    closingNote: "Your gracious presence and heartfelt blessings will make our celebration even more special.",
    rsvpNote: "With Best Compliments from Near & Dear Relatives and Friends",
    contactPhone: "+91 7523842238",

    // Wedding Ceremonies / Schedule
    // Reception removed as requested
    events: [
        {
            name: "Haldi Ceremony",
            hindiName: "हल्दी की रस्म",
            date: "2026-11-22",
            dateFormatted: "Sunday, 22nd November 2026",
            time: "6:00 PM",
            venue: "Srivastava Nivas",
            dressCode: "Sunshine Yellow / Traditional",
            description: "A joyful morning of turmeric blessings, marigold showers, and traditional folk sangeet.",
            icon: "haldi"
        },
        {
            name: "Mehendi & Sangeet",
            hindiName: "मेहंदी एवं संगीत",
            date: "2026-11-23",
            dateFormatted: "Monday, 23rd November 2026",
            time: "06:30 PM",
            venue: "Srivastava Nivas",
            dressCode: "Emerald Green & Festive Glamour",
            description: "An enchanting evening of intricate henna artistry, dazzling dance performances, and music.",
            icon: "mehendi"
        },
        {
            name: "Wedding Ceremony",
            hindiName: "शुभ विवाह (सात फेरे)",
            date: "2026-11-24",
            dateFormatted: "Tuesday, 24th November 2026",
            time: "07:00 PM (Baraat Swagat: 06:30 PM)",
            venue: "KHATU SHYAM MARIAGE LAWN, Sidhauli",
            dressCode: "Royal Ethnic Attire",
            description: "The sacred saat phere around the holy agni kund as two souls unite for an eternity.",
            icon: "wedding"
        }
    ],

    // Audio & Background Music Settings
    audio: {
        musicSrc: "assets/audio/wedding-music.mp3",
        enableSynthesizerFallback: true
    },

    // WhatsApp & Social Sharing
    share: {
        title: "Royal Wedding Invitation | Nainsi & Aman",
        message: "॥ श्री गणेशाय नमः ॥\n\nWith immense joy, our family cordially invites you to the wedding ceremony of Nainsi & Aman.\n\nPlease open our interactive 3D Royal Wedding Invitation website:",
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

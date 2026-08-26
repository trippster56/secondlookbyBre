/**
 * Home page copy.
 *
 * Every string here is Bre's own, from the brief — she wrote this site's voice
 * and it should not be paraphrased. Editing copy should never mean editing a
 * component.
 */

/** "Hi, I'm Bre!" — the about section, in the order she wrote it. */
export const about = {
  eyebrow: "Hi, I’m Bre!",
  heading: "A recent bride who wasn’t quite ready for her wedding day to be over.",
  paragraphs: [
    "After getting married in December 2025, I understood firsthand just how quickly a wedding day passes. After months of planning and anticipation, suddenly it was over, and I wanted to experience every part of it again. I loved looking back through the candid phone videos, behind-the-scenes moments, and little pieces of the day that let me see things I had missed while everything was happening. That’s where the heart behind The Second Look comes from.",
    "But my love for capturing and sharing moments didn’t start with my own wedding. My background is in graphic design, digital media, social media, and content creation, and I’ve spent years creating content and telling stories for businesses and organizations.",
    "The Second Look brings those two sides of my life together: my professional experience creating intentional digital content and my personal understanding of just how special it is to be able to relive your wedding day. I’m here to capture your day from the perspective of someone who knows what you’ll want to see when you pick up your phone the next morning. The moments between the moments. The laugh in the bridal suite. Your best friend’s reaction when she sees you dressed for the first time. A quick video with your new husband. The reception from your guests’ perspective. The little details and interactions that might otherwise live only in your memory.",
  ],
  closing:
    "Think of The Second Look as your behind-the-scenes bestie with a camera roll dedicated entirely to your day!",
} as const;

/** "What You'll Receive" — seven items, the last spanning both columns. */
export const receive = {
  eyebrow: "What You’ll Receive",
  heading:
    "Depending on your package, your wedding content experience can include:",
  items: [
    "Behind-the-scenes wedding day coverage",
    "Candid photos and vertical video clips",
    "Getting ready, details, ceremony, reception + everything in between",
    "Social-media-ready content",
    "Edited short-form videos/Reels",
    "Quick delivery of your wedding day content",
    "A camera roll full of moments ready to relive and share",
  ],
} as const;

/** The closing band, which repeats the site's one primary action. */
export const closing = {
  heading: "Ready for your Second Look?",
  paragraphs: [
    "Your wedding only happens once, but you should get to experience it more than once.",
    "Tell me a little about your day, and let’s make sure the moments you lived and the ones you missed are waiting for you when it’s all over.",
  ],
} as const;

/**
 * The hero's photo trio: one 9:16 arch and two 4:3 crops.
 *
 * TODO(bre): placeholders from the design session — replace with real work.
 * Alt text describes the moment, not the composition.
 */
export const heroPhotos = {
  arch: {
    src: "/images/hero-arch.jpg",
    alt: "A bridesmaid pinning the bride’s veil in place at the dressing table",
  },
  detail: {
    src: "/images/hero-detail.jpg",
    alt: "The invitation suite laid out with both wedding bands and a sprig of greenery",
  },
  reception: {
    src: "/images/hero-reception.jpg",
    alt: "The bride with a hand in the air on a packed dance floor under string lights",
  },
} as const;

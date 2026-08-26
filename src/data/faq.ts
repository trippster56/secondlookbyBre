/**
 * "A few things you might be wondering" — the FAQ, verbatim.
 *
 * Also feeds the FAQPage structured data in the home page, so an answer edited
 * here updates what Google reads too.
 */
export interface FaqItem {
  question: string;
  answer: string;
  /** A second paragraph, where the answer runs long. */
  answerContinued?: string;
}

export const faqItems: FaqItem[] = [
  {
    question:
      "Does a wedding content creator replace my photographer or videographer?",
    answer:
      "Not necessarily! Every wedding is different, and ultimately, who you choose to capture your day is completely up to you. I’ve been part of wedding days with a photographer, videographer, and content creator, as well as weddings with just one or two of those.",
    answerContinued:
      "Each captures your day in a different way. The Second Look focuses on candid, behind-the-scenes, social-first photos and videos with a quick turnaround, giving you another way to experience and relive your day. Your wedding, your priorities, your choice.",
  },
  {
    question: "What do you use to capture my wedding?",
    answer:
      "Content is captured primarily on a smartphone, which gives it the candid, personal feeling you know and love from social media.",
  },
  {
    question: "How soon will I receive my content?",
    answer:
      "One of the biggest reasons The Second Look exists is so you don’t have to wait long to start reliving your day. Your package will outline the exact turnaround time for your raw and edited content.",
  },
  {
    question: "Do you travel?",
    answer:
      "Yes! The Second Look is based in the Florence, South Carolina area, with travel available for weddings beyond the Pee Dee.",
  },
];

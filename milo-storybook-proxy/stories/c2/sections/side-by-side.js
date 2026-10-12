import { MEDIA } from '../../../src/milo.js';

// A card with its image from media/side-by-side/ and no icon or link.
const card = (name, heading, body) => ({
  image: `${MEDIA}/side-by-side/${name}.webp`,
  imageAlt: '',
  icon: '',
  heading,
  body,
  ctaLabel: '',
  ctaHref: '',
});

// The Creative Cloud Pro product page's cards, with the images it shows from 768px. Where a card
// shows a video, the image is the video's poster. The featured card's video has no poster, so its
// image is a frame of the video.
export const PRODUCT = {
  composites: card('photoshop-composites', 'Create complex composites.', 'Combine images with unlimited layers, blend modes, and AI features to merge elements that match lighting, shadows, and perspective.'),
  tools: card('photoshop-tools', 'Edit with a powerful set of tools.', 'Refine images with AI-powered removal tools, advanced color grading, tone and exposure control, non-destructive adjustment layers, and Camera RAW.'),
  retouch: card('photoshop-retouch', 'Perfect every pixel.', 'Retouch any image with industry-leading capabilities to heal, clone, remove, and refine details while preserving natural texture.'),
  artwork: card('photoshop-artwork', 'Create stunning artwork.', 'Tap into a robust library of customizable brushes, pattern and gradient tools, and pixel-level control for illustration, concept art, and lettering.'),
  graphics: card('photoshop-graphics', 'Design elevated graphics and layouts.', 'Create visual assets, mockups, and graphics with pro fonts, vector shapes, artboards, Smart Objects, and libraries to store your assets.'),
  selections: card('photoshop-selections', 'Make pinpoint selections.', 'Use smart selection and masking tools to isolate any subject, background, hair, or complex edge with maximum control for clean results.'),
  rotateObject: card('photoshop-rotate-object', 'Mock up new directions with Rotate Object.', 'Explore new angles quickly with Rotate Object. Tilt, rotate, and scale objects in real time — without rebuilding all the details.'),
  harmonize: card('photoshop-harmonize', 'Blend subjects and scenes with Harmonize.', 'Instantly blend people and objects into any background. Harmonize matches the lighting, shadows, colors, and other details for a seamless scene in seconds.'),
  generativeFill: card('photoshop-generative-fill', 'Create more with new partner models in Generative Fill.', 'Get more choice and better results with partner models Gemini 3 (with Nano Banana Pro) and FLUX.2 pro, plus a new Firefly Image 5 model.'),
};

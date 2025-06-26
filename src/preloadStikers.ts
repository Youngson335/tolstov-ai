import { aiStickers } from "./phrasesAi";


type StickerCache = Map<string, HTMLImageElement>;

const stickerCache: StickerCache = new Map();

async function preloadStickers(): Promise<void> {
  try {
    await Promise.all(aiStickers.map((sticker) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = sticker;
        img.onload = () => {
          stickerCache.set(sticker, img);
          resolve();
        };
        img.onerror = (event: Event | string) => {
          console.warn(`Failed to load sticker: ${sticker}`, event);
          resolve();
        };
      });
    }));
  } catch (error) {
    console.error('Sticker preloading error:', error);
  }
}

export default preloadStickers;
import { ALL_STORY_IMAGES_RAW } from "data/canvasImages";

export const PRELOADED_IMAGES_OBJ = {};

export const preloadCanvasImages = async () => {
  ALL_STORY_IMAGES_RAW.forEach((object) => {
    const img = new Image();
    img.src = object.url;
    PRELOADED_IMAGES_OBJ[object.name] = img;
  });
};

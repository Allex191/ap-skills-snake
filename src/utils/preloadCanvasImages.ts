import { ALL_SKILLS_IMAGES } from "data/canvasImages";

export const PRELOADED_IMAGES_OBJ = {};

export const preloadCanvasImages = async () => {
  ALL_SKILLS_IMAGES.forEach((object) => {
    const img = new Image();
    img.src = object.url;
    PRELOADED_IMAGES_OBJ[object.name] = img;
  });

};

import { ALL_SKILLS_IMAGES } from "data/canvasImages";

export const getAllImagesId = () => {
  const imagesIdArr = ALL_SKILLS_IMAGES.map((object) => object.url);
  return imagesIdArr;
};

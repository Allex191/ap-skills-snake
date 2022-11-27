import {
  ALL_STORY_IMAGES_RAW,
  FIRST_SKIPPED_IMGS,
  LAST_SKIPPED_IMGS,
  LAST_STORY_IMG,
  NR_SKILLS_IMGS,
  NR_STORY_USED_IMG,
  
} from "data/canvasImages";
import { GAME_SQUARES } from "data/gameConst";

export const getAllStoryImagesId = () => {
  const connectingImage =
    ALL_STORY_IMAGES_RAW[ALL_STORY_IMAGES_RAW.length - 1]!.name;

  const nmbrAvailableGameSquares = GAME_SQUARES - NR_STORY_USED_IMG;

  const individualSquares = Math.floor(
    nmbrAvailableGameSquares / NR_SKILLS_IMGS
  );

  const nmbrRestConnectingImgs = nmbrAvailableGameSquares % NR_SKILLS_IMGS;

  const getConnectingImgs = (
    numberOfConnectingImg: number,
    lastImageName: string
  ) => {
    const arr: string[] = [];
    for (let i = 0; i < numberOfConnectingImg; i++) {
      lastImageName && arr.push(lastImageName);
    }
    return arr;
  };
  const connectingImgs = getConnectingImgs(individualSquares, connectingImage);
  const restOfConnectingImgs = getConnectingImgs(
    nmbrRestConnectingImgs,
    connectingImage
  );

  const imagesIdArr: string[][] = [];
  ALL_STORY_IMAGES_RAW.forEach((object, i, array) => {
    const mainImgAndConnectingImgs = [object.name, ...connectingImgs];
    const isTheFirstSkippImg = i < FIRST_SKIPPED_IMGS;
    const isImgsBetween = i < array.length - LAST_SKIPPED_IMGS;
    const isTheLastStoryImg = i === array.length - LAST_SKIPPED_IMGS;

    if (isTheFirstSkippImg) {
      imagesIdArr.push([object.name]);
    } else if (isImgsBetween) {
      imagesIdArr.push(mainImgAndConnectingImgs);
    } else if (isTheLastStoryImg) {
      imagesIdArr.push([...restOfConnectingImgs, LAST_STORY_IMG]);
    }
  });

  const unpackedImagesIdArr = imagesIdArr.flat();

  return unpackedImagesIdArr;
};

import {
  ALL_SKILLS_IMAGES,
  FIRST_SKIPPED_IMGS,
  LAST_SKIPPED_IMGS,
  LAST_STORY_IMG,
} from "data/canvasImages";
import { GAME_SQUARES } from "data/gameConst";

export const getAllStoryImagesId = () => {
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

  const connectingImage = ALL_SKILLS_IMAGES[ALL_SKILLS_IMAGES.length - 1]!.name;
  const allSkippedImgs = FIRST_SKIPPED_IMGS + LAST_SKIPPED_IMGS;
  const imgsWithoutSkipped = ALL_SKILLS_IMAGES.length - allSkippedImgs;

  const nmbrAvailableGameSquares = GAME_SQUARES - ALL_SKILLS_IMAGES.length;

  const nmbrIndividualConnectingImgs = Math.floor(
    nmbrAvailableGameSquares / imgsWithoutSkipped
  );

  const nmbrRestConnectingImgs =
    (nmbrAvailableGameSquares % imgsWithoutSkipped) + 2;

  const connectingImgs = getConnectingImgs(
    nmbrIndividualConnectingImgs,
    connectingImage
  );
  const restOfConnectingImgs = getConnectingImgs(
    nmbrRestConnectingImgs,
    connectingImage
  );

  //change so the last skill its the last collected image

  const imagesIdArr: string[][] = [];
  ALL_SKILLS_IMAGES.forEach((object, i, array) => {
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

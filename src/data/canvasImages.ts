const fallbackImg = {
  name: "apple",
  url: "apple.svg",
};

export const BG_PRIME_IMAGE = "grass-yellow.png";
export const BG_EVEN_IMAGE = "grass-blue.png";

export type ImageIdArr = string[];

export type SkillsImageObj = {
  name: string;
  url: string;
};

export type SkillImageArrShape = SkillsImageObj[];

//every img should have a unique name, if update first or last N imgs, update also const bellow
export const ALL_STORY_IMAGES_RAW: SkillImageArrShape = [
  //first N non skipable imgs
  { name: "me", url: "/me.svg" },
  { name: "question", url: "/skills/question.svg" },
  { name: "idea", url: "/skills/idea.svg" },
  //main skils imgs
  { name: "html", url: "/skills/html.svg" },
  { name: "css", url: "/skills/css.svg" },
  { name: "sass", url: "/skills/sass.svg" },
  { name: "bem", url: "/skills/bem.svg" },
  { name: "javascript", url: "/skills/javascript.svg" },
  { name: "react", url: "/skills/react.svg" },
  { name: "redux", url: "/skills/redux.png" },
  { name: "typescript", url: "/skills/typescript.svg" },
  //fallback img
  { name: "apple", url: "apple.svg" },
  //last N non skipable images
  //second last img is last skill img
  { name: "success", url: "/skills/success.svg" },
  // last is the img used to connect skills
  {
    name: "person-learning",
    url: "skills/person-learning.svg",
  },
];
export const FIRST_SKIPPED_IMGS = 3;
export const LAST_SKIPPED_IMGS = 3;
const indexOfConnectingImg = ALL_STORY_IMAGES_RAW.length - 1;
const indexOfTheLastStoryImg = ALL_STORY_IMAGES_RAW.length - 2;

export const FIRST_IMAGE_ARR_ID: ImageIdArr = [
  ALL_STORY_IMAGES_RAW[0]?.name || fallbackImg.name,
];
export const SECOND_IMAGE_ARR_ID: ImageIdArr = [
  ALL_STORY_IMAGES_RAW[1]?.name || fallbackImg.name,
];
export const FALLBACK_IMG = fallbackImg.name;
const NR_FALLBACK_IMG = 1;

export const LAST_STORY_IMG =
  ALL_STORY_IMAGES_RAW[indexOfTheLastStoryImg]!.name;

export const CONNECTING_IMG = ALL_STORY_IMAGES_RAW[indexOfConnectingImg]!.name;
export const NR_LAST_IMG = 1;
export const NR_STORY_USED_IMG =
  ALL_STORY_IMAGES_RAW.length - NR_LAST_IMG - NR_FALLBACK_IMG;
export const NR_SKILLS_IMGS =
  NR_STORY_USED_IMG - FIRST_SKIPPED_IMGS - NR_LAST_IMG;

export const STROKE_STYLE_SPAWNED_ITEM = "red";
export const STROKE_STYLE_COLLECTED_ITEMS = "black";
export const STROKE_STYLE_FIRST_SNAKE_IMG = "#ff00ea";

export const STROKE_DEVIATION_STORY_IMGS = 6;

export const FALLBACK_IMAGE = {
  name: "apple",
  url: "apple.svg",
};

export type ImageIdArr = string[];

export type SkillsImageObj = {
  name: string;
  url: string;
};

export type SkillImageArrShape = SkillsImageObj[];

export const ALL_SKILLS_IMAGES: SkillImageArrShape = [
  { name: "me", url: "me.svg" },
  { name: "question", url: "question.svg" },
  { name: "idea", url: "idea.svg" },
  { name: "dream", url: "dream.svg" },
  {
    name: "person-learning",
    url: "person-learning.svg",
  },
];

export const FIRST_IMAGE_ARR_ID: ImageIdArr = [
  ALL_SKILLS_IMAGES[0]?.url || FALLBACK_IMAGE.url,
];
export const SECOND_IMAGE_ARR_ID: ImageIdArr = [
  ALL_SKILLS_IMAGES[1]?.url || FALLBACK_IMAGE.url,
];

export const STROKE_STYLE_SPAWNED_ITEM = "red";
export const STROKE_STYLE_COLLECTED_ITEMS = "black";

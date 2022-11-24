export const FALLBACK_IMAGE = {
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

export const ALL_SKILLS_IMAGES: SkillImageArrShape = [
  { name: "me", url: "/me.svg" },
  { name: "css", url: "/skills/css.svg" },
  { name: "sass", url: "/skills/sass.svg" },
  { name: "question", url: "/skills/question.svg" },
  { name: "idea", url: "/skills/idea.svg" },
  { name: "html", url: "/skills/html.svg" },
  { name: "bem", url: "/skills/bem.svg" },
  { name: "javascript", url: "/skills/javascript.svg" },
  { name: "react", url: "/skills/react.svg" },
  { name: "redux", url: "/skills/redux.png" },
  { name: "typescript", url: "/skills/typescript.svg" },
  {
    name: "person-learning",
    url: "skills/person-learning.svg",
  },
];

export const FIRST_IMAGE_ARR_ID: ImageIdArr = [
  ALL_SKILLS_IMAGES[0]?.name || FALLBACK_IMAGE.name,
];
export const SECOND_IMAGE_ARR_ID: ImageIdArr = [
  ALL_SKILLS_IMAGES[1]?.name || FALLBACK_IMAGE.name,
];

export const STROKE_STYLE_SPAWNED_ITEM = "red";
export const STROKE_STYLE_COLLECTED_ITEMS = "black";

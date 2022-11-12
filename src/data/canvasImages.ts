// export const FUTURE_SKILLS = { name: "apple", url: "apple.png" };

export type SkillsImageObj = {
  name: string;
  url: string;
};

export type SkillImageArrShape = SkillsImageObj[];

export const ALL_SKILLS_IMAGES: SkillImageArrShape = [
  { name: "me", url: "me.png" },
  { name: "question", url: "question.png" },
  { name: "idea", url: "idea.png" },
  { name: "dream", url: "dream.png" },
];
export const FIRST_IMAGE_ARR = [ALL_SKILLS_IMAGES[0]!];
export const SECOND_IMAGE_ARR = [ALL_SKILLS_IMAGES[1]!];

export const FALLBACK_IMAGE = "apple.png";

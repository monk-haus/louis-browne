export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  image: string;
  video?: string;
  gif?: string;
  images?: string[];
};

export type MotionProject = {
  id: string;
  title: string;
  image: string;
  vimeoIds?: string[];
  images?: string[];
  description?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type StillsImage = {
  src: string;
  title: string;
};

export type StillsProject = {
  id: string;
  title: string;
  image: string;
  images?: string[];
};

export const desktopGroupSequence = [3, 2, 1, 0, 3, 2, 1, 0];
export const mobileGroupSequence = [0, 1, 2, 3, 0, 1, 2, 3];
export const thumbnailGroups = [0, 1, 2, 3];

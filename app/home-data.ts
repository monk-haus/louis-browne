export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  image: string;
  video?: string;
};

export const projects: Project[] = [
  { id: "101", title: "Holly NYC", location: "New York, NY", year: "2024", image: "/Holly_NYC.webp" },
  {
    id: "102",
    title: "Adidas",
    location: "Herzogenaurach, Germany",
    year: "2023",
    image: "/adidas.webp",
    video: "/adidas.webm",
  },
  { id: "103", title: "Bulleit", location: "Louisville, KY", year: "2022", image: "/bulleit.webp" },
  { id: "104", title: "Calvin Klein", location: "New York, NY", year: "2024", image: "/calvin-klein.webp" },
  { id: "105", title: "Carlita", location: "Ibiza, Spain", year: "2023", image: "/carlita.webp" },
  { id: "106", title: "Dior", location: "Paris, France", year: "2022", image: "/dior.webp", video: "/dior.webm" },
  { id: "107", title: "Gucci", location: "Milan, Italy", year: "2024", image: "/gucci.webp" },
  { id: "108", title: "New Balance", location: "Boston, MA", year: "2023", image: "/new-balance.webp" },
  { id: "109", title: "Nike", location: "Portland, OR", year: "2021", image: "/nike.webp", video: "/nike.webm" },
  {
    id: "110",
    title: "Olivia Rodrigo",
    location: "Los Angeles, CA",
    year: "2024",
    image: "/olivia-rodrigo.webp",
  },
];

export const desktopGroupSequence = [3, 2, 1, 0, 3, 2, 1, 0];
export const mobileGroupSequence = [0, 1, 2, 3, 0, 1, 2, 3];
export const thumbnailGroups = [0, 1, 2, 3];

export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  image: string;
  video?: string;
};

export const projects: Project[] = [
  { id: "101", title: "Holly NYC", location: "New York, NY", year: "2024", image: "/Holly_NYC.jpeg" },
  {
    id: "102",
    title: "Adidas",
    location: "Herzogenaurach, Germany",
    year: "2023",
    image: "/adidas.png",
    video: "/adidas.mp4",
  },
  { id: "103", title: "Bulleit", location: "Louisville, KY", year: "2022", image: "/bulleit.png" },
  { id: "104", title: "Calvin Klein", location: "New York, NY", year: "2024", image: "/calvin-klein.png" },
  { id: "105", title: "Carlita", location: "Ibiza, Spain", year: "2023", image: "/carlita.jpeg" },
  { id: "106", title: "Dior", location: "Paris, France", year: "2022", image: "/dior.jpg", video: "/dior.mp4" },
  { id: "107", title: "Gucci", location: "Milan, Italy", year: "2024", image: "/gucci.jpg" },
  { id: "108", title: "New Balance", location: "Boston, MA", year: "2023", image: "/new-balance.jpeg" },
  { id: "109", title: "Nike", location: "Portland, OR", year: "2021", image: "/nike.png", video: "/nike.mp4" },
  {
    id: "110",
    title: "Olivia Rodrigo",
    location: "Los Angeles, CA",
    year: "2024",
    image: "/olivia-rodrigo.jpeg",
  },
];

export const desktopGroupSequence = [3, 2, 1, 0, 3, 2, 1, 0];
export const mobileGroupSequence = [0, 1, 2, 3, 0, 1, 2, 3];
export const thumbnailGroups = [0, 1, 2, 3];

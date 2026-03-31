export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  image: string;
  video?: string;
  images?: string[];
};

export type MotionProject = {
  id: string;
  title: string;
  image: string;
  vimeoIds?: string[];
  images?: string[];
};

export const projects: Project[] = [
  { id: "101", title: "Adidas", location: "Global", year: "2019–2025", image: "/selects/Adidas - Samba/42814_ADIDAS_DSG_OG_HOL_OFFBODY_1_0093.webp", video: "/adidas.webm" },
  { id: "102", title: "Asha Banks", location: "London", year: "2025", image: "/selects/ASHA BANKS POLYDOR/250717_LB_Polydor_Asha_Banks_02_164.webp" },
  { id: "103", title: "Bulleit", location: "Los Angeles", year: "2023", image: "/bulleit.webp" },
  { id: "104", title: "Calvin Klein", location: "New York", year: "2020", image: "/calvin-klein.webp" },
  { id: "105", title: "Dior", location: "Los Angeles", year: "2023", image: "/dior.webp", video: "/dior.webm" },
  { id: "106", title: "Equinox", location: "New York", year: "2022", image: "/gucci.webp" },
  { id: "107", title: "Gucci", location: "Los Angeles", year: "2021", image: "/olivia-rodrigo.webp" },
  { id: "108", title: "Intel", location: "Mexico City", year: "2026", image: "/new-balance.webp" },
  { id: "109", title: "Motorola", location: "Atlanta", year: "2025", image: "/carlita.webp" },
  { id: "110", title: "New Balance", location: "New York", year: "2025", image: "/new-balance.webp" },
  { id: "111", title: "Nike", location: "Paris", year: "2024", image: "/nike.webp", video: "/nike.webm" },
  { id: "112", title: "OpenAI", location: "Paris, New Delhi, São Paulo", year: "2026", image: "/adidas.webp" },
  { id: "113", title: "Stanley", location: "Los Angeles", year: "2025", image: "/bulleit.webp" },
  { id: "114", title: "T-Mobile", location: "New York", year: "2021", image: "/calvin-klein.webp" },
  { id: "115", title: "Vans", location: "Los Angeles", year: "2023", image: "/carlita.webp" },
];

export const motionProjects: MotionProject[] = [
  {
    id: "m-adidas-dame",
    title: "Adidas — Dame Lillard",
    image: "/selects/Adidas - Dame Lillard/DAME_42814_ADIDAS_DSG_OG_HOL_DAMIAN_ONBODY_2_0398_RGB.webp",
    vimeoIds: ["1125595435", "1033237016"],
    images: [
      "/selects/Adidas - Dame Lillard/DAME_42814_ADIDAS_DSG_OG_HOL_DAMIAN_ONBODY_2_0398_RGB.webp",
      "/selects/Adidas - Dame Lillard/DAME_000079660006.webp",
      "/selects/Adidas - Dame Lillard/DAME_000079300003.webp",
      "/selects/Adidas - Dame Lillard/DAME_000079670005_RGB.webp",
    ],
  },
  {
    id: "m-adidas-gifs",
    title: "Adidas Gifs",
    image: "/selects/Adidas - Samba/42814_ADIDAS_DSG_OG_HOL_OFFBODY_1_0093.webp",
    vimeoIds: ["910751146", "1074280353"],
    images: [
      "/selects/Adidas - Samba/42814_ADIDAS_DSG_OG_HOL_OFFBODY_1_0093.webp",
      "/selects/Adidas - Samba/42814_ADIDAS_DSG_OG_HOL_OFFBODY_1_0109.webp",
    ],
  },
  { id: "m-apple", title: "Apple", image: "" },
  { id: "m-bulleit", title: "Bulleit", image: "" },
  { id: "m-coin", title: "COIN", image: "" },
  { id: "m-dior", title: "Dior", image: "", vimeoIds: ["822389514", "866740353"] },
  { id: "m-equinox", title: "Equinox", image: "", vimeoIds: ["732259777"] },
  { id: "m-fender", title: "Fender", image: "", vimeoIds: ["732242655"] },
  { id: "m-gucci", title: "Gucci", image: "", vimeoIds: ["819128571"] },
  { id: "m-microsoft", title: "Microsoft", image: "", vimeoIds: ["1099036155"] },
  { id: "m-mohegan-sun", title: "Mohegan Sun", image: "" },
  { id: "m-motorola", title: "Motorola", image: "", vimeoIds: ["1119516297"] },
  { id: "m-mrs-meyers", title: "Mrs Meyers", image: "", vimeoIds: ["1077723632"] },
  { id: "m-native-pet", title: "Native Pet", image: "" },
  { id: "m-nike", title: "Nike", image: "", vimeoIds: ["louisbrowne23/nike"] },
  { id: "m-openai", title: "OpenAI", image: "" },
  { id: "m-orbsport", title: "OrbSport", image: "", vimeoIds: ["1024026208"] },
  { id: "m-psycho-bunny", title: "Psycho Bunny", image: "", vimeoIds: ["794295731"] },
  { id: "m-stanley", title: "Stanley", image: "" },
  { id: "m-vans", title: "Vans", image: "", vimeoIds: ["732256575"] },
];

export type StillsImage = {
  src: string;
  title: string;
};

export const stillsImages: StillsImage[] = [
  { src: "/selects/Adidas - Creator_s Club/D07A9755.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A2699.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A5673.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A1489.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A9904.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A9461.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/AdidasCC-group.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A7000.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/000026520028.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/Jafin_Adidas.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/AdidasCC.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A3003.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/000026530009.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A6953.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A7180.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/000026550004.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/Wallis_Adidas.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/000026530003.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Creator_s Club/D07A2788.webp", title: "Adidas Creator's Club" },
  { src: "/selects/Adidas - Samba/42814_ADIDAS_DSG_OG_HOL_OFFBODY_1_0093.webp", title: "Adidas Tennis" },
  { src: "/selects/Adidas - Samba/42814_ADIDAS_DSG_OG_HOL_OFFBODY_1_0109.webp", title: "Adidas Tennis" },
  { src: "/selects/Adidas - Dame Lillard/DAME_42814_ADIDAS_DSG_OG_HOL_DAMIAN_ONBODY_2_0398_RGB.webp", title: "Adidas x Dame Lillard" },
  { src: "/selects/Adidas - Dame Lillard/DAME_000079660006.webp", title: "Adidas x Dame Lillard" },
  { src: "/selects/Adidas - Dame Lillard/DAME_000079300003.webp", title: "Adidas x Dame Lillard" },
  { src: "/selects/Adidas - Dame Lillard/DAME_000079670005_RGB.webp", title: "Adidas x Dame Lillard" },
  { src: "/selects/AITCH/IMG_6465.webp", title: "Aitch" },
  { src: "/selects/AITCH/Aitch-MIS.webp", title: "Aitch" },
  { src: "/selects/AITCH/Aitch1887.webp", title: "Aitch" },
  { src: "/selects/AITCH/IMG_6463.webp", title: "Aitch" },
  { src: "/selects/AITCH/Aitch-2o.webp", title: "Aitch" },
  { src: "/selects/ALEC BENJAMIN/000002810003.webp", title: "Alec Benjamin" },
  { src: "/selects/ALEC BENJAMIN/AB_DifferentKindOfBeautiful_Artwork_3000x3000.webp", title: "Alec Benjamin" },
  { src: "/selects/ALEC BENJAMIN/AB_Photoshop_KingSizeBed_Artwork_Final_3000x3000.webp", title: "Alec Benjamin" },
  { src: "/selects/ALEC BENJAMIN/000002790029.webp", title: "Alec Benjamin" },
  { src: "/selects/ALEC BENJAMIN/AB_PickMe_ArtworkFinal3000x3000.webp", title: "Alec Benjamin" },
  { src: "/selects/ALEC BENJAMIN/10853-3-007.webp", title: "Alec Benjamin" },
  { src: "/selects/ALEC BENJAMIN/AB_ALT-4_Euro_Tour_Poster_080824_Photoshop.webp", title: "Alec Benjamin" },
  { src: "/selects/ALEC BENJAMIN/AB_FoundYouFirst_Final_3000x3000.webp", title: "Alec Benjamin" },
  { src: "/selects/ALEC BENJAMIN/08_Grass_230926_AlecBenjamin_12Notes_1432.webp", title: "Alec Benjamin" },
  { src: "/selects/ASHA BANKS POLYDOR/250717_LB_Polydor_Asha_Banks_02_175.webp", title: "Asha Banks" },
  { src: "/selects/ASHA BANKS POLYDOR/250717_LB_Polydor_Asha_Banks_02_164.webp", title: "Asha Banks" },
  { src: "/selects/ASHA BANKS POLYDOR/250717_LB_Polydor_Asha_Banks_02_173.webp", title: "Asha Banks" },
  { src: "/selects/ASHA BANKS POLYDOR/250717_LB_Polydor_Asha_Banks_02_232.webp", title: "Asha Banks" },
];

export const desktopGroupSequence = [3, 2, 1, 0, 3, 2, 1, 0];
export const mobileGroupSequence = [0, 1, 2, 3, 0, 1, 2, 3];
export const thumbnailGroups = [0, 1, 2, 3];

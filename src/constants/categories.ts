export const categoriesForUI = [
  { title: "전체", url: "/" },
  { title: "신규", url: "/home/new" },
  { title: "뷰티어워즈 🏆", url: "/" },

  {
    title: "푸드",
    url: "/home/beauty",
    subcategories: [
      "신선식품",
      "간편식",
      "건강식품",
      "음료·커피·차",
      "간식",
      "전통주",
    ],
  },
  { title: "뷰티", url: "/home/life", subcategories: [] },
  {
    title: "생활",
    url: "/home/",
    subcategories: [
      "홈 인테리어",
      "주방용품",
      "침구·패브릭",
      "생필품",
      "건강·스포츠·레저",
    ],
  },
  {
    title: "가전",
    url: "/home/",
    subcategories: ["생활가전", "주방가전", "모바일가전", "건강가전"],
  },
  {
    title: "패션",
    url: "/home/",
    subcategories: ["여성의류", "남성의류", "슈즈·가방", "패션소품"],
  },
  { title: "컬렉팅🎨", url: "/" },
];

export const categories = categoriesForUI.filter(
  (item) => item.subcategories !== undefined
);

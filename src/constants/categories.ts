export const categoriesForUI = [
  { title: "전체", url: "/" },
  { title: "신규", url: "/new" },
  { title: "뷰티어워즈 🏆", url: "/" },

  {
    title: "푸드",
    url: "/home/category?category=food",
    subcategories: [
      "전체",
      "신선식품",
      "간편식",
      "건강식품",
      "음료·커피·차",
      "간식",
      "전통주",
    ],
  },
  {
    title: "뷰티",
    url: "/home/category?category=beauty",
    subcategories: ["스킨케어", "바디·헤어", "메이크업"],
  },
  {
    title: "생활",
    url: "/home/category?category=living",
    subcategories: [
      "전체",
      "홈 인테리어",
      "주방용품",
      "침구·패브릭",
      "생필품",
      "건강·스포츠·레저",
    ],
  },
  {
    title: "가전",
    url: "/home/category?category=appliance",
    subcategories: ["전체", "생활가전", "주방가전", "모바일가전", "건강가전"],
  },
  {
    title: "패션",
    url: "/home/category?category=fashion",
    subcategories: ["전체", "여성의류", "남성의류", "슈즈·가방", "패션소품"],
  },
  { title: "컬렉팅🎨", url: "/" },
];

export const categories = categoriesForUI.filter(
  (item) => item.subcategories !== undefined
);

export const subcategories = {
  food: [
    "전체",
    "신선식품",
    "간편식",
    "건강식품",
    "음료·커피·차",
    "간식",
    "전통주",
  ],
  living: [
    "전체",
    "홈 인테리어",
    "주방용품",
    "침구·패브릭",
    "생필품",
    "건강·스포츠·레저",
  ],
  beauty: ["스킨케어", "바디·헤어", "메이크업"],
  appliance: ["전체", "생활가전", "주방가전", "모바일가전", "건강가전"],
  fashion: ["전체", "여성의류", "남성의류", "슈즈·가방", "패션소품"],
};

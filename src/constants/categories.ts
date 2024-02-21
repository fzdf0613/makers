export const categoriesForUI = [
  { title: "전체", url: "/" },
  { title: "신규", url: "/new" },
  { title: "뷰티어워즈 🏆", url: "/" },

  {
    title: "푸드",
    value: "food",
    url: "/home/category?category=food&subcategory=0&sort=LATEST",
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
    value: "beauty",
    url: "/home/category?category=beauty&subcategory=0&sort=LATEST",
    subcategories: ["전체", "스킨케어", "바디·헤어", "메이크업"],
  },
  {
    title: "생활",
    value: "living",
    url: "/home/category?category=living&subcategory=0&sort=LATEST",
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
    value: "appliance",
    url: "/home/category?category=appliance&subcategory=0&sort=LATEST",
    subcategories: ["전체", "생활가전", "주방가전", "모바일가전", "건강가전"],
  },
  {
    title: "패션",
    value: "fashion",
    url: "/home/category?category=fashion&subcategory=0&sort=LATEST",
    subcategories: ["전체", "여성의류", "남성의류", "슈즈·가방", "패션소품"],
  },
  { title: "컬렉팅🎨", url: "/" },
];

export const categories = categoriesForUI.filter(
  (item) => "subcategories" in item
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

import CategoryItemList from "@/components/home/category/CategoryItemList";
import QuickLinkCard from "@/components/home/category/QuickLinkCard";
import { subcategories } from "@/constants/categories";
import { CategoryValue } from "@/customType/category";
import { redirect } from "next/navigation";

export default function CategoryPage({
  searchParams,
}: {
  searchParams: {
    category: CategoryValue;
    subcategory: number;
    sort: string;
  };
}) {
  if (
    !["food", "beauty", "appliance", "fashion", "living"].includes(
      searchParams.category
    ) ||
    searchParams.subcategory >= subcategories[searchParams.category].length ||
    searchParams.subcategory < 0
  ) {
    redirect("/");
  }

  return (
    <>
      <QuickLinkCard category={searchParams.category} />
      <CategoryItemList
        category={searchParams.category}
        subcategory={searchParams.subcategory}
        sort={searchParams.sort}
      />
    </>
  );
}

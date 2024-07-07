import { getCategoriesTypes } from "@/api/sidebarApi";

import { Category } from "../../types/product";
import FilterProducts from "./filter-products";

interface FilterComponentProps {
  // Define any necessary props here
  brands?: string[];
  query?: string | string[] | undefined;
}

export interface IResProps {
  count: number;
  next: null | string;
  previous: null | string;
  results: Category[];
  total_pages: number;
}

export default async function FilterComponent(props: FilterComponentProps) {
  const response = await getCategoriesTypes();
  const categories: IResProps = response?.data;

  return (
    <div className="bg-white p-6 border border-gray-300">
      <h2 className="text-lg font-semibold mb-3">Filters</h2>
      <FilterProducts categories={categories} brands={props.brands} />

      {/* Add more filter options as needed */}
    </div>
  );
}

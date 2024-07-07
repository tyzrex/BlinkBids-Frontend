"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import usePushRouter from "@/hooks/usePushRouter";

import { IResProps } from "./search-filter";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface IProps {
  categories?: IResProps;
  brands?: string[];
  closeModel?: React.Dispatch<React.SetStateAction<boolean>>;
}

function constructFilterURL(
  pathname: string,
  currentQuery: string[],
  brandName: string[],
  categoryName: string[],
  minPrice: number,
  maxPrice: number
): string {
  const filterParams = [];
  const formatBrandName = (brandName: string[]) => {
    return brandName.join("--");
  };

  if (brandName.length > 0) {
    filterParams.push({
      type: "brand",
      value: formatBrandName(brandName),
    });
  }

  if (categoryName.length > 0) {
    filterParams.push({
      type: "category",
      value: formatBrandName(categoryName),
    });
  }

  const queryParams = [
    `query=${currentQuery.join(",")}`,
    ...filterParams.map((param) => `${param.type}=${param.value}`),
    minPrice ? `min=${minPrice}` : "",
    maxPrice ? `max=${maxPrice}` : "",
  ];

  return `${pathname}?${queryParams.filter(Boolean).join("&")}`;
}

export default function FilterProducts(props: IProps) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [currentQuery, setCurrentQuery] = useState(params.getAll(""));
  const [brandName, setBrandName] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string[]>(params.getAll(""));
  const [minPrice, setMinPrice] = useState<number>(
    parseInt(params.get("min") || "0")
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    parseInt(params.get("max") || "0")
  );

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseInt(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseInt(e.target.value));
  };

  const isChecked = (type: string, value: string): boolean => {
    let splitName: string[] = [];

    if (type === "brand") {
      splitName = brandName.length > 0 ? brandName[0].split("--") : [];
    } else if (type === "category") {
      splitName = categoryName.length > 0 ? categoryName[0].split("--") : [];
    }

    const filterURL = constructFilterURL(
      pathname,
      currentQuery,
      brandName,
      categoryName,
      minPrice,
      maxPrice
    );

    // router.push(filterURL);

    return splitName.includes(value);
  };

  const handleApplyFilters = (
    e:
      | React.FormEvent<HTMLFormElement | HTMLButtonElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const filterURL = constructFilterURL(
      pathname,
      currentQuery,
      brandName,
      categoryName,
      minPrice,
      maxPrice
    );
    // //console.log(filterURL);
    if (props?.closeModel) {
      props.closeModel(false);
    }

    router.push(filterURL);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "brand" | "category"
  ) => {
    const selectedValue = e.target.value;

    let splitName: string[] = [];
    if (type === "brand" && brandName.length > 0) {
      splitName = brandName[0].split("--");
    } else if (type === "category" && categoryName.length > 0) {
      splitName = categoryName[0].split("--");
    }

    if (e.target.checked) {
      // If the checkbox is checked, add the value to the string
      splitName.push(selectedValue);
    } else {
      // If the checkbox is unchecked, remove the value from the string
      splitName = splitName.filter((value) => value !== selectedValue);
    }

    // Join the array back into a string and trim '--' from the start and end
    const joinedName = splitName.join("--").replace(/(^--|--$)/g, "");

    if (type === "brand") {
      setBrandName([joinedName]);
    } else if (type === "category") {
      setCategoryName([joinedName]);
    }

    router.push(
      constructFilterURL(
        pathname,
        currentQuery,
        type === "brand" ? [joinedName] : brandName,
        type === "category" ? [joinedName] : categoryName,
        minPrice,
        maxPrice
      )
    );
  };

  const clearFilters = () => {
    setBrandName([]);
    setCategoryName([]);
    setMinPrice(0);
    setMaxPrice(0);
    if (props?.closeModel) {
      props.closeModel(false);
    }
    router.push(`${pathname}/?query=${currentQuery}`);
  };

  useEffect(() => {
    setCurrentQuery(params.getAll("query"));
    setBrandName(params.getAll("brand"));
    setCategoryName(params.getAll("category"));
    setMinPrice(parseInt(params.get("min") || "0"));
    setMaxPrice(parseInt(params.get("max") || "0"));
  }, [params]);

  return (
    <aside>
      <form>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Brands</h4>
          <div className="space-y-2">
            {props?.brands &&
              props.brands.map(
                (brand: string, idx: number) =>
                  brand && (
                    <div className="flex items-center gap-2" key={idx}>
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={(e) => {
                          handleCheckboxChange(e, "brand");
                        }}
                        name={brand}
                        value={brand}
                        checked={isChecked("brand", brand)}
                      />

                      <Label
                        className="text-sm font-medium"
                        htmlFor="brand-nike"
                      >
                        {brand}
                      </Label>
                    </div>
                  )
              )}
          </div>
          {/* <ul className="space-y-1">
            {props?.brands?.map((brand: string, idx: number) => (
              <li key={idx}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={(e) => handleCheckboxChange(e, "brand")}
                    name={brand}
                    value={brand}
                    checked={isChecked("brand", brand)}
                  />
                  <span>{brand}</span>
                </label>
              </li>
            ))}
          </ul> */}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Price Range</h4>
          <div className="grid gap-2">
            <Slider
              className="rounded-full h-3 bg-gray-200 dark:bg-gray-700 lg:w-60"
              defaultValue={[minPrice, maxPrice]}
              max={1000000}
              step={1}
              about="Price Range"
              onValueChange={([min, max]: number[]) => {
                setMinPrice(min);
                setMaxPrice(max);

                router.push(
                  constructFilterURL(
                    pathname,
                    currentQuery,
                    brandName,
                    categoryName,
                    min,
                    max
                  )
                );
              }}
            />
            <div className="flex justify-between text-sm text-black font-bold">
              <span>Rs. {minPrice}</span>
              <span>Rs. {maxPrice}</span>
            </div>
          </div>
        </div>
      </form>
      <button
        onClick={clearFilters}
        className="mt-4 w-full bg-accent-2 text-white py-2 rounded hover:bg-accent-1 color-transition"
      >
        Clear Filters
      </button>
    </aside>
  );
}

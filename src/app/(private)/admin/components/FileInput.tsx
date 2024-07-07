import { memo, useEffect, useState } from "react";

import Image from "next/image";
import Placeholder from "public/placeholder.jpg";
import { XCircleIcon } from "lucide-react";

interface FormProps {
  register: any;
  errors: any;
  label: string;
  registerName: string;
  watch?: any;
  existingImage?: string | null;
  imageValue?: any;
  imagePaths?: any;
  setValue?: any;
}

function FileInput(props: FormProps) {
  console.log(props);
  const isFile = props.watch?.[props.registerName]?.[0] instanceof File;
  const [existingImage, setExistingImage] = useState<string>();
  // isFile ? "" : props.existingImage ?? ""

  useEffect(() => {
    if (isFile) {
      setExistingImage(
        URL.createObjectURL(props.watch?.[props.registerName]?.[0])
      );
      return;
    }
    if (props.imagePaths) {
      setExistingImage(`${props.imagePaths}/${props.imageValue}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.imageValue]);

  console.log(existingImage);
  const handleRemoveImage = () => {
    setExistingImage("");
    props.setValue(props.registerName, "");
  };

  return (
    <>
      <div className="flex-between my-5">
        <label>
          <span className="text-gray-400 font-semibold text-sm ">
            {props.label}
          </span>
        </label>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Image Preview
        </p>
      </div>
      <div className="flex flex-col sm:flex-row  gap-5">
        <div className="flex items-center justify-center mt-2 w-full sm:w-[50%]">
          <div className="flex flex-col items-center justify-center w-full relative h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  {props.watch?.[props.registerName]?.[0] ? (
                    <span className="text-green-500">Uploaded!</span>
                  ) : (
                    "Upload a file"
                  )}
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG
              </p>
            </div>

            <input
              {...props.register(props.registerName)}
              id="dropzone-file"
              type="file"
              className="h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="sm:w-[50%] bg-gray-100 rounded-md flex flex-col h-64">
          <div className="flex-center h-full relative">
            {existingImage ? (
              <>
                <Image
                  src={`${existingImage}`}
                  alt="image"
                  width={200}
                  height={200}
                  className="object-contain w-full h-full rounded-md"
                />
                <button
                  className="absolute top-2 right-2"
                  type="button"
                  onClick={handleRemoveImage}
                >
                  <XCircleIcon className=" w-6 h-6 text-red-500 cursor-pointer" />
                </button>
              </>
            ) : (
              <Image
                src={Placeholder}
                alt="image"
                width={200}
                height={200}
                className="object-contain w-full h-full rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(FileInput);

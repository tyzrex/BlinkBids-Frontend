import React from "react";

import Image from "next/image";

interface FileListProps {
  files: { [key: string]: File };
  existingFiles?: string[];
}

function FilePreview({ files, existingFiles }: FileListProps) {
  //console.log("rerender");
  return (
    <ul id="gallery" className="flex border flex-1 flex-wrap -m-1">
      {Object.keys(files).length > 0 || existingFiles?.length ? (
        Object.keys(files).map((file) => (
          <li
            key={file}
            className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-36"
          >
            <div
              tabIndex={0}
              className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer shadow-sm"
            >
              <Image
                lazyBoundary="100px"
                width={0}
                height={0}
                alt="upload preview"
                className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                src={URL.createObjectURL(files[file])}
              />
            </div>
          </li>
        ))
      ) : (
        <li
          id="empty"
          className="h-full w-full text-center flex flex-col justify-center items-center"
        >
          <Image
            width={100}
            height={100}
            className="mx-auto w-32"
            src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
            alt="no data"
          />
          <span className="text-small text-gray-500">No files selected</span>
        </li>
      )}
      {existingFiles?.map((file) => (
        <li
          key={file}
          className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-36"
        >
          <div
            tabIndex={0}
            className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer shadow-sm"
          >
            <Image
              alt="upload preview"
              src={`api/images/${file}`}
              width={100}
              height={100}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FilePreview;

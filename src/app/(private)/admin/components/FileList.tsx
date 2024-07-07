import React, { memo } from "react";

import Image from "next/image";

interface FileListProps {
  files: any[];
  removeFile: (url: string) => void;
  existingFiles?: string[];
  removeExistingFile: (name: string) => void;
}

function FileGallery({
  files,
  removeFile,
  existingFiles,
  removeExistingFile,
}: FileListProps) {
  return (
    <ul id="gallery" className="flex border flex-1 flex-wrap -m-1">
      {files.length > 0 || existingFiles?.length ? (
        files.map((file) => (
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
              <div className="flex opacity-0 group-hover:bg-black/50 color-transition hover:opacity-100 transition-opacity ease-in-out duration-500 flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                <h1 className="flex-1 text-white">{files[file].name}</h1>
                <div className="flex-center text-white">
                  <span className="p-1">
                    <i>
                      <svg
                        className="fill-current w-4 h-4 ml-auto pt-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                      </svg>
                    </i>
                  </span>
                  <p className="p-1 size text-xs">
                    {files[file].size > 1024
                      ? files[file].size > 1048576
                        ? Math.round(files[file].size / 1048576) + "mb"
                        : Math.round(files[file].size / 1024) + "kb"
                      : files[file].size + "b"}
                  </p>
                  <button
                    className="delete ml-auto focus:outline-none hover:rede-300 color-transition p-1 rounded-md text-white bg-red-500"
                    onClick={() => removeFile(file)}
                    data-target={file}
                  >
                    <svg
                      className="pointer-events-none fill-current w-4 h-4 ml-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="pointer-events-none"
                        d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
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
              width={0}
              height={0}
              sizes="100vw"
              alt="upload preview"
              className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
              src={`/api/images/${file}`}
            />
            <div className="flex opacity-0 group-hover:bg-black/50 color-transition hover:opacity-100 transition-opacity ease-in-out duration-500 flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
              <h1 className="flex-1 text-white">{file}</h1>
              <div className="flex-center text-white">
                <span className="p-1">
                  <i>
                    <svg
                      className="fill-current w-4 h-4 ml-auto pt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                    </svg>
                  </i>
                </span>
                {/* <p className="p-1 size text-xs">
                  {files[file].size > 1024
                    ? files[file].size > 1048576
                      ? Math.round(files[file].size / 1048576) + "mb"
                      : Math.round(files[file].size / 1024) + "kb"
                    : files[file].size + "b"}
                </p> */}
                <button
                  className="delete ml-auto focus:outline-none hover:rede-300 color-transition p-1 rounded-md text-white bg-red-500"
                  onClick={() => removeExistingFile(file)}
                  data-target={file}
                >
                  <svg
                    className="pointer-events-none fill-current w-4 h-4 ml-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="pointer-events-none"
                      d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(FileGallery);

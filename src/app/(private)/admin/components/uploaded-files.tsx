import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "./empty-card";
import { useControllableState } from "@/hooks/use-uncontrollable-state";

interface UploadedFile {
  key: string;
  name: string;
  url: string;
}

interface UploadedFilesCardProps {
  interfaceTitle: string;
  uploadedFiles: UploadedFile[];
  onValueChange?: any;
}

export function UploadedFilesCard({
  uploadedFiles,
  interfaceTitle,
  onValueChange,
}: UploadedFilesCardProps) {
  const [files, setFiles] = useControllableState<UploadedFile[]>({
    prop: uploadedFiles,
    onChange: onValueChange,
  });

  function removeFile(index: number) {
    if (!files) return;
    const newFiles = files.filter((item, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles.map((file) => file.name));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{interfaceTitle}</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {files && files.length > 0 ? (
          <ScrollArea className="pb-4 ">
            <div className="flex w-max space-x-2.5">
              {files.map((file, index) => (
                <div key={file.key} className="relative aspect-video w-64">
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    sizes="(min-width: 640px) 640px, 100vw"
                    loading="lazy"
                    className="rounded-md object-cover"
                  />
                  {onValueChange && (
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}

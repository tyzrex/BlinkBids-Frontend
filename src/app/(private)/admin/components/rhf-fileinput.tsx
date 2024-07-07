import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { useEffect } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { FileUploader } from "./file-uploader";

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  numberOfFiles: number;
};

export default function RHFFileInput<T extends FieldValues>({
  name,
  formLabel,
  numberOfFiles,
}: Props<T>) {
  const { control, watch } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                maxFiles={numberOfFiles}
                maxSize={5 * 1024 * 1024}
                // pass the onUpload function here for direct upload
                // onUpload={uploadFiles}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

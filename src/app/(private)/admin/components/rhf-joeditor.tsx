import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { joEditorConfig } from "@/lib/constants";
// import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";
import { FieldValues, Path, useFormContext } from "react-hook-form";

const DynamicJoEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <>loading...</>,
});

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  placeHolder: string;
};

export default function RHFJoeditor<T extends FieldValues>({
  name,
  formLabel,
  placeHolder,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <DynamicJoEditor
                value={field.value}
                config={joEditorConfig}
                onChange={(newContent: string) => {
                  field.onChange(newContent);
                }}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

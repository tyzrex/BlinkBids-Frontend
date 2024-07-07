"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addHeroBanners } from "@/api/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showErrorToasts } from "@/lib/utils";
import { heroBannerSchema } from "@/schema/cms/hero-banner-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import FileInput from "../../components/FileInput";
import { DataTable } from "../../products/_components/datatable";
import { heroBannerColumns } from "./hero-banner-columns";

interface ImageLinkPair {
  client_created_at?: number;
  image: File | string;
  link: string;
  deleteImageData: () => void;
}

export default function HeroBannerComponent({
  existingBanners,
  type,
}: {
  existingBanners?: ImageLinkPair[];
  type: "ad" | "hero" | "banner1" | "banner2";
}) {
  const form = useForm<z.infer<typeof heroBannerSchema>>({
    resolver: zodResolver(heroBannerSchema),
  });
  const [open, setOpen] = useState(false);
  const { register, watch, reset } = form;
  const [imageLinkPairs, setImageLinkPairs] = useState<
    ImageLinkPair[] | undefined
  >(existingBanners);
  const [newImageLinkPairs, setNewImageLinkPairs] = useState<ImageLinkPair[]>(
    []
  );
  const router = useRouter();

  const deleteImage = (client_created_at: number) => {
    if (!client_created_at) return;
    setImageLinkPairs(
      imageLinkPairs?.filter(
        (pair) => pair.client_created_at !== client_created_at
      )
    );
  };

  const onSubmit = (data: z.infer<typeof heroBannerSchema>) => {
    if (data) {
      const newPair: ImageLinkPair = {
        client_created_at: Date.now(), // Unique client_created_at based on timestamp
        image: data.images[0],
        link: data.link,
        deleteImageData: () => deleteImage(Date.now()),
      };

      setNewImageLinkPairs([...newImageLinkPairs, newPair]);
      setOpen(false);
      reset({ link: "", images: [] }, { keepValues: false, keepDirty: false });
    }
  };

  const watchImages = watch();

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      newImageLinkPairs.forEach((pair) => {
        formData.append("images", pair.image);
        formData.append("link", pair.link);
      });
      formData.append("banner_type", type);
      const response = await addHeroBanners(formData);
      if (response.success === true) {
        toast.success(response.message);
        // router.replace("/admin/banners");
        router.push(`/admin/banners`);
        setNewImageLinkPairs([]);
      } else {
        showErrorToasts(response.errorData);
      }
    } catch (err) {
      console.log(err);
      toast.error("Banners Not Added");
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold">
            {type === "hero" ? "Hero Banner" : "Ad Banner"}
          </h2>
          <p className="text-sm text-gray-500">
            This is the {type === "hero" ? "hero" : "ad"} banner section of the
            website.
          </p>
        </div>
        <Button
          className="mb-4 rounded-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          Add New Banner
        </Button>
      </div>

      {imageLinkPairs ? (
        <DataTable data={imageLinkPairs} columns={heroBannerColumns} />
      ) : (
        <> No Existing Banners Please Add</>
      )}

      <h2 className="text-2xl font-bold mt-10">New Banners</h2>

      <DataTable data={newImageLinkPairs} columns={heroBannerColumns} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Banner Image</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileInput
                          errors={form.formState?.errors?.images?.message}
                          label="Image"
                          register={register}
                          registerName="images"
                          watch={watchImages}
                          imageValue={field.value}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* submit */}
      <div className="flex justify-end mt-5">
        <Button
          className="mb-4 rounded-none bg-accent-1"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
}

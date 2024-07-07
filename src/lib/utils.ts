import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { Status } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
  if (!event.target.files?.length)
    return {
      files: new DataTransfer().files,
      displayUrl: null,
    };
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export function slugify(title: string): string {
  // Convert the title to lowercase and replace spaces with hyphens
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  // Remove special characters and non-alphanumeric characters
  const cleanedSlug = slug.replace(/[^\w-]+/g, "");

  return cleanedSlug;
}

export function getInitials(name: string | undefined): string {
  if (!name) {
    return "";
  }
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
}

export function formatTimestamp(timestampStr: string) {
  // Regular expression to match the timestamp pattern
  const regex =
    /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(\.\d+)?([+-]\d{2}:\d{2})$/;
  const match = timestampStr.match(regex);

  // Check if the timestamp matches the expected pattern
  if (!match) {
    throw new Error("Invalid timestamp format");
  }

  // Extract parts of the timestamp
  const [, datePart, timePart, , offsetPart] = match;

  // Construct a Date object
  const timestamp = new Date(`${datePart}T${timePart}${offsetPart}`);

  // Format options
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  // Formatter for the date
  const formatter = new Intl.DateTimeFormat("en-US", options);
  // Return formatted date
  return formatter.format(timestamp);
}

export function convertToDateOnly(isoDateString: Date): string {
  return isoDateString.toISOString().split("T")[0];
}

export function showErrorToasts(errors: string) {
  if (!errors) {
    return;
  }

  const errorMessages = errors.split("|").map((error) => error.trim());
  errorMessages.forEach((error) => {
    toast.error(error);
  });
}

export function makeKeyCleaner(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export const statusMapper = (status: string): Status => {
  return Status[status as keyof typeof Status];
};

export const capitalizeWords = (name: string): string => {
  return name
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

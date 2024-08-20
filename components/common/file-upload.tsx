"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

type FileUploadProps = {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter;
};
const FileUpload = ({ endpoint, onChange }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(e) => {
        toast.error(`${e?.cause}`);
      }}
    />
  );
};

export default FileUpload;

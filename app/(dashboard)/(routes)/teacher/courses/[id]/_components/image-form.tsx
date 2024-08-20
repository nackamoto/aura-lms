"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import FileUpload from "@/components/common/file-upload";
type ImageFormProps = {
  initialData: Course;
  courseId: string;
};
const formSchema = z.object({
  imageUrl: z.string({
    required_error: "Image is required",
  }),
});
const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, data);
      if (res?.status) {
        toast.success("Image updated");
        router.refresh();
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  const toggle = () => setIsEditing((prev) => !prev);
  return (
    <section className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        Course Image
        <Button variant={`ghost`} size={`default`} onClick={toggle}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-12 w-12 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData?.imageUrl}
              alt={initialData?.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
            endpoint="courseImage"
          />
          <div className="text-xs text-muted-foreground mt-4">
            {`Recommended aspect ratio is 16:9`}
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageForm;

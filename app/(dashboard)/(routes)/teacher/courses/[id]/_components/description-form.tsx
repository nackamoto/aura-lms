"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormControl,
} from "@/components/ui/form";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
type DescriptionFormProps = {
  initialData: Course;
  courseId: string;
};
const formSchema = z.object({
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(6, { message: "Description must be at least 6 characters" }),
});
const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });
  const router = useRouter();

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, data);
      if (res?.status) {
        toast.success("Description updated");
        form.reset();
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  const toggle = () => setIsEditing((prev) => !prev);
  return (
    <section className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        Course description
        <Button variant={`ghost`} size={`default`} onClick={toggle}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            `text-sm mt-2`,
            !initialData.description && `text-slate-500 italic`
          )}
        >
          {initialData.description || `No description`}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      {...field}
                      id="description"
                      placeholder="e.g. This course will teach you how to build a full-stack application using React and Node.js"
                    />
                  </FormControl>
                  <FormDescription>{`Describe your course`}</FormDescription>
                </FormItem>
              )}
            />
            <section className="flex items-center gap-x-2">
              <Button
                size="default"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Save
              </Button>
            </section>
          </form>
        </Form>
      )}
    </section>
  );
};

export default DescriptionForm;

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
type TitleFormProps = {
  initialData: {
    title: string;
  };
  courseId: string;
};
const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(6, { message: "Title must be at least 6 characters" }),
});
const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const router = useRouter();

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, data);
      if (res?.status) {
        toast.success("Title updated");
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
        Course title
        <Button variant={`ghost`} size={`default`} onClick={toggle}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      {...field}
                      id="title"
                      placeholder="e.g. Advance Malware development"
                    />
                  </FormControl>
                  <FormDescription>{`Name your course`}</FormDescription>
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

export default TitleForm;

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
import { Combobox } from "@/components/ui/combobox";
type CategoryFormProps = {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
};
const formSchema = z.object({
  categoryId: z.string({
    required_error: "Category is required",
  }),
});
const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );
  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, data);
      if (res?.status) {
        toast.success("category updated");
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
        Course category
        <Button variant={`ghost`} size={`default`} onClick={toggle}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            `text-sm mt-2`,
            !initialData.categoryId && `text-slate-500 italic`
          )}
        >
          {selectedOption?.label || `No category`}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={options}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
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

export default CategoryForm;

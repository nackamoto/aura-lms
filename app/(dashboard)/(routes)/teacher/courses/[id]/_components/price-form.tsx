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
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";
type PriceFormProps = {
  initialData: Course;
  courseId: string;
};
const formSchema = z.object({
  price: z.coerce.number().positive(),
});
const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });
  const router = useRouter();

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, {
        price: Number(data.price),
      });
      console.log("data: ", data);
      if (res?.status) {
        toast.success("Price updated");
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
        Course price
        <Button variant={`ghost`} size={`default`} onClick={toggle}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            `text-sm mt-2`,
            !initialData.price && `text-slate-500 italic`
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price set"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      {...field}
                      type="number"
                      step={0.01}
                      id="price"
                      placeholder="set a price for your course"
                    />
                  </FormControl>
                  {/* <FormDescription>{`Describe your course`}</FormDescription> */}
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

export default PriceForm;

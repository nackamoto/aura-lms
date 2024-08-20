"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(6, { message: "Title must be at least 6 characters" }),
});
export default function PageCreateCourse() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await axios.post("/api/courses", data);
    if (res?.status) {
      toast.success("Course created");
      router.push(`/teacher/courses/${res?.data?.id}`);
    }
  };
  return (
    <main className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <section>
        <h1 className="text-2xl font-black">Name your course</h1>
        <p className="font-medium text-stone-600">{`What would you like to name your course? Don't worry, you can change this later `}</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      {...field}
                      id="title"
                      placeholder="e.g 'Introduction to JavaScript'"
                    />
                  </FormControl>
                  <FormDescription>
                    {`We recommend using a descriptive name that will help students understand what they'll learn`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <footer className="flex gap-x-3 items-center">
              <Link href={`/`}>
                <Button variant={`ghost`}>{`Cancel`}</Button>
              </Link>
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >{`Continue`}</Button>
            </footer>
          </form>
        </Form>
      </section>
    </main>
  );
}

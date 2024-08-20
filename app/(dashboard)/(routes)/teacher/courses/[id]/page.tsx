import { IconBadge } from "@/components/common/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";

export default async function PageCourseDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { userId } = auth();

  if (!userId) redirect(`/`);
  const course = await db.course.findUnique({
    where: {
      id,
    },
  });
  if (!course) redirect(`/`);
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.price,
  ];
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `( ${completedFields}/${requiredFields.length} )`;
  return (
    <main className="p-6">
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">{`Course setup`}</h1>
          <span className="text-sm text-slate-700">{`Complete all fields ${completionText}`}</span>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} variant="default" size="sm" />
            <h2 className="text-xl">{`Customize your course`}</h2>
          </div>
          <TitleForm initialData={{ title: course.title }} courseId={id} />
          <DescriptionForm initialData={course} courseId={id} />
          <ImageForm initialData={course} courseId={id} />
        </div>
      </section>
    </main>
  );
}

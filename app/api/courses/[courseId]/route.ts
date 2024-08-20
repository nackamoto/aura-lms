import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = params;
    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: { ...values },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
  //   try {
  //     const { userId } = auth();
  //     const { courseId } = req.params;
  //     const { title } = await req.json();
  //     if (!userId) {
  //       return new NextResponse("Unauthorized", { status: 401 });
  //     }
  //     const course = await db.course.findFirst({
  //       where: {
  //         id: courseId,
  //         userId,
  //       },
  //     });
  //     if (!course) {
  //       return new NextResponse("Not Found", { status: 404 });
  //     }
  //     const res = await db.course.update({
  //       where: {
  //         id: courseId,
  //       },
  //       data: {
  //         title,
  //       },
  //     });
  //     return NextResponse.json(res);
  //   } catch (error) {
  //     return new NextResponse("Internal Server Error", { status: 500 });
  //   }
}

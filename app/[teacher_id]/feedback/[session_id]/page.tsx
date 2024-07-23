"use client";

import Policy from "@/components/policy";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page({
  params,
}: {
  params: { teacher_id: string; session_id: string };
}) {
  const route = useRouter();

  const formSchema = z.object({
    studentName: z
      .string()
      .trim()
      .min(2, { message: "Student Name is required" })
      .max(132, { message: "Student Name must be less than 132 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
    },
    mode: "all",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    route.push(
      `/${params.teacher_id}/feedback/${params.session_id}/feedback?name=${values?.studentName}`
    );
  }

  return (
    <div className="sm:bg-student-img xxs:bg-student-bg-mobile bg-cover h-screen">
    <div className="xs:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-50px)] w-screen flex xs:justify-center md:justify-end md:pr-44 lg:pr-28">
        <div className="flex flex-col sm:justify-center xs:pt-28 sm:pt-0 md:gap-5 xs:gap-10">
          <h1 className="xs:text-feedback-size sm:text-7xl font-semibold  text-cararra">
            Feedback <br /> Mixer
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-2 mt-16 flex flex-col w-max">
                <p className="text-33 font-semibold text-cararra">Dein Name?</p>
                <FormField
                  control={form.control}
                  name={`studentName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Vorname, Name"
                          className="rounded-full text-center h-14 w-[347px] focus-within:border-none text-lg focus-visible:ring-offset-0 focus:ring-0 placeholder:text-fontColor"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-white" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size={"buttonSize"}
                  textColor={"default"}
                  backgroundColors={"pink"}
                  variant={"pinButtonHover"}
                >
                  Let&apos;s go!
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Policy />
      </div>
  );
}

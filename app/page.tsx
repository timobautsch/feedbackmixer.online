"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { Error, State } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FieldPath, useForm } from "react-hook-form";
import { z } from "zod";
import { loginAction } from "./_action";
import { formSchema } from "./validation";
import Policy from "@/components/policy";

export default function Component() {
  type ValidationSchema = z.infer<typeof formSchema>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacher_name: "",
      teacher_code: "",
    },
    mode: "all",
  });

  const {
    formState: { isValid },
  } = form;

  const [state, formAction] = useFormState<State, FormData>(loginAction, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "error" && state.message) {
      state.errors?.forEach((error: Error) => {
        form.setError(error.path as FieldPath<ValidationSchema>, {
          message: error.message,
        });
      });
    }
  }, [state, form]);

  return (
    <div className="bg-teacher-page-1 bg-cover min-h-screen">
      <div className="grid place-content-center space-y-8 px-6 min-h-[calc(100dvh-50px)]">
        <h1 className="text-7xl font-semibold flex flex-col text-cararra">
          Feedback <br />
          Mixer
        </h1>
        <Form {...form}>
          <form action={formAction} autoComplete="off">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name={`teacher_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Dein Name"
                        className="rounded-full text-center h-14 focus-within:border-none text-lg focus-visible:ring-offset-0 focus:ring-0 placeholder:text-gray-chateau"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`teacher_code`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Dein Code"
                        className="rounded-full text-center h-14 focus-within:border-none text-lg focus-visible:ring-offset-0 focus:ring-0 placeholder:text-gray-chateau"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
              <div className="pt-6">
                <SubmitButton isValid={isValid} />
              </div>
            </div>
          </form>
        </Form>
      </div>
      <Policy />
      </div>
  );
}

"use client";
import Header from "@/components/header/header";
import Policy from "@/components/policy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import useNewSessions from "@/hooks/useNewSessions";
import { Controller } from "react-hook-form";

const NewSession = ({ params }: { params: { teacher_id: string } }) => {
  const { teacher_id } = params || {};
  const { handleSubmit, control, formState, onSubmit, errors, loading } =
    useNewSessions(teacher_id as string);
  return (
    <>
    <div className="bg-teacher-page-1 bg-cover max-h-screen">
      <div className="min-h-[calc(100dvh-50px)]">
        <Header
          mainsession="text-white"
          newsession="text-white border-b-4 border-b-greenButton"
        />
        <div className="grid place-content-center space-y-8 px-6 min-h-[calc(100dvh-50px)]">
          <h1 className="text-7xl font-semibold flex flex-col text-cararra">
            Feedback <br />
            Mixer
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="space-y-2">
              <Controller
                name="sessionName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Name der Session"
                    className={`rounded-full text-center h-14 focus-within:border-none text-lg focus-visible:ring-offset-0 focus:ring-0 placeholder:text-fontcolor ${
                      errors?.sessionName
                        ? "!border border-utility-red !ring-0"
                        : ""
                    }`}
                    value={field?.value}
                  />
                )}
              />
            </div>
            <div className="w-full flex justify-center mt-6">
              <Button
                type="submit"
                backgroundColors={"green"}
                size={"buttonSize"}
                variant={"greenButtonHover"}
                disabled={!formState.isValid}
                className="disabled:bg-greenButton disabled:opacity-100"
              >
                Let&apos;s go!
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Policy />
      </div>
      <Loader loading={loading} />
    </>
  );
};

export default NewSession;

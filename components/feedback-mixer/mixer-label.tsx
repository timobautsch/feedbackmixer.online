"use client";

import { SesionsDetails } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form/form";
import { Input } from "../ui/input";
import Emoji from "./emoji";
import KnobSection from "./knob-section";
import MixerAvg from "./mixer-avg";

const formSchema = z.object({
  knob1: z.string().min(2).max(30),
  knob2: z.string().min(2).max(30),
  knob3: z.string().min(2).max(30),
  knob4: z.string().min(2).max(30),
  knob5: z.string().min(2).max(30),
  knob6: z.string().min(2).max(30),
  knob7: z.string().min(2).max(30),
  knob8: z.string().min(2).max(30),
  knob9: z.string().min(2).max(30),
  knob01: z.string().min(2).max(30),
  knob02: z.string().min(2).max(30),
  header1: z.string().min(2).max(30),
  header2: z.string().min(2).max(30),
  header3: z.string().min(2).max(30),
});

interface SessionList {
  id: number;
  session_name: string;
  labels: string[];
  header: string[];
}

interface Props {
  hideButton?: boolean;
  disabled?: boolean;
  updateKnob: (values: Record<string, string>) => void;
  selectedSession?: SesionsDetails;
  sessionsList?: SessionList[];
  text_disable?: boolean;
}

const FeedbackMixer = forwardRef<HTMLButtonElement, Props>(
  (
    {
      selectedSession,
      hideButton = false,
      disabled = false,
      updateKnob,
      sessionsList,
      text_disable,
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

    let headers: string[] = [];

    const [first_template] = sessionsList || [];
    const { labels, header } = first_template || {};
    if (selectedSession) {
      const { header } = selectedSession || {};
      headers = header;
    } else {
      headers = header;
    }
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        knob1: labels[0],
        knob2: labels[1],
        knob3: labels[2],
        knob4: labels[3],
        knob5: labels[4],
        knob6: labels[5],
        knob7: labels[6],
        knob8: labels[7],
        knob9: labels[8],
        knob01: labels[9],
        knob02: labels[10],
        avg1: 0,
        avg2: 0,
        avg3: 0,
        emojies1: 1,
        emojies2: 2,
        emojies3: 3,
        header1: headers[0],
        header2: headers[1],
        header3: headers[2],
      },
    });

    React.useEffect(() => {
      if (selectedSession) {
        const { labels } = selectedSession || {};
        if (labels.length > 0) {
          form.reset({
            knob1: labels[0] || "",
            knob2: labels[1] || "",
            knob3: labels[2] || "",
            knob4: labels[3] || "",
            knob5: labels[4] || "",
            knob6: labels[5] || "",
            knob7: labels[6] || "",
            knob8: labels[7] || "",
            knob9: labels[8] || "",
            knob01: labels[9] || "",
            knob02: labels[10] || "",
            header1: headers[0],
            header2: headers[1],
            header3: headers[2],
          });
        }
      }
    }, [selectedSession, form, headers]);

    function onSubmit(values: any) {
      updateKnob(values);
    }

    const handleDoubleClick = (field: string) => {
      setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleKeyDown = (event: any, field: string) => {
      if (event.key === "Enter") {
        setIsEditing((prev) => ({ ...prev, [field]: false }));
      }
    };

    const handleBlur = (field: string) => {
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    };

    return (
      <div className="grid place-content-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="max-w-97 flex flex-col gap-4 bg-desert-storm px-4 pt-4 rounded-3xl border">
              <div className="font-semibold flex justify-between">
                <p className="flex flex-col font-semibold text-lunar-green text-22s">
                  Feedback<span>Mixer</span>
                </p>
                <p className="text-chestnut-rose text-sm">Studierende</p>
              </div>
              <div className="flex gap-5">
                <div className="grid grid-cols-3 gap-5">
                  <div className="flex flex-col gap-5 justify-center items-center text-center">
                    <div className="grid grid-rows-8 items-center">
                      <div className="row-span-2">
                        <FormField
                          control={form.control}
                          name="header1"
                          render={({ field }) => {
                            const { value } = field;
                            return (
                              <>
                                {isEditing["header1"] ? (
                                  <Input
                                    {...field}
                                    onBlur={() => handleBlur("header1")}
                                    onKeyDown={(event) =>
                                      handleKeyDown(event, "header1")
                                    }
                                    className="bg-transparent text-xs w-16 h-4 rounded focus:outline-none border-none"
                                    autoFocus
                                  />
                                ) : (
                                  <p
                                    className="md:text-xs xs:text-14s font-bold text-lunar-green w-87 line-clamp-2 break-words"
                                    onDoubleClick={() =>
                                      handleDoubleClick("header1")
                                    }
                                  >
                                    {value}
                                  </p>
                                )}
                              </>
                            );
                          }}
                        />
                      </div>

                      <div className="row-span-6 flex flex-col items-center gap-2">
                        <FormField
                          control={form.control}
                          name="knob1"
                          render={({ field: { value, onChange } }) => (
                            <KnobSection
                              first_color={"#A72099"}
                              second_color={"#DA5553"}
                              value={0}
                              disabled={disabled}
                              handleTextChange={onChange}
                              textValue={value}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <FormField
                        control={form.control}
                        name="knob2"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#A72099"}
                            second_color={"#DA5553"}
                            value={0}
                            disabled={disabled}
                            handleTextChange={onChange}
                            textValue={value}
                          />
                        )}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <FormField
                        control={form.control}
                        name="knob3"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#A72099"}
                            second_color={"#DA5553"}
                            value={0}
                            disabled={disabled}
                            handleTextChange={onChange}
                            textValue={value}
                          />
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="avg1"
                      render={({ field: { value } }) => (
                        <MixerAvg
                          classNames="bg-gradient-pink"
                          value={(value * 10) / 3}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-5 justify-center items-center text-center">
                    <div className="grid grid-rows-8 items-center">
                      <div className="row-span-2">
                        <FormField
                          control={form.control}
                          name="header2"
                          render={({ field }) => {
                            const { value } = field;
                            return (
                              <>
                                {isEditing["header2"] ? (
                                  <Input
                                    {...field}
                                    onBlur={() => handleBlur("header2")}
                                    onKeyDown={(event) =>
                                      handleKeyDown(event, "header2")
                                    }
                                    className="bg-transparent text-xs w-16 h-4 rounded focus:outline-none border-none"
                                    autoFocus
                                  />
                                ) : (
                                  <p
                                    className="md:text-xs xs:text-14s font-bold text-lunar-green w-87 line-clamp-2 break-words"
                                    onDoubleClick={() =>
                                      handleDoubleClick("header2")
                                    }
                                  >
                                    {value}
                                  </p>
                                )}
                              </>
                            );
                          }}
                        />
                      </div>
                      <div className="row-span-6 flex flex-col items-center gap-2">
                        <FormField
                          control={form.control}
                          name="knob4"
                          render={({ field: { value, onChange } }) => (
                            <KnobSection
                              first_color={"#3E9F7F"}
                              second_color={"#6FDDE8"}
                              value={0}
                              disabled={disabled}
                              handleTextChange={onChange}
                              textValue={value}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <FormField
                        control={form.control}
                        name="knob5"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#3E9F7F"}
                            second_color={"#6FDDE8"}
                            value={0}
                            disabled={disabled}
                            handleTextChange={onChange}
                            textValue={value}
                          />
                        )}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <FormField
                        control={form.control}
                        name="knob6"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#3E9F7F"}
                            second_color={"#6FDDE8"}
                            value={0}
                            disabled={disabled}
                            handleTextChange={onChange}
                            textValue={value}
                          />
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="avg2"
                      render={({ field: { value } }) => (
                        <MixerAvg
                          classNames="bg-gradient-skyblue"
                          value={(value * 10) / 3}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-5 justify-center items-center text-center">
                    <div className="grid grid-rows-8 items-center">
                      <div className="row-span-2">
                        <FormField
                          control={form.control}
                          name="header3"
                          render={({ field }) => {
                            const { value } = field;
                            return (
                              <>
                                {isEditing["header3"] ? (
                                  <Input
                                    {...field}
                                    onBlur={() => handleBlur("header3")}
                                    onKeyDown={(event) =>
                                      handleKeyDown(event, "header3")
                                    }
                                    className="bg-transparent text-xs w-16 h-4 rounded focus:outline-none border-none"
                                    autoFocus
                                  />
                                ) : (
                                  <p
                                    className="md:text-xs xs:text-14s font-bold text-lunar-green w-87 line-clamp-2 break-words"
                                    onDoubleClick={() =>
                                      handleDoubleClick("header3")
                                    }
                                  >
                                    {value}
                                  </p>
                                )}
                              </>
                            );
                          }}
                        />
                      </div>
                      <div className="row-span-6 flex flex-col items-center gap-2">
                        <FormField
                          control={form.control}
                          name="knob7"
                          render={({ field: { value, onChange } }) => (
                            <KnobSection
                              first_color={"#926797"}
                              second_color={"#71D055"}
                              value={0}
                              disabled={disabled}
                              handleTextChange={onChange}
                              textValue={value}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <FormField
                        control={form.control}
                        name="knob8"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#926797"}
                            second_color={"#71D055"}
                            value={0}
                            disabled={disabled}
                            handleTextChange={onChange}
                            textValue={value}
                          />
                        )}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <FormField
                        control={form.control}
                        name="knob9"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#926797"}
                            second_color={"#71D055"}
                            value={0}
                            disabled={disabled}
                            handleTextChange={onChange}
                            textValue={value}
                          />
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="avg3"
                      render={({ field: { value } }) => (
                        <MixerAvg
                          classNames="bg-gradient-green"
                          value={(value * 10) / 3}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-16">
                  <div className="flex flex-col items-center">
                    <p className="text-2xs flex flex-col items-center text-tuatara font-semibold">
                      Deine <span>Stimmung</span>
                    </p>
                    <div className="pt-3 flex flex-col items-center gap-1">
                      <FormField
                        control={form.control}
                        name="emojies1"
                        render={({ field: { value, onChange } }) => (
                          <Emoji
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            icon_label={"davor"}
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="emojies2"
                        render={({ field: { value, onChange } }) => (
                          <Emoji
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            icon_label={"dabei"}
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="emojies3"
                        render={({ field: { value, onChange } }) => (
                          <Emoji
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            icon_label={"danach"}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 pb-4">
                    <FormField
                      control={form.control}
                      name="knob01"
                      render={({ field: { value, onChange } }) => (
                        <KnobSection
                          disabled={disabled}
                          first_color={"#F5CA61"}
                          second_color={"#52F147"}
                          value={0}
                          className={"w-[47px] h-[47px]"}
                          handleTextChange={onChange}
                          textValue={value}
                          knobPadding="p-0.5"
                          smallKnob="p-03"
                          pointerSizeBottom="before:bottom-2"
                          pointerSizeLeft="before:left-2"
                          pointerWidth="before:w-[2.5px]"
                          pointerHeight="before:h-[2.5px]"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FormField
                      control={form.control}
                      name="knob02"
                      render={({ field: { value, onChange } }) => (
                        <KnobSection
                          disabled={disabled}
                          first_color={"#F5CA61"}
                          second_color={"#52F147"}
                          value={0}
                          className={"w-[47px] h-[47px]"}
                          handleTextChange={onChange}
                          textValue={value}
                          knobPadding="p-0.5"
                          smallKnob="p-03"
                          pointerSizeBottom="before:bottom-2"
                          pointerSizeLeft="before:left-2"
                          pointerWidth="before:w-[2.5px]"
                          pointerHeight="before:h-[2.5px]"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              size="buttonSize"
              backgroundColors="lightGreen"
              variant="greenButtonHover"
              ref={ref}
              className={`mt-4 hidden`}
            >
              Let&apos;s go!
            </Button>
          </form>
        </Form>
      </div>
    );
  }
);

FeedbackMixer.displayName = "FeedBackMixer";

export default FeedbackMixer;

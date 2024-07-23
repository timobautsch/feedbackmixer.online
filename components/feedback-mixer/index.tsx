"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form/form";
import Emoji from "./emoji";
import KnobSection from "./knob-section";
import MixerAvg from "./mixer-avg";

const formSchema = z.object({
  knob1: z.number().min(0).max(10),
  knob2: z.number().min(0).max(10),
  knob3: z.number().min(0).max(10),
  knob4: z.number().min(0).max(10),
  knob5: z.number().min(0).max(10),
  knob6: z.number().min(0).max(10),
  knob7: z.number().min(0).max(10),
  knob8: z.number().min(0).max(10),
  knob9: z.number().min(0).max(10),
  knob01: z.number().min(0).max(10),
  knob02: z.number().min(0).max(10),
  avg1: z.number().min(0).max(30),
  avg2: z.number().min(0).max(30),
  avg3: z.number().min(0).max(30),
  emojies1: z.number().min(1).max(3),
  emojies2: z.number().min(1).max(3),
  emojies3: z.number().min(1).max(3),
});

interface Props {
  hideButton?: boolean;
  disabled?: boolean;
  handleSubmit?: (data: Record<string, string>) => void;
  text_disabled?: boolean;
  labelData?: any;
  studentName?: string;
  knobData?: Record<string, any>;
}

export default function FeedbackMixer({
  hideButton = false,
  disabled = false,
  text_disabled = false,
  handleSubmit = () => {},
  labelData,
  studentName,
  knobData,
}: Props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knob1: 0,
      knob2: 0,
      knob3: 0,
      knob4: 0,
      knob5: 0,
      knob6: 0,
      knob7: 0,
      knob8: 0,
      knob9: 0,
      knob01: 0,
      knob02: 0,
      avg1: 0,
      avg2: 0,
      avg3: 0,
      emojies1: 1,
      emojies2: 2,
      emojies3: 3,
    },
  });

  function onSubmit(values: any) {
    setIsButtonDisabled(true);
    handleSubmit?.(values);
  }

  useEffect(() => {
    if (knobData) {
      form.reset({
        ...knobData,
      });
    }
  }, [knobData, form]);

  return (
    <div className="grid justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-97 h-[710px] flex flex-col gap-6 bg-desert-storm px-4 pt-2 lg:pt-4 xxs:p-4 xxs:pl-5 rounded-3xl border">
            <div className="font-semibold flex justify-between pr-4">
              <p className="flex flex-col font-semibold text-lunar-green text-22s">
                Feedback
                <br />
                Mixer
              </p>
              <p className="text-chestnut-rose text-sm">{studentName}</p>
            </div>
            <div className="flex gap-5 pl-1">
              <div className="grid grid-cols-3 gap-7">
                <div className="flex flex-col gap-5 justify-center items-center text-center">
                  {/* <div className="grid grid-rows-8 items-center"> */}
                  <div className="grid grid-rows-4 items-center gap-2">
                    <p className="md:text-xs row-span-1 xs:text-xs font-bold text-lunar-green w-87 line-clamp-2 break-words">
                      {labelData?.header1 || ""}
                    </p>
                    <div className="row-span-3">
                      <FormField
                        control={form.control}
                        name="knob1"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#A72099"}
                            second_color={"#DA5553"}
                            value={value}
                            textValue={labelData?.knob1 || ""}
                            disabled={disabled}
                            text_disabled={text_disabled}
                            handleOnChange={(number) => {
                              const knob2 = form.getValues("knob2") || 0;
                              const knob3 = form.getValues("knob3") || 0;
                              form.setValue("avg1", number + knob2 + knob3);
                              onChange(number);
                            }}
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
                          value={value}
                          disabled={disabled}
                          textValue={labelData?.knob2 || ""}
                          text_disabled={text_disabled}
                          handleOnChange={(number) => {
                            const knob1 = form.getValues("knob1") || 0;
                            const knob3 = form.getValues("knob3") || 0;
                            form.setValue("avg1", knob1 + number + knob3);
                            onChange(number);
                          }}
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
                          value={value}
                          disabled={disabled}
                          textValue={labelData?.knob3 || ""}
                          text_disabled={text_disabled}
                          handleOnChange={(number) => {
                            const knob1 = form.getValues("knob1") || 0;
                            const knob2 = form.getValues("knob2") || 0;
                            form.setValue("avg1", knob1 + number + knob2);
                            onChange(number);
                          }}
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
                  {/* </div> */}
                </div>

                <div className="flex flex-col gap-5 justify-center items-center text-center">
                  <div className="grid grid-rows-4  items-center gap-2">
                    <p className="md:text-xs row-span-1 xs:text-14s font-bold text-lunar-green w-87 line-clamp-2 break-words">
                      {labelData?.header2 || ""}
                    </p>
                    <div className="row-span-3">
                      <FormField
                        control={form.control}
                        name="knob4"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#3E9F7F"}
                            second_color={"#6FDDE8"}
                            value={value}
                            disabled={disabled}
                            textValue={labelData?.knob4 || ""}
                            text_disabled={text_disabled}
                            handleOnChange={(number) => {
                              const knob5 = form.getValues("knob5") || 0;
                              const knob6 = form.getValues("knob6") || 0;
                              form.setValue("avg2", knob5 + number + knob6);
                              onChange(number);
                            }}
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
                          value={value}
                          disabled={disabled}
                          textValue={labelData?.knob5 || ""}
                          text_disabled={text_disabled}
                          handleOnChange={(number) => {
                            const knob4 = form.getValues("knob4") || 0;
                            const knob6 = form.getValues("knob6") || 0;
                            form.setValue("avg2", knob4 + number + knob6);
                            onChange(number);
                          }}
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
                          value={value}
                          disabled={disabled}
                          textValue={labelData?.knob6 || ""}
                          text_disabled={text_disabled}
                          handleOnChange={(number) => {
                            const knob4 = form.getValues("knob4") || 0;
                            const knob5 = form.getValues("knob5") || 0;
                            form.setValue("avg2", knob4 + number + knob5);
                            onChange(number);
                          }}
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
                  <div className="grid grid-rows-4 items-center gap-2">
                    <p className="md:text-xs row-span-1 xs:text-14s font-bold text-lunar-green w-87 line-clamp-2 break-words">
                      {labelData?.header3 || ""}
                    </p>
                    <div className="row-span-3">
                      <FormField
                        control={form.control}
                        name="knob7"
                        render={({ field: { value, onChange } }) => (
                          <KnobSection
                            first_color={"#926797"}
                            second_color={"#71D055"}
                            value={value}
                            disabled={disabled}
                            textValue={labelData?.knob7 || ""}
                            text_disabled={text_disabled}
                            handleOnChange={(number) => {
                              const knob8 = form.getValues("knob8") || 0;
                              const knob9 = form.getValues("knob9") || 0;
                              form.setValue("avg3", knob8 + number + knob9);
                              onChange(number);
                            }}
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
                          value={value}
                          disabled={disabled}
                          textValue={labelData?.knob8 || ""}
                          text_disabled={text_disabled}
                          handleOnChange={(number) => {
                            const knob7 = form.getValues("knob7") || 0;
                            const knob9 = form.getValues("knob9") || 0;
                            form.setValue("avg3", knob7 + number + knob9);
                            onChange(number);
                          }}
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
                          value={value}
                          disabled={disabled}
                          textValue={labelData?.knob9 || ""}
                          text_disabled={text_disabled}
                          handleOnChange={(number) => {
                            const knob7 = form.getValues("knob7") || 0;
                            const knob8 = form.getValues("knob8") || 0;
                            form.setValue("avg3", knob7 + number + knob8);
                            onChange(number);
                          }}
                        />
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="avg3"
                    render={({ field: { value } }) => {
                      return (
                        <MixerAvg
                          classNames="bg-gradient-green"
                          value={(value * 10) / 3}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col w-16">
                <div className="flex flex-col items-center pt-1">
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
                <div className="flex flex-col items-center gap-2 pb-6">
                  <FormField
                    control={form.control}
                    name="knob01"
                    render={({ field: { value, onChange } }) => (
                      <KnobSection
                        disabled={disabled}
                        first_color={"#F5CA61"}
                        second_color={"#52F147"}
                        value={value}
                        textValue={labelData?.knob01 || ""}
                        text_disabled={text_disabled}
                        handleOnChange={onChange}
                        className={"w-[47px] h-[47px]"}
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
                        value={value}
                        textValue={labelData?.knob02 || ""}
                        text_disabled={text_disabled}
                        handleOnChange={onChange}
                        className={"w-[47px] h-[47px]"}
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
          {!hideButton && (
            <Button
              type="submit"
              size="buttonSize"
              backgroundColors="lightGreen"
              variant="greenButtonHover"
              onClick={() => console.log(form.getValues())}
              className={`mt-4 text-22s text-white`}
              disabled={isButtonDisabled}
            >
              Abschicken
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

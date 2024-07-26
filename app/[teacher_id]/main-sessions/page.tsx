"use client";

import FeedbackMixer from "@/components/feedback-mixer";
import Header from "@/components/header/header";
import Loader from "@/components/ui/loader";
import useTeacher from "@/hooks/useTeacher";
import { SesionsDetails } from "@/lib/interfaces";
import { useCallback, useEffect, useState } from "react";
import Sessions from "./sessions";
import Policy from "@/components/policy";

const Page = ({
  params,
}: {
  params: { teacher_id: string; session_id: string };
}) => {
  const { teacher_id } = params || {};
  const { data, loading } = useTeacher(teacher_id as string);
  const [feedbacks, setFeedbacks] = useState<Array<Record<any, any>> | null>(
    null
  );
  const [labelsData, setLabelsData] = useState<SesionsDetails | null>(null);
  // const [iconCopied, setIconCopied] = useState(false);
  // const [qrIconCopy, setQrIconCopy] = useState(false);
  // const canvasRef = useRef<HTMLDivElement>(null);
  // const { toast } = useToast();
  // const [copiedText, copyToClipboard] = useCopyToClipboard();
  // const route = useRouter();
  // const { Canvas } = useQRCode();
  // const [showDownloadCanvas, setShowDownloadCanvas] = useState(false);
  // const downloadCanvasRef = useRef<HTMLDivElement>(null);

  // const url = `${window.location.host}/${teacher_id}/feedback/${labelsData?.id}`;

  const selectSession = useCallback(
    (id: string | null) => {
      if (!id) {
        setFeedbacks(null);
        setLabelsData(null);
      }
      const session = data[0]?.session_list.find(
        (session: any) => session.id === id
      );
      const { student_feedback, ...labels } = session || {};
      setFeedbacks(student_feedback);
      setLabelsData(labels);
    },
    [data]
  );

  useEffect(() => {
    if (data?.[0]?.session_list?.length) {
      selectSession(data[0]?.session_list[0].id);
    }
  }, [data, selectSession]);

  // const copyQrCode = async () => {
  //   setQrIconCopy(true);
  //   setTimeout(() => setQrIconCopy(false), 5000);
  //   const canvas = canvasRef.current?.querySelector("canvas");
  //   if (canvas) {
  //     try {
  //       const dataUrl = canvas.toDataURL("image/png");
  //       const response = await fetch(dataUrl);
  //       const blob = await response.blob();
  //       const item = new ClipboardItem({ "image/png": blob });
  //       await navigator.clipboard.write([item]);
  //       toast({
  //         variant: "default",
  //         title: "QR code copied to clipboard",
  //       });
  //     } catch (error) {
  //       toast({
  //         variant: "destructive",
  //         title: "Error copying QR code",
  //       });
  //     }
  //   }
  // };

  // const downloadQrCode = () => {
  //   setShowDownloadCanvas(true);
  //   setTimeout(() => {
  //     const downloadCanvas = downloadCanvasRef.current?.querySelector("canvas");
  //     if (downloadCanvas) {
  //       const dataUrl = downloadCanvas.toDataURL("image/png");
  //       const link = document.createElement("a");
  //       link.href = dataUrl;
  //       link.download = "qr_code.png";
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       setShowDownloadCanvas(false);
  //     }
  //   }, 100);
  // };

  // const handleCopyText = (url: string) => {
  //   copyToClipboard(url);
  //   setIconCopied(true);
  //   setTimeout(() => setIconCopied(false), 5000);
  // };

  // const handletoEditSession = (url: string) => {
  //   route.push(`/${params.teacher_id}/new-session/${labelsData?.id}`);
  // };

  return (
    <>
      <div className="relative">
        <div className="bg-main-session-bg bg-cover bg-fixed">
          <div>
            <Header
              newsession="text-white"
              mainsession="text-white border-b-4 border-b-key-lime-pie"
            />
            <div className="p-10 pt-16 pb-5 flex justify-between items-center h-auto">
              <div>
                <h2 className="text-cararra text-5xl font-bold">Feedback</h2>
                <h2 className="text-cararra text-5xl font-bold">Mixer</h2>
              </div>
              {/* {labelsData?.id ? (
            <div className="flex justify-center items-center gap-4 text-white">
              <Button
                backgroundColors={"green"}
                variant={"greenButtonHover"}
                onClick={() => handletoEditSession(url)}
                className="w-28 h-12"
              >
                Manage
              </Button>
              <div className="flex items-center h-12 bg-white rounded-full justify-center">
                <Button
                  variant={"linkButton"}
                  size={"fullSize"}
                  textColor={"black"}
                >
                  <p className="pl-5 truncate">{url}</p>
                </Button>
                <Button
                  onClick={() => handleCopyText(url)}
                  variant={"copyButton"}
                >
                  {iconCopied ? (
                    <TickedIcon width={30} height={30} />
                  ) : (
                    <CopyIcon width={30} height={30} />
                  )}
                </Button>
              </div>
              <div>
                <div className="flex gap-3">
                  <div ref={canvasRef}>
                    <Canvas
                      text={url}
                      options={{
                        margin: 1,
                        width: 100,
                      }}
                    />
                  </div>
                  <div
                    ref={downloadCanvasRef}
                    className={`hidden ${
                      showDownloadCanvas ? "block" : "hidden"
                    }`}
                  >
                    <Canvas
                      text={url}
                      options={{
                        margin: 1,
                        width: 700,
                        scale: 5,
                      }}
                    />
                  </div>
                  <div
                    className="flex items-end cursor-pointer gap-2"
                    onClick={copyQrCode}
                  >
                    {qrIconCopy ? (
                      <TickedIcon width={25} height={25} />
                    ) : (
                      <CopyIcon width={25} height={25} />
                    )}
                    <DownloadIcon
                      width={25}
                      height={25}
                      onClick={downloadQrCode}
                    />
                  </div>
                </div>
                <p className="pt-1">QR Code kopieren</p>
              </div>
            </div>
          ) : (
            ""
          )} */}
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-screen main-session w-full">
            <div className="ml-10 w-2/6">
            <div className={`flex flex-col justify-between h-[calc(100dvh-180px)] w-full`}>
            <div>
              <h2 className="text-key-lime-pie text-2xl font-bold mb-4">
                Sessions
              </h2>
              <Sessions
                sessionList={data[0]?.session_list}
                teacher_id={teacher_id as string}
                selectSession={selectSession}
              />
              </div>
              <Policy className="!pl-2" />
              </div>
            </div>
            <div
              className="w-full overflow-y-auto px-2"
              style={{ transform: "rotateY(180deg)" }}
            >
              {feedbacks && feedbacks?.length > 0 ? (
                <div className="rotate-180 over-x">
                  <div className="overflow-auto">
                    <div
                      className="grid gap-8 max-w-4xl mb-6 px-2"
                      style={{
                        gridTemplateColumns: "repeat(3, 390px)",
                        transform: "rotateX(180deg)",
                      }}
                    >
                      {feedbacks?.map((feedback) => (
                        <FeedbackMixer
                          labelData={labelsData as SesionsDetails}
                          key={feedback.id}
                          knobData={feedback}
                          hideButton={true}
                          disabled
                          studentName={feedback?.student_name}
                          text_disabled
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-2/4 grid xl:items-center place-content-center w-full text-2xl font-bold">
                  <p
                    className="text-white font-bold"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    noch keine Antworten vorhanden
                  </p>
                </div>
              )}
            </div>
          </div>
          <Loader loading={loading} />
        </div>
      </div>
      
    </>
  );
};

export default Page;

"use client";

import FeedbackMixer from "@/components/feedback-mixer/mixer-label";
import Header from "@/components/header/header";
import CopyIcon from "@/components/icons/copy-icon";
import DownloadIcon from "@/components/icons/download-icon";
import Policy from "@/components/policy";
import { Button } from "@/components/ui/button";
import TickedIcon from "@/components/ui/icon/ticked-icon";
import Loader from "@/components/ui/loader";
import { useToast } from "@/components/ui/toast/use-toast";
import { useCopyToClipboard } from "@/hooks/copytoclipboard";
import useIndividualSession from "@/hooks/useIndividualSession";
import useUpdateSessions from "@/hooks/useUpdateSession";
import { SesionsDetails } from "@/lib/interfaces";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const ConfigureSession = ({
  params,
}: {
  params: { teacher_id: string; session_id: string };
}) => {
  const { teacher_id, session_id } = params || {};
  const { updateSession } = useUpdateSessions();
  const { data, loading } = useIndividualSession(teacher_id, session_id);
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const { Canvas } = useQRCode();
  const canvasRef = useRef<HTMLDivElement>(null);
  const feedbackMixerRef = useRef<HTMLButtonElement>(null);
  const [iconCopied, setIconCopied] = useState(false);
  const [showDownloadCanvas, setShowDownloadCanvas] = useState(false);
  const downloadCanvasRef = useRef<HTMLDivElement>(null);

  const url = `${window.location.host}/${teacher_id}/feedback/${session_id}`;

  const downloadQrCode = () => {
    setShowDownloadCanvas(true);
    setTimeout(() => {
      const downloadCanvas = downloadCanvasRef.current?.querySelector("canvas");
      if (downloadCanvas) {
        const dataUrl = downloadCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr_code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowDownloadCanvas(false);
      }
    }, 100);
  };

  const handleCopyText = (url: string) => {
    copyToClipboard(url);
    setIconCopied(true);
    feedbackMixerRef?.current?.click();
    setTimeout(() => setIconCopied(false), 5000);
  };

  // const handleSubmit = () => {
  //   feedbackMixerRef?.current?.click();
  //   route.push(`/${params.teacher_id}/main-sessions`);
  // };

  // const handletoStudentPage = (url: string) => {
  //   // feedbackMixerRef?.current?.click();
  //   // route.push(`/${params.teacher_id}/feedback/${params.session_id}`);
  //   toast({
  //     variant: "default",
  //     title: "Link wurde erstellt✅",
  //   });
  // };

  const updateKnob = (data: Record<string, string>) => {
    updateSession(session_id, teacher_id, data);
  };

  interface SessionList {
    id: number;
    session_name: string;
    labels: string[];
    header: string[];
  }

  const sessionsList: SessionList[] = [
    {
      id: 1,
      session_name: "Workshop-Mixer",
      labels: [
        "Gefordert sein",
        "Gestaltungsspielraum",
        "Aktivierung",
        "Leistungs-niveau",
        "Kooperation",
        "Interaktion",
        "Anspruch",
        "Kompetenz",
        "Methodik",
        "anwendbar in der Schule",
        "ich will mehr",
      ],
      header: ["ICH", "GRUPPE", "DOZENT*IN"],
    },
    {
      id: 2,
      session_name: "Unterrichts-Mixer 1",
      labels: [
        "Vielfalt",
        "Interaktivität",
        "Lern-förderlichkeit",
        "Beziehungs-gestaltung",
        "Motivation",
        "Wert-schätzung",
        "Wissens-zuwachs",
        "Methoden-kompetenz",
        "Medien-kompetenz",
        "Anwendbarkeit",
        "mehr davon",
      ],
      header: ["METHODE", "GRUPPENKLIMA", "LERNERFOLG"],
    },
    {
      id: 3,
      session_name: "Unterrichts-Mixer 2",
      labels: [
        "klare Struktur",
        "klarer Inhalt",
        "Ziel-transparenz",
        "echte Lernzeit",
        "Lernklima",
        "Übezeit",
        "Methoden-vielfalt",
        "Binnen-diff-erenzierung",
        "Vorbereitung",
        "Sinn Kommunizieren",
        "Transfer",
      ],
      header: ["INHALT", "LERNEN", "UNTERRICHTEN"],
    },
    {
      id: 4,
      session_name: "Fortbildungs-Mixer",
      labels: [
        "Vernetzung",
        "Augenhöhe",
        "Unterstützungs-angebote",
        "Zugänglich-keit",
        "Handlungs-Spielraum",
        "Wirksamkeit",
        "Fachspezifik",
        "Übertrag-barkeit",
        "Schulrelevanz",
        "Spaßfaktor",
        "Innovations-faktor",
      ],
      header: ["AUS-TAUSCH", "F. FORMAT", "INHALT"],
    },
    {
      id: 5,
      session_name: "Unterrichts-Mixer 3",
      labels: [
        "Struktur",
        "Verständlichkeit",
        "Sinnvoll",
        "Tempo",
        "Abwechslung",
        "Zielklarheit",
        "Athmosphäre",
        "Motivation",
        "kooperatives Arbeiten",
        "Spaßfaktor",
        "so viel gelernt",
      ],
      header: ["THEMA", "UNTERRICHT", "KLASSE"],
    },
  ];

  const [selectedSession, setSelectedSession] = useState<any | null>(null);

  const handleSessionClick = (sessionId: number) => {
    const session = sessionsList.find((item) => item.id === sessionId);

    if (session) {
      const { labels } = session || {};
      setSelectedSession(session);
    }
  };

  return (
    <div className="bg-config-session bg-cover bg-fixed h-screen overflow-y-auto pt-14">
      <div className="space-y-11">
        <Header
          mainsession="text-white"
          newsession="text-white border-b-4 border-b-greenButton"
        />
        <div className="flex flex-col items-center justify-center space-y-10">
          <div className="w-full px-28">
            <div className="grid grid-cols-12">
              <section className="col-span-3 main-session flex flex-col justify-between h-[calc(100dvh-120px)] w-full">
                <div>
                <h2 className="text-2xl font-semibold text-jungle-green">
                  Session Templates
                </h2>
                <div
                  className="flex flex-col gap-3 lg:items-start
                 w-56 2sm:items-center overflow-y-auto mt-5"
                >
                  {sessionsList.map((item, index) => {
                    const { id, session_name } = item;
                    return (
                      <p
                        className="text-white cursor-pointer"
                        key={id}
                        onClick={() => handleSessionClick(id)}
                      >
                        {session_name}
                      </p>
                    );
                  })}
                </div>
                </div>
                <Policy className="!pl-2" />
              </section>
              <section className="col-span-5">
                <FeedbackMixer
                  hideButton={true}
                  disabled
                  text_disable={false}
                  ref={feedbackMixerRef}
                  updateKnob={updateKnob}
                  selectedSession={selectedSession as SesionsDetails}
                  sessionsList={sessionsList as SessionList[]}
                />
              </section>
              <section className="col-span-3 text-white flex flex-col justify-between">
                <div className="space-y-10">
                  <div className="space-y-3">
                    <div className="flex items-center h-14 w-full bg-white rounded-full">
                      <Button
                        variant={"linkButton"}
                        size={"fullSize"}
                        textColor={"black"}
                      >
                        <p className="pl-2 truncate">{url}</p>
                      </Button>
                      <Button
                        onClick={() => handleCopyText(url)}
                        variant={"copyButton"}
                      >
                        {iconCopied ? (
                          <TickedIcon width={35} height={35} />
                        ) : (
                          <CopyIcon width={35} height={35} />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-2">
                    <div className="flex gap-5">
                      <div ref={canvasRef}>
                        <Canvas
                          text={url}
                          options={{
                            margin: 1,
                            width: 145,
                            scale: 5,
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
                      <div className="flex items-end">
                        <DownloadIcon
                          width={35}
                          height={35}
                          onClick={downloadQrCode}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default ConfigureSession;

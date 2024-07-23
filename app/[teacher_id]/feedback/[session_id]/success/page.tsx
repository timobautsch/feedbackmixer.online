import Policy from "@/components/policy";

export default function Page() {
  return (
    <div className="md:bg-felix-koutchinsk xxs:bg-iPhone bg-cover bg-no-repeat h-screen">
    <div className="min-h-[calc(100dvh-50px)] w-screen flex md:justify-end xs:justify-start pt-40">
      <h2 className="text-77 font-semibold text-cararra flex flex-col md:pr-44 md:block xs:hidden">
        Danke dir! <br />
        Bis bald!
      </h2>
      <h2 className="text-77 leading-none font-semibold text-cararra flex flex-col md:hidden xs:block pl-5">
        Danke <br /> dir! <br />
        Bis <br /> bald!
      </h2>
    </div>
    <Policy />
    </div>
  );
}

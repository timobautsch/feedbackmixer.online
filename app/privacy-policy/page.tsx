import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="flex xxs:flex-col-reverse xl:flex-row sm:bg-privacy-policy xxs:bg-privacy-policy-res bg-cover w-full">
      <div className="mt-5 xl:w-3/5 xxs:w-full xl:p-32 xxs:p-7">
        <div className="border p-5 grid xl:grid-cols-3 xxs:grid-cols-2 gap-4 bg-white">
          <Image
            height={123}
            width={270}
            src={"/assets/images/privacy-policy1.png"}
            alt="lernen:digital Kompetenzzentrum Musik/Kunst/Sport"
          />
          <Image
            height={123}
            width={147}
            src={"/assets/images/privacy-policy2.png"}
            alt="Funded by the Europen Union"
          />
          <Image
            height={147}
            width={192}
            src={"/assets/images/privacy-policy3.png"}
            alt="Bundesministerium für Bildung und Forschung"
          />
          <Image
            height={85}
            width={258}
            src={"/assets/images/privacy-policy4.png"}
            alt="DigiPro SMK"
          />
          <Image
            height={135}
            width={160}
            src={"/assets/images/privacy-policy5.png"}
            alt="hmt-rostock.de"
          />
        </div>
      </div>
      <div className="xl:w-2/5 xxs:w-full xl:p-11 xxs:p-7">
        <h2 className="xxs:text-6xl xl:text-77 font-semibold text-cararra mb-12">
          Impressum
        </h2>
        <div className="text-base font-normal text-cararra space-y-7">
          <p>
            HERAUSGEBER <br />
            Digitale Musikpraxis <br /> Hochschule für Musik und Theater Rostock{" "}
            <br />
            Beim St.-Katharinenstift 8 <br /> 18055 Rostock <br /> fon +49 381
            5108-0 (Zentrale) <br /> fax +49 381 5108-101 <br />{" "}
            digitales-musizieren@hmt-rostock.de
          </p>

          <p>
            Die Hochschule für Musik und Theater Rostock ist eine Körperschaft
            des Öffentlichen Rechts. Sie wird durch den Rektor vertreten.
          </p>

          <p>
            COPYRIGHT <br />
            Sämtliche Inhalte der Internetseite der Hochschule für Musik und
            Theater Rostock sind urheberrechtlich geschützt. Die
            Vervielfältigung von Informationen, insbesondere die Verwendung von
            Texten, Textteilen oder Bildmaterial bedarf der vorherigen
            schriftlichen Genehmigung.
          </p>

          <p>
            Unterrichts-Mixer 3 ist inspiriert von: Dr. Wenke, Stephan (2019) :
            Beilage zum Friedrich Jahresheft 2019, Seelze, Friedrich Verlag
            GmbH, S.10 „Spinnennetz“
          </p>
          <p>
            Unterrichts-Mixer 2 ist inspiriert von Holger Meyers 10 Merkmale
            guten Unterrichts: Meyer, Holger. (2011): Was ist guter Unterricht?,
            Berlin, Cornelsen Verlag
          </p>

          <p className="pt-10">
            HAFTUNGSAUSSCHUSS <br />
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Richtigkeit, Vollständigkeit und Aktualität unserer
            Webseiten sowie für die Inhalte externer Links. Für den Inhalt der
            verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich.
          </p>

          <p>
            ZUSTÄNDIGE AUFSICHTSBEHÖRDE <br />
            Ministerium für Bildung, Wissenschaft und Kultur <br />
            Mecklenburg-Vorpommern <br />
            Werderstr. 124 <br />
            19055 Schwerin <br />
            fon +49 385 588-0 <br />
            fax +49 385 588-7082 <br />
            www.bm.regierung-mv.de <br />
            588-0 fax +49 385 588-7082 www.bm.regierung-mv.de
          </p>

          <p>
            FOTOS <br />
            Fotos von Felix Koutchinski, Markus Spiske, Nathan Bingle, Isobel
            Radakovic und James Stamler auf Unsplash. www.unsplash.com
          </p>

          <p>
            KONZEPT UND DESIGN UND PROGRAMMIERUNG <br />
            Blockresearch.ai
          </p>

          <p>
            BETREUUNG <br />
            Marten Pankow, künstlerischer Mitarbeiter für digitale Lehre
          </p>
        </div>
      </div>
    </div>
  );
}

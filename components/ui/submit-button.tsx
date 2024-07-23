import { useFormStatus } from "react-dom";
import { Button } from "./button";
import Loader from "./loader";

interface Props {
  isValid: boolean;
}

const SubmitButton = ({ isValid }: Props) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        type="submit"
        size={"buttonSize"}
        backgroundColors={"pink"}
        textColor={"default"}
        variant={"pinButtonHover"}
        disabled={!isValid}
        className="disabled:bg-pinkButton disabled:opacity-100"
      >
        Let&apos;s go!
      </Button>
      <Loader loading={pending} />
    </>
  );
};

export default SubmitButton;

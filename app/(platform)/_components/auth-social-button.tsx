import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

export const AuthSocialButton = ({
  icon: Icon,
  onClick,
}: AuthSocialButtonProps) => {
  return (
    <Button type="button" onClick={onClick}>
      <Icon />
    </Button>
  );
};

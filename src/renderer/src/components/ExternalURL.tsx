import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  href: string;
}

const ExternalURL = ({ children, onClick, href, ...props }: Props) => {
  const handleClick = async () => {
    await window.api.app.openExternalURL(href);
  };
  return (
    <button role="link" onClick={() => handleClick()} {...props}>
      {children}
    </button>
  );
};

export default ExternalURL;

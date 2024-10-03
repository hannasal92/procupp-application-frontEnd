import s from "./header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  children: React.ReactNode;
};

const NextLink: React.FC<Props> = ({ href, children, onClick }) => {
  const { pathname } = useRouter();

  const isActive = pathname === href;

  return (
    <Link
      className={`link ${s.link}`}
      href={href}
      data-active={isActive}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NextLink;

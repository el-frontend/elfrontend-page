import clsx from "clsx";
import Link from "next/link";
import { socialMedia } from "./social";

type Props = {
  className?: string;
  showLabel?: boolean;
};

const SocialList: React.FC<Props> = ({ className, showLabel }) => {
  return (
    <div className={clsx(`flex justify-center items-center gap-6`, className)}>
      {socialMedia.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className={`${social.className} hover:transform hover:scale-110 transition-transform duration-500 text-primary flex justify-center gap-4 items-center`}
        >
          {social.icon}
          {showLabel && social.name}
        </Link>
      ))}
    </div>
  );
};

export default SocialList;

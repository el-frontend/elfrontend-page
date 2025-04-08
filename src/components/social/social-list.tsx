import { socialMedia } from "./social";

const SocialList = () => {
  return (
    <div className="flex justify-center items-center gap-6">
      {socialMedia.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className={`${social.className} hover:transform hover:scale-110 transition-transform duration-500`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialList;

import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitchIcon,
  YoutubeIcon,
} from "@/components/icons";

export type SocialMedia = {
  name: string;
  url: string;
  icon: React.ReactNode;
  className: string;
};

export const socialMedia: SocialMedia[] = [
  {
    name: "Youtube",
    url: "https://youtube.com/@ElFrontend",
    icon: <YoutubeIcon/>,
    className: "hover:text-red-600",
  },
  {
    name: "GitHub",
    url: "https://github.com/el-frontend",
    icon: <GithubIcon />,
    className: "hover:text-gray-800",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/carlos-chao",
    icon: <LinkedinIcon />,
    className: "hover:text-blue-700",
  },
  {
    name: "Twitch",
    url: "https://twitch.tv/elfrontend",
    icon: <TwitchIcon />,
    className: "hover:text-purple-700",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/elfrontend",
    icon: <InstagramIcon />,
    className: "hover:text-pink-600",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61559215125524",
    icon: <FacebookIcon />,
    className: "hover:text-blue-600",
  },
];

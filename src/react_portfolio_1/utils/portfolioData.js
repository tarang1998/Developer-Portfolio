import { Facebook, LinkedIn, Twitter, GitHub, Instagram } from "@material-ui/icons";

const personalData = {
  name: "Tarang Nair",
  title: "Software Developer",
  birthday: "29th June 1998",
  contact: "9769712443",
  email: "tarangnair98@gmail.com",
  resumeLink: "https://docs.google.com/document/d/1Ixhm9nXeaZX-UGDvIJ9mS1ZxDIetzrD-k_AUtPqt7Is/edit?usp=sharing"
};

const greetingData = {
  title: 'Hello👋'
}


const contactPlatforms = [
  {
    platform: "Github",
    link: "https://github.com/tarang1998",
    iconifyIconId: "skill-icons:github-light",

  },
  {
    platform: "Linkedin",
    link: "https://www.linkedin.com/in/tarang-nair-752aa8179/",
    iconifyIconId: "skill-icons:linkedin",
    // style: {
    //   color: "#49b463",
    // },
  },
  {
    platform: "Instagram",
    link: "https://www.instagram.com/nairtarang/",
    iconifyIconId: "skill-icons:instagram",
    // style: {
    //   color: "#9ea39f",
    // },
  },
  {
    platform: "Facebook",
    link: "https://www.facebook.com/tarangnair",
    iconifyIconId: "devicon:facebook",
    // style: {
    //   color: "#00000",
    // },
  },
  {
    platform: "Twitter",
    link: 'https://twitter.com/tarang90564113',
    iconifyIconId: "skill-icons:twitter",
    // style: {
    //   color: "#00000",
    // },
  },
  {
    platform: "GitLab",
    link: 'https://gitlab.com/tarangnair98',
    iconifyIconId: "skill-icons:gitlab-dark",
    // style: {
    //   color: "#00000",
    // },
  },
  {
    platform: "Gmail",
    link: 'mailto:tarangnair98@gmail.com',
    iconifyIconId: "logos:google-gmail",
    // style: {
    //   color: "#00000",
    // },
  },

];


const mediaLinks = {
  socials: {
    Facebook: {
      link: "https://www.facebook.com/tarangnair",
      text: "tarangnair",
      icon: <Facebook />,
    },
    Twitter: {
      link: "https://twitter.com/tarang90564113",
      text: "tarang",
      icon: <Twitter />,
    },
    Linkedin: {
      link: "https://www.linkedin.com/in/tarang-nair-752aa8179/",
      text: "tarang",
      icon: <LinkedIn />,
    },
    Github: {
      link: "https://github.com/tarang1998",
      text: "tarang1998",
      icon: <GitHub />,
    },
    Instagram: {
      link: "https://www.instagram.com/nairtarang/",
      text: "nairtarang",
      icon: <Instagram />,
    }
  },
};

const introduction = {
  aboutMe:
    "A graduate student pursuing my Masters in Software Engineering from University Of Maryland, College Park and a software developer experienced in building scalable applications. I love to take up hard challenges, collaborate with people, automate things and solve real world problems. Feel free to connect !",
};



export { personalData, greetingData, mediaLinks, introduction, contactPlatforms };

import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: emre.aygener@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/emreaygener",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/emreaygener/",
  },
  {
    icon: faMedium,
    url: "https://medium.com/@emreaygener",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com/users/22966147/emre-aygener",
  },
];

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const ref = useRef(null);
  const prevScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = ref.current;
      if (currentScrollY > prevScrollY.current) {
        header.style.transform = "translateY(-200px)";
      } else {
        header.style.transform = "translateY(0)";
      }
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      ref={ref}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            {/* Add social media links based on the `socials` data */}
            {socials.map((social) => (
              <a style={{ marginRight: "1vw" }} href={social.url}>
                <FontAwesomeIcon icon={social.icon} size="2x" />
              </a>
            ))}
          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
              <a href="/#contact-me" onClick={handleClick("contactme")}>
                Contact Me
              </a>
              <a href="/#projects" onClick={handleClick("projects")}>
                Projects
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
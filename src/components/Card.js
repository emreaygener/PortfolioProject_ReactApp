import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <>
      <VStack
        w="100%"
        h="100%"
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
        spacing={4}
        _hover={{
          boxShadow: "xl",
          transform: "translateY(-4px)",
        }}
        transition="all 0.2s ease-in-out"
      >
        <Image
          src={imageSrc}
          alt="project image"
          objectFit="cover"
          w="100%"
          h="100%"
        />
        <VStack
          alignItems="flex-start"
          spacing={4}
          p={4}
          textAlign="left"
          w="100%"
          color="gray.700"
        >
          <Heading as="h3" size="md">
            {title}
          </Heading>
          <Text>{description}</Text>
          <HStack>
            <Text>View project</Text>
            <FontAwesomeIcon icon={faArrowRight} />
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default Card;

import React from "react";
import { Flex, HStack, Text, CloseButton } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";

const ChatHeader = ({ onClose }) => {
  return (
    <Flex
      bg="blue.500"
      p={3}
      color="white"
      alignItems="center"
      justifyContent="space-between"
      borderTopLeftRadius="md"
      borderTopRightRadius="md"
    >
      <HStack>
        <FaRobot />
        <Text fontWeight="bold">LSEG ChatBot</Text>
      </HStack>
      <CloseButton _hover={{ bg: "blue.600" }} onClick={onClose} />
    </Flex>
  );
};

export default ChatHeader;

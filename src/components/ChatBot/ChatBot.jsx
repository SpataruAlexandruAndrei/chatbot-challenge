import React, { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatHistory from "./ChatHistory";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <IconButton
        position="fixed"
        bottom="10px"
        right="10px"
        borderRadius="md"
        cursor="pointer"
        bg="blue.500"
        _hover={{ bg: "blue.600" }}
        onClick={toggleChat}
        aria-label="Open chatbot"
        size="xl"
      >
        <FaRobot color="white" />
      </IconButton>
    );
  }

  return (
    <Box
      position="fixed"
      bottom="10px"
      right="10px"
      display="flex"
      flexDirection="column"
      width={["75%", "500px"]}
      height="66%"
      borderRadius="lg"
      boxShadow="xl"
      zIndex={10}
    >
      <ChatHeader onClose={toggleChat} />
      <ChatHistory />
      <ChatFooter />
    </Box>
  );
};

export default ChatBot;

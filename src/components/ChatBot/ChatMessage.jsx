import React from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

const ChatMessage = ({ id, message, isBot, isLoading, children }) => {
  const bgColor = useColorModeValue(
    isBot ? "blue.100" : "gray.100",
    isBot ? "blue.400" : "gray.700"
  );

  return (
    <Box
      key={id}
      bg={bgColor}
      p={3}
      width="fit-content"
      borderRadius="lg"
      mb={2}
    >
      {isLoading ? (
        <Box display="flex" gap={1}>
          <Text>{message}</Text>
          <Box alignSelf="end">
            <Spinner size="sm" />
          </Box>
        </Box>
      ) : (
        <>
          <Text>{message}</Text>
          {children}
        </>
      )}
    </Box>
  );
};

export default ChatMessage;

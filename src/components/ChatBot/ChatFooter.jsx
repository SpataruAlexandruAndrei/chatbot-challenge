import { Box, Text } from "@chakra-ui/react";
import { IoMdArrowDropright } from "react-icons/io";

const ChatFooter = () => {
  return (
    <Box
      bg="gray.200"
      minHeight="48px"
      display="flex"
      alignItems="center"
      borderBottomLeftRadius="md"
      borderBottomRightRadius="md"
      justifyContent="space-between"
      px={2}
    >
      <Text color="gray.600">Please pick an option.</Text>{" "}
      <IoMdArrowDropright size={22} color="#4A4A4A" />{" "}
    </Box>
  );
};

export default ChatFooter;

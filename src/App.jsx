import { Box, Heading } from "@chakra-ui/react";
import ChatBot from "./components/ChatBot/ChatBot";

const App = () => {
  return (
    <main>
      <Box
        height="100vh"
        position="relative"
        display="grid"
        placeItems="center"
        justifyItems="center"
        bg="white"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Heading size="3xl" color="black">
            Hello! This is my ChatBot! 🤖
          </Heading>
        </Box>
        <ChatBot />
      </Box>
    </main>
  );
};

export default App;

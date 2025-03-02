import { createRoot } from "react-dom/client";
import { Provider as ChakraProvider } from "./components/ui/provider.jsx";
import { createSystem, defineConfig } from "@chakra-ui/react";
import App from "./App.jsx";

const config = defineConfig({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
  },
});

const theme = createSystem(config);

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

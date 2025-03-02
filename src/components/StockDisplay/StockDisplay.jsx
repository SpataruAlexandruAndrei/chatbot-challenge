import React from "react";
import { VStack, HStack, Button } from "@chakra-ui/react";

const StockDisplay = ({
  options,
  optionsDisabled,
  onBackToStocks,
  handleBackToMainMenu,
}) => {
  return (
    <VStack spacing={2} align="stretch">
      <HStack>
        {options.map((option) => (
          <Button
            key={option.id}
            onClick={
              option.id === "main" ? handleBackToMainMenu : onBackToStocks
            }
            colorScheme="blue"
            size="sm"
            flex={1}
            disabled={optionsDisabled}
          >
            {option.text}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

export default StockDisplay;

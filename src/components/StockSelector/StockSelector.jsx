import React from "react";
import { VStack, Button } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";

const StockSelector = ({
  stocks,
  optionsDisabled,
  onSelect,
  onBackToMainMenu,
}) => {
  return (
    <VStack spacing={2} align="stretch">
      {stocks.map((stock) => (
        <Button
          key={stock.code}
          onClick={() => onSelect(stock)}
          justifyContent="flex-start"
          variant="outline"
          disabled={optionsDisabled}
        >
          {stock.stockName}
        </Button>
      ))}
      <Button
        leftIcon={<FaHome />}
        onClick={onBackToMainMenu}
        colorScheme="blue"
        size="sm"
        disabled={optionsDisabled}
      >
        Main menu
      </Button>
    </VStack>
  );
};

export default StockSelector;

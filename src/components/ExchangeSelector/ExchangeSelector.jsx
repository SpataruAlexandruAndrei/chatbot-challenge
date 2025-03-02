import React from "react";
import { VStack, Button } from "@chakra-ui/react";

const ExchangeSelector = ({ exchanges, optionsDisabled, onSelect }) => {
  return (
    <VStack spacing={2} align="stretch">
      {exchanges.map((exchange) => (
        <Button
          key={exchange.code}
          onClick={() => onSelect(exchange)}
          justifyContent="flex-start"
          variant="outline"
          disabled={optionsDisabled}
        >
          {exchange.stockName}
        </Button>
      ))}
    </VStack>
  );
};

export default ExchangeSelector;

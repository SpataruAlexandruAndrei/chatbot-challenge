import React from "react";
import { Box } from "@chakra-ui/react";
import ExchangeSelector from "../ExchangeSelector/ExchangeSelector";
import StockSelector from "../StockSelector/StockSelector";
import StockDisplay from "../StockDisplay/StockDisplay";

const ChatOptions = ({
  chatOption,
  optionsDisabled,
  handleOptionSelect,
  handleBackToMainMenu,
  handleBackToStocks,
}) => {
  const renderContent = () => {
    switch (chatOption.optionType) {
      case "stock":
        return (
          <ExchangeSelector
            exchanges={chatOption.options}
            onSelect={handleOptionSelect}
            optionsDisabled={optionsDisabled}
          />
        );
      case "topStock":
        return (
          <StockSelector
            stocks={chatOption.options}
            onSelect={handleOptionSelect}
            onBackToMainMenu={handleBackToMainMenu}
            optionsDisabled={optionsDisabled}
          />
        );
      default:
        return (
          <StockDisplay
            options={chatOption.options}
            onBackToStocks={handleBackToStocks}
            handleBackToMainMenu={handleBackToMainMenu}
            optionsDisabled={optionsDisabled}
          />
        );
    }
  };
  return (
    <Box p={3} borderTop="1px" borderTopColor="gray.200">
      {renderContent()}
    </Box>
  );
};

export default ChatOptions;

import React, { useEffect, useState, useRef } from "react";
import { Box, VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import { FaRobot } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import ChatOptions from "./ChatOptions";
import { getStockData } from "../../services/stockExchange";

import { generateChatHistMessage } from "../../utils/utils";

const ChatHistory = () => {
  const [stockData, setStockData] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    generateChatHistMessage(
      "welcome",
      "Hello! Welcome to LSEG. I'm here to help you.",
      true,
      false
    ),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStocks, setCurrentStocks] = useState(null);
  const dummyRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const stockExchangeData = await getStockData();
        setStockData(stockExchangeData);

        setChatHistory((prev) => [
          ...prev,
          generateChatHistMessage(
            "stock",
            "Please select a Stock Exchange.",
            true,
            true,
            {
              optionType: "stock",
              options: stockExchangeData.map((stock) => ({
                code: stock.code,
                stockName: stock.stockExchange,
              })),
            }
          ),
        ]);
      } catch (error) {
        setChatHistory((prev) => [
          ...prev,
          generateChatHistMessage(
            "error",
            "Oops! An error occurred. Please try again later!",
            true,
            true
          ),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setStockData([]);
      setChatHistory([
        generateChatHistMessage(
          "welcome",
          "Hello! Welcome to LSEG. I'm here to help you.",
          true,
          false
        ),
      ]);
      setCurrentStocks(null);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      setChatHistory((prev) => [
        ...prev,
        generateChatHistMessage("loading", "Loading", true, true),
      ]);
    } else {
      setChatHistory((prev) =>
        prev.filter((value) => value.name !== "loading")
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (dummyRef.current) {
      dummyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleStockExchangeSelect = (exchange) => {
    setChatHistory((prev) => [
      ...prev,
      generateChatHistMessage("user", exchange.stockName, false),
    ]);

    setIsLoading(true);

    try {
      const filtredStockData = stockData.find(
        (stock) => stock.code === exchange.code
      );

      setCurrentStocks(
        filtredStockData.topStocks.map((stock) => ({
          code: stock.code,
          stockName: stock.stockName,
          price: stock.price,
        }))
      );

      setChatHistory((prev) => [
        ...prev,
        generateChatHistMessage(
          "topStock",
          "Please select a stock.",
          true,
          true,
          {
            optionType: "topStock",
            options: filtredStockData.topStocks.map((stock) => ({
              code: stock.code,
              stockName: stock.stockName,
              price: stock.price,
            })),
          }
        ),
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        generateChatHistMessage(
          "error",
          "Oops! An error occurred. Please try again later!",
          true,
          true
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopStockSelect = (stock) => {
    setChatHistory((prev) => [
      ...prev,
      generateChatHistMessage("user", stock.stockName, false),
    ]);

    setIsLoading(true);
    try {
      setChatHistory((prev) => [
        ...prev,
        generateChatHistMessage(
          "menu",
          `Stock Price of ${stock.stockName} is ${stock.price}. Please select an option.`,
          true,
          true,
          {
            optionType: "menu",
            options: [
              {
                id: "back",
                text: "Go Back",
              },
              {
                id: "main",
                text: "Main menu",
              },
            ],
          }
        ),
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        generateChatHistMessage(
          "error",
          "Oops! An error occurred. Please try again later!",
          true,
          true
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToMainMenu = () => {
    setCurrentStocks(null);

    setChatHistory((prev) => [
      ...prev,
      generateChatHistMessage("user", "Main menu", false),
      generateChatHistMessage(
        "stock",
        "Please select a Stock Exchange.",
        true,
        true,
        {
          optionType: "stock",
          options: stockData.map((stock) => ({
            code: stock.code,
            stockName: stock.stockExchange,
          })),
        }
      ),
    ]);
  };

  const handleBackToStocks = () => {
    setChatHistory((prev) => [
      ...prev,
      generateChatHistMessage("user", "Go Back", false),
      generateChatHistMessage(
        "topStock",
        "Please select a stock.",
        true,
        true,
        {
          optionType: "topStock",
          options: currentStocks,
        }
      ),
    ]);
  };

  const handleOptionSelect = (optionType) => {
    switch (optionType) {
      case "stock":
        return handleStockExchangeSelect;
      case "topStock":
        return handleTopStockSelect;
      default:
        break;
    }
  };

  return (
    <VStack
      height="100%"
      p={4}
      alignItems="stretch"
      spacing={3}
      overflowY="auto"
      bg="white"
    >
      {chatHistory.map((chat, index) => {
        return (
          <Box
            display="flex"
            gap={1}
            key={index}
            alignSelf={chat.isBot ? "flex-start" : "flex-end"}
          >
            {chat.isBot && (
              <Box width="20px" height="20px" alignSelf="end">
                {chat.displayIcon && <FaRobot color="#3b82f6" />}
              </Box>
            )}

            {chat.name === "loading" ? (
              <ChatMessage
                id={chat.id}
                message={chat.message}
                isBot={chat.isBot}
                isLoading={true}
              />
            ) : (
              <ChatMessage
                id={chat.id}
                message={chat.message}
                isBot={chat.isBot}
              >
                {chat?.option?.options && (
                  <ChatOptions
                    chatOption={chat.option}
                    handleOptionSelect={handleOptionSelect(
                      chat.option.optionType
                    )}
                    handleBackToMainMenu={handleBackToMainMenu}
                    handleBackToStocks={handleBackToStocks}
                    optionsDisabled={
                      chatHistory[chatHistory.length - 1].id !== chat.id
                    }
                  />
                )}
              </ChatMessage>
            )}

            {!chat.isBot && (
              <Box width="20px" height="20px" alignSelf="end">
                <IoPersonCircleOutline color="#3f3f46" />
              </Box>
            )}
          </Box>
        );
      })}
      <div ref={dummyRef}></div>
    </VStack>
  );
};

export default ChatHistory;

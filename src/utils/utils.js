export const generateId = () => new Date().getTime().toString();

export const generateChatHistMessage = (
  name,
  message,
  isBot,
  displayIcon,
  option = {}
) => {
  return {
    id: generateId(),
    name: name,
    message,
    isBot,
    displayIcon,
    option,
  };
};

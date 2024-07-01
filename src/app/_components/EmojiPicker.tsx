import Picker from "emoji-picker-react";

const EmojiPicker = ({ content, setContent }) => {
  const onEmojiButton = (event, emojiObject) => {
    const newText = content + event.emoji;
    setContent(newText);
  };

  return <Picker onEmojiClick={onEmojiButton} />;
};

export default EmojiPicker;

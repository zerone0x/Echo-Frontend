import Picker from "emoji-picker-react";

const EmojiPicker = ({
  content,
  setContent,
}: {
  content: string;
  setContent: any;
}) => {
  const onEmojiButton = (event: any, emojiObject: any) => {
    const newText = content + event.emoji;
    setContent(newText);
  };

  return <Picker onEmojiClick={onEmojiButton} />;
};

export default EmojiPicker;

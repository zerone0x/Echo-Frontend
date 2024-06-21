"use client";
import React from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TwitterPostEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // 可以在这里配置或禁用某些功能，例如禁用标题功能
        heading: false,
      }),
    ],
    content: "",
  });

  // 发布帖子的函数
  const publishPost = () => {
    if (editor) {
      console.log(editor.getHTML()); // 或者 editor.getText() 根据你需要发布的内容类型
      // 这里可以添加将内容发送到服务器的代码
    }
  };

  return (
    <div>
      <EditorContent editor={editor} />
      <button>Publish</button>
    </div>
  );
};

export default TwitterPostEditor;

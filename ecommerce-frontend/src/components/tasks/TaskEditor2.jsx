import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  sendMessage,
  fetchMessageByTaskId,
} from "../../redux/actions/taskAction";
import { useSelector, useDispatch } from "react-redux";
import sendIcon from "../../assets/icons/send.svg";
import attatchIcon from "../../assets/icons/attatch-icon.svg";
import emojiIcon from "../../assets/icons/emoji.svg";
import binIcon from "../../assets/icons/Bin.svg";
import { Tooltip } from "antd";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";

import "../../styles/TaskEditor.css";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import Messages from "./Messages";

const TaskEditor2 = (props) => {
  const users = [
    { id: "1", label: "Alice" },
    { id: "2", label: "Bob" },
    { id: "3", label: "Charlie" },
    { id: "4", label: "David" },
    { id: "5", label: "Emily" },
  ];

  // Tip Tap Editor start
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      // Heading.configure({ levels: [1, 2, 3] }),
      Placeholder.configure({
        placeholder: "Start writing...",
        emptyEditorClass: "is-empty",
      }),
      // Emoji,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: {
          items: ({ query }) => {
            const users = [
              { id: "1", label: "Alice" },
              { id: "2", label: "Bob" },
              { id: "3", label: "Charlie" },
            ];
            return users.filter((user) =>
              user.label.toLowerCase().startsWith(query.toLowerCase())
            );
          },
        },
      }),
    ],
    content: "", // Empty content so placeholder is visible
  });

  // get messages
  const messageContent = editor.getHTML();

  // Disable the send button if the content is empty
  const isContentEmpty = editor ? editor.isEmpty : true;

  const setEditorContent = (newContent) => {
    if (editor) {
      editor.commands.setContent(newContent); // Correct method to set content
    }
  };
  // Tip Tap Editor end

  return (
    <div>
      {/* Toolbar Buttons */}
      <div className="tipTapToolbar p-2">
        <button
          className="tipTapToolbarIcon"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldOutlined />
        </button>
        <button
          className="tipTapToolbarIcon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicOutlined />
        </button>
        <button
          className="tipTapToolbarIcon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineOutlined />
        </button>
        <button
          className="tipTapToolbarIcon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughOutlined />
        </button>
        <button
          className="tipTapToolbarIcon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          className="tipTapToolbarIcon"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoOutlined />
        </button>
        <button
          className="tipTapToolbarIcon"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoOutlined />
        </button>
      </div>

      <div
        className="mt-2 relative"
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          padding: "10px",
          // minHeight: "200px",
          minHeight: "auto",
        }}
      >
        <EditorContent editor={editor} className="w-[86%]" />

        <div className="flex items-end pointer invisible">Send</div>
        <Messages
          editor={editor}
          taskID={props.taskID}
          messageContent={messageContent}
          isContentEmpty={isContentEmpty}
          clear={setEditorContent}
        />
      </div>
    </div>
  );
};

export default TaskEditor2;

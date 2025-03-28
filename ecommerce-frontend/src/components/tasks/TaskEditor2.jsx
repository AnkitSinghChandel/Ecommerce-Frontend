import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
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

import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();
  const params = useParams();
  const userID = localStorage.getItem("userid");

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

  const [attachmentData, setAttachmentData] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (props.isContentEmpty) {
      return false;
    }
    dispatch(sendMessage(userID, " ", props.taskID, messageContent));
    setEditorContent(""); // to clear setEditorContent in Editor screen.
    props.clear(""); // to clear setEditorContent in Editor screen.
  };

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
        className="flex gap-2 mt-2 relative"
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          padding: "10px",
          // minHeight: "200px",
          minHeight: "auto",
        }}
      >
        <EditorContent editor={editor} className="w-[86%]" />

        {/* attatchment, emoji, send buttons div start */}
        <div className="flex gap-2 items-baseline self-end pointer">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = Array.from(e.dataTransfer.files);
              if (droppedFile.length > 0) {
                console.log("drop imgs", droppedFile);
                setAttachmentData(droppedFile);
              }
            }}
          >
            <label className="pointer">
              <img src={attatchIcon} alt="" width={12} />
              <input
                type="file"
                multiple
                // accept="image/*"
                // accept=".doc,.docx,.pdf,.xls,.xlsx,.xml,"
                // ref={hidden_Input_File}
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log("fileList", e.target.files);
                  // setAttachmentData(e.target.files[0]); // single file upload.
                  const selectedFiles = Array.from(e.target.files);
                  setAttachmentData(selectedFiles);
                }}
              />
            </label>
          </div>

          <div className="relative">
            <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <img src={emojiIcon} alt="" className="" width={20} />
            </div>
            {showEmojiPicker && (
              <EmojiPicker
                emojiStyle={EmojiStyle.GOOGLE} // Apple-style emojis
                className="absolute top-[30px] right-[-45px] z-1"
                onEmojiClick={(e) => {
                  if (!editor) return;
                  editor.chain().focus().insertContent(e.emoji).run();
                }}
              />
            )}
          </div>

          <div>
            <button
              className="pointer"
              disabled={props.messageContent === "" && !attachmentData}
              onClick={() => {
                handleSendMessage();
                setEditorContent();
              }}
            >
              <img src={sendIcon} alt="" width={25} />
            </button>
          </div>
        </div>
        {/* attatchment, emoji, send buttons div end */}
      </div>

      <Messages
        editor={editor}
        taskID={props.taskID}
        messageContent={messageContent}
        isContentEmpty={isContentEmpty}
        clear={setEditorContent}
      />
    </div>
  );
};

export default TaskEditor2;

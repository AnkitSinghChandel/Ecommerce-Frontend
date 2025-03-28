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
import "../../styles/TaskEditor.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";

import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";

import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import Linkify from "linkify-react";
import parse from "html-react-parser";
import moment from "moment";

const TaskEditor = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [Ankit] = useAutoAnimate();

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

  const [messageData, setMessageData] = useState([]);
  const [attachmentData, setAttachmentData] = useState([]);
  const [showMoreComm, setShowMoreComm] = useState(false);
  let displayQuantity = showMoreComm ? undefined : 5;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addTaskMessageRes = useSelector(
    (state) => state.task.addTaskMessageRes
  );

  const fetchMessageByTaskIdRes = useSelector(
    (state) => state.task.fetchMessageByTaskIdRes
  );

  useEffect(() => {
    dispatch(fetchMessageByTaskId(props.taskID));
  }, [dispatch, props.taskID, addTaskMessageRes]);

  useEffect(() => {
    if (fetchMessageByTaskIdRes.status === true) {
      setMessageData(fetchMessageByTaskIdRes.data);
    }
  }, [fetchMessageByTaskIdRes]);

  const handleSendMessage = () => {
    if (editor.isEmpty === "") {
      return false;
    }
    dispatch(sendMessage(userID, " ", props.taskID, messageContent));
  };

  const linkifyOptions = {
    attributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  };

  const formatFileSize = (size) => {
    return size >= 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  return (
    <>
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
          className="flex gap-3 mt-2 relative"
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "10px",
            // minHeight: "200px",
            minHeight: "auto",
          }}
        >
          <EditorContent editor={editor} className="w-[90%]" />

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
                disabled={messageContent === "" && !attachmentData}
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
      </div>

      {/* comments section start */}
      <div ref={Ankit}>
        {attachmentData?.map((item, index) => {
          return (
            <ul className="ps-3 pt-2" key={index}>
              {item.name} ({formatFileSize(item.size)})
            </ul>
          );
        })}

        {/* <p>{attachmentData.name}</p> */}

        <div className="flex justify-between pt-3 px-2">
          <p>Comments</p>

          {messageData && messageData.length > 4 && (
            <p
              className="pointer"
              onClick={() => {
                setShowMoreComm(!showMoreComm);
              }}
            >
              {showMoreComm ? " Show less..." : "Show more..."}
            </p>
          )}
        </div>

        {messageData.slice(0, displayQuantity).map((item, index) => {
          return (
            <div key={index}>
              {/* <div
                className="commentsDiv my-3"
                dangerouslySetInnerHTML={{ __html: item.message }}
              /> */}

              <div className="commentsDiv my-3">
                {/* <Linkify options={linkifyOptions}>
                  {parse(item.message)}
                </Linkify> */}

                {item.isdeleted ? (
                  <span>This message was deleted</span>
                ) : (
                  <Linkify
                    options={{
                      attributes: {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    }}
                  >
                    {parse(item.message)}
                  </Linkify>
                )}

                <div className="flex gap-2">
                  <Tooltip title="Delete Msg" color={"red"}>
                    <img
                      src={binIcon}
                      alt=""
                      className="ms-auto w-[12px] pointer"
                      onClick={() => {
                        // asc
                      }}
                    />
                  </Tooltip>
                  <p className="mb-0 text-[14px]">
                    {moment(item.createdAt).format("DD.MM.YYYY,h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* comments section end */}
    </>
  );
};

export default TaskEditor;

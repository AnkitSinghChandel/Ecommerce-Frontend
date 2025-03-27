import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  sendMessage,
  fetchMessageByTaskId,
} from "../../redux/actions/taskAction";
import { useSelector, useDispatch } from "react-redux";
import sendIcon from "../../assets/icons/black-send.svg";
import attatchIcon from "../../assets/icons/attatch-icon.svg";
import emojiIcon from "../../assets/icons/emoji.svg";
import binIcon from "../../assets/icons/Bin.svg";
import { Tooltip } from "antd";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import "../../styles/TaskEditor.css";

import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

import Linkify from "linkify-react";
// import "linkifyjs/plugins/mention";
// import parse from "react-html-parser";
import parse from "html-react-parser";
import moment from "moment";

const TaskEditor = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();
  const userID = localStorage.getItem("userid");

  const [editorContent, setEditorContent] = useState("");
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
    if (editorContent === "") {
      return false;
    }
    dispatch(sendMessage(userID, " ", props.taskID, editorContent));
  };

  const linkifyOptions = {
    attributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  };

  const quillRef = useRef(null);

  const formatFileSize = (size) => {
    return size >= 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  return (
    <>
      <div
        className="flex gap-3"
        style={{ border: "1px solid #00246a", borderRadius: "10px" }}
      >
        <div className="">
          <ReactQuill
            ref={quillRef}
            placeholder="Start writing here..."
            id="task_editor"
            className="taskEditor"
            value={editorContent}
            onChange={setEditorContent}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
              ],
              // mention: {
              //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
              //   mentionDenotationChars: ["@"],
              //   source: function (searchTerm, renderList) {
              //     const people = ["Alice", "Bob", "Charlie"];
              //     const matches = people.filter((person) =>
              //       person.toLowerCase().includes(searchTerm.toLowerCase())
              //     );
              //     renderList(matches);
              //   },
              // },
            }}
            readOnly={false} // Editable
          />
        </div>

        <div
          className="flex gap-2 pointer"
          style={{
            right: "5px",
            bottom: "10px",
            alignItems: "center",
            alignSelf: "end",
          }}
        >
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
            <label>
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
                style={{
                  position: "absolute",
                  top: "30px",
                  right: "-45px",
                  zIndex: "1",
                }}
                // onEmojiClick={(e) => {
                //   setEditorContent(editorContent + e.emoji);
                //   console.log("asc emoji", e.emoji);
                // }}
                onEmojiClick={({ emoji }) => {
                  const quill = quillRef?.current?.getEditor?.();
                  if (!quill) return;

                  const pos = quill.getSelection()?.index ?? 0;
                  quill.insertText(pos, emoji);
                  quill.setSelection(pos + emoji.length);
                }}
              />
            )}
          </div>

          <div>
            <button
              className="border-0 bg-transparent"
              disabled={editorContent.trim() === "" && !attachmentData}
              onClick={() => {
                if (editorContent.trim() === "" && !attachmentData)
                  return false;
                handleSendMessage();
                setEditorContent("");
              }}
            >
              <img src={sendIcon} alt="" width={25} />
            </button>
          </div>
        </div>
      </div>

      {/* comments */}
      <div ref={Ankit}>
        {attachmentData?.map((item, index) => {
          return (
            <li className="ps-3 pt-2" key={index}>
              {item.name} ({formatFileSize(item.size)})
            </li>
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
                      className="ms-auto pointer"
                      onClick={() => {
                        // jj
                      }}
                    />
                  </Tooltip>
                  <p className="mb-0">
                    {moment(item.createdAt).format("DD.MM.YYYY,h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TaskEditor;

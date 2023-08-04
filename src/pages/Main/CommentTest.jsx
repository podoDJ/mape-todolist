import React, { useState } from "react";

const CommentTest = () => {
  const [comment, setComment] = useState([
    {
      id: "1",
      comment: "좋다1.",
    },
    {
      id: "2",
      comment: "좋다2.",
    },
  ]);
  const [updateCommentId, setUpdateCommentId] = useState("");

  //만약 comment 변수를 배열로 유지하면서 수정이 필요한 경우, setComment 함수를 사용하여 배열을 업데이트해야 합니다. 
  //예를 들어, 입력창에서 변경한 값을 setComment로 배열에 업데이트할 수 있습니다. 이렇게 하면 comment가 항상 배열로 유지될 것입니다.
  const handleCommentChange = (event, id) => {
    const updatedComment = comment.map((item) => item.id === id ? {...item, comment: event.target.value} : item)
    setComment(updatedComment)
  }
  return (
    <>
      {comment?.map((item) => (
        <div key = {item.id}>
          {updateCommentId === item.id ? (
            <>
              <input value={item.comment} type="text" onChange={(event) => handleCommentChange(event, item.id)} />
            </>
          ) : (
            <p>{item.comment}</p>
          )}
          <button
            onClick={() => {
              setUpdateCommentId(item.id);
            }}
          >
            수정
          </button>
        </div>
      ))}
    </>
  );
};

export default CommentTest;

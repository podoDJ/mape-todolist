import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addComments, getComments, updateComments } from "../../api/comments";
const CommentTest = () => {
  const [input, setInput] = useState("")
  const [comment, setComment] = useState([])
  const [updateCommentId, setUpdateCommentId] = useState("");
  const queryClient = useQueryClient();
  const mutationPost = useMutation(addComments, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      console.log("신규 댓글 입력 & 데이터 최신화 성공!!");
    },
    onError: () => {
      alert("코멘트 post 에러")
      return false
    }
  });

  const mutationUpdate = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments")
      console.log("코멘트 변경 성공")
    },
    onError: () => {
      alert("코멘트 변경 에러")
      return false
    }
  })

  const { isLoading, isError, data } = useQuery("comments", getComments)
  useEffect(() => {
    if(data) {
      setComment(data)
    }
  }, [data])
  if (isLoading) {
    return <h1>로딩중입니다. 잠시만 기다려주세요!!</h1>
  }
  if (isError) {
    return <h1>코멘트 데이터 Get오류 발생</h1>
  }
  const handleCommentInput = async (event) => {
    setInput(event.target.value)
  }
  console.log(data)
  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    const newComment = {
      comment: input
    }
    mutationPost.mutate(newComment)
  }
  //만약 comment 변수를 배열로 유지하면서 수정이 필요한 경우, setComment 함수를 사용하여 배열을 업데이트해야 합니다. 
  //예를 들어, 입력창에서 변경한 값을 setComment로 배열에 업데이트할 수 있습니다. 이렇게 하면 comment가 항상 배열로 유지될 것입니다.
  const handleCommentChange = (event, id) => {
    const updatedComment = event.target.value
      setComment((prevComments) =>
    prevComments.map((item) =>
      item.id === id ? { ...item, comment: updatedComment } : item
    )
  );
    // console.log("updatedComment=>",updatedComment)
    // setCommentChange(updatedComment)
  }
  const handleCommentUpdateSubmit = (id, comment) => {
    mutationUpdate.mutate({ id, comment });
    setUpdateCommentId(""); // 수정 완료 후 수정 상태 해제
  };
  return (
    <>
    <form onSubmit={handleCommentSubmit}>
      <label>댓글 달기</label>
    <input value={input} onChange={handleCommentInput} />
    <button>등록</button>
    </form>
      {comment?.map((item) => (
        <div key = {item.id}>
          {updateCommentId === item.id ? (
            <>
              <input value={item.comment} type="text" onChange={(event) => handleCommentChange(event, item.id)} />
              <button onClick={() => {handleCommentUpdateSubmit(item.id, item.comment)}}>수정완료</button>
            </>
          ) : (
            <>
            <span>{item.comment}</span>
            <button onClick={() => {setUpdateCommentId(item.id)}}>수정</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default CommentTest;

import { useEffect, useState } from "react"
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";




export const Comments = ({ commentsUrl, currentUserId }) => {

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null)

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = commentId => {
    return backendComments
      .filter(backendComment => backendComment.parentId == commentId)
      .sort((a, b) => (- new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime()))
  }

  const addComment = async (text, parentId)=>{
    console.log({ text, parentId})
    try {
      const response = await fetch(commentsUrl, {
        method : "POST",
        body : JSON.stringify(
          {
            body : text,
            username : "Vijendra",
            userId : currentUserId,
            parentId : parentId ? parentId : null,
            createdAt : new Date()
        }
        ),
        headers : {
          'content-type' : "application/json"
        }
      })
      const data = await response.json()
      getCommentsApi()
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getCommentsApi()
  }, [])
  async function getCommentsApi() {
    try {
      const response = await fetch(commentsUrl)
      const comments = await response.json()
      setBackendComments(comments)
    } catch (error) {
      console.log({ message: error.message })
    }
  }
  async function deleteComment(id){
    try {
      const response = await fetch(commentsUrl+`/${id}`,{
        method : "DELETE"
      })
      const comments = await response.json()
      getCommentsApi()
    } catch (error) {
      console.log({ message: error.message })
    }
  }
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write Comment</div>
      <CommentForm submitLabel={"Write"} handleSubmit={addComment} parentId={null}/>
      <div className="comments-container">
        {
          rootComments.map(rootComment => (
            <Comment
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              handleSubmit={addComment}
              // getReplies={getReplies}
            />
          ))
        }
      </div>

    </div>
  );
}


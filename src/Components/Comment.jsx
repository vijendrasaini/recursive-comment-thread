import { CommentForm } from "./CommentForm"




export const Comment = (
    {
        comment,
        replies,
        currentUserId,
        deleteComment,
        activeComment,
        setActiveComment,
        handleSubmit,
        getReplies
    })=>{

    const canReply = Boolean(currentUserId)
    const canEdit = currentUserId == comment.userId
    const canDelet = currentUserId == comment.userId 
    const createdAt = new Date(comment.createdAt).toLocaleDateString()

    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src="https://via.placeholder.com/45" alt="" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>
                <div className="commet-text">{comment.body}</div>
                <div className="comment-actions">
                    {canReply && <div className="comment-action" onClick={()=>{
                        setActiveComment({ type : 'replying', id : comment.id})
                    }}>Reply</div>}
                    {canEdit && <div className="comment-action">Edit</div>}
                    {canDelet && <div className="comment-action" onClick={()=> deleteComment(comment.id)}>Delet</div>}
                </div>
                {
                    comment.id == activeComment?.id && 
                    <CommentForm
                        submitLabel="Reply"
                        handleSubmit={handleSubmit}
                        setActiveComment={setActiveComment}
                        parentId={comment.id}
                    />
                }
                {replies.length > 0 && (
                    <div className="replies">
                        {
                            replies.map(reply=>(
                                <Comment 
                                key={reply.id}
                                comment={reply} 
                                replies={[]}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                handleSubmit={handleSubmit}
                                // getReplies={getReplies}
                            />
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}
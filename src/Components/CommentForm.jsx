import { useState } from "react"




export const CommentForm = (
        {
            handleSubmit, 
            submitLabel,
            parentId,
            setActiveComment = null
        }
    )=>{

    const [text, setText] = useState("")
    const onSubmit = event =>{
        event.preventDefault()
        handleSubmit(text,parentId)
        setText("")
        if(setActiveComment)
            setActiveComment(null)
        console.log({ parentId})
    }

    return (
        <form action="" onSubmit={onSubmit}>
            <textarea 
                className="comment-form-textarea"
                value={text}
                onChange={(e)=> setText(e.target.value)}
            >
            </textarea>
                <button 
                    className="comment-form-button"
                    disabled={text.length === 0}
                >
                    {submitLabel}
                </button>
        </form>
    )
}
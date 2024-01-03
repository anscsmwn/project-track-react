import React, { useState } from 'react'
import { getFullName } from '../utils/utils'
import { createCommentTask } from '../services/KanbanBoard'

const CommentSection = ({ taskId, comments: commentsData }) => {
  const [comments, setComments] = useState([...commentsData])
  const [newComment, setNewComment] = useState('')

  const postComment = async () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        author: getFullName(),
        timestamp: new Date().toLocaleString(),
        content: newComment,
      }
      setComments([...comments, newCommentObj])
      await createCommentTask({
        content: newComment,
        author: getFullName(),
        task_id: taskId,
        timestamp: new Date().toLocaleString(),
      })
      setNewComment('')
    }
  }

  const deleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId))
  }

  // Functionality for editing comments would require additional logic
  // Here is just the rendering part for the existing comments
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-sm">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
          style={{ minHeight: '50px' }}
        />
        <button className="font-semibold" onClick={postComment}>
          Post
        </button>
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{comment.author}</div>
            <div className="opacity-55 text-xs">{comment.timestamp}</div>
          </div>
          <div className="content">{comment.content}</div>
        </div>
      ))}
    </div>
  )
}

export default CommentSection

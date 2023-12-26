import React, { useState } from 'react'

const CommentSection = () => {
  const [comments, setComments] = useState([
    // Pre-populate with example comment
    {
      id: 1,
      author: 'Annas Casmawan Ahmad',
      timestamp: 'Oct 31 at 1:39 PM',
      content:
        'Tabe pak, boleh saya meminta kredensial akses ke environment developmentnya Neosia? untuk melihat apa yang dapat saya kembangkan di sana. Terima kasih @aisprayogi1',
      editable: false, // set to true for comments that can be edited by the user
    },
  ])
  const [newComment, setNewComment] = useState('')

  const postComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        id: Date.now(),
        author: 'Current User', // Replace with current user's name
        timestamp: new Date().toLocaleString(),
        content: newComment,
        editable: true,
      }
      setComments([...comments, newCommentObj])
      setNewComment('')
    }
  }

  const deleteComment = (commentId: number) => {
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
          {comment.editable && (
            <div className="actions">
              <button onClick={() => {}}>Edit</button>
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CommentSection

import React, { useState } from 'react'
import AttachmentItem from './AttachmentItem' // This is your modified component for attachments
const AttachmentsList = () => {
  const [attachments, setAttachments] = useState([
    { id: 1, url: 'https://example.com/react_guide.pdf' },
    { id: 2, url: 'https://example.com/typescript_cheatsheet.pdf' },
    // More attachments...
  ])
  const [newAttachmentUrl, setNewAttachmentUrl] = useState('')
  const [isAddingAttachment, setIsAddingAttachment] = useState(false)

  const addAttachment = () => {
    if (newAttachmentUrl.trim() !== '') {
      const newAttachment = {
        id: Date.now(),
        url: newAttachmentUrl,
      }
      setAttachments([...attachments, newAttachment])
      setNewAttachmentUrl('')
    }
  }

  const deleteAttachment = (attachmentId) => {
    setAttachments(
      attachments.filter((attachment) => attachment.id !== attachmentId),
    )
  }

  return (
    <div>
      <div className="flex gap-2 items-center text-xl pl-2">
        <h2 className="font-semibold">Attachments</h2>
      </div>
      <ul>
        {attachments.map((attachment) => (
          <AttachmentItem
            key={attachment.id}
            attachment={attachment}
            deleteAttachment={deleteAttachment}
          />
        ))}
      </ul>
      {isAddingAttachment ? (
        <div className="p-2">
          <input
            type="url"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newAttachmentUrl}
            onChange={(e) => setNewAttachmentUrl(e.target.value)}
            placeholder="Enter attachment URL"
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              className="px-3 py-2 bg-black text-white rounded-md hover:bg-opacity-65"
              onClick={() => {
                addAttachment()
                setIsAddingAttachment(false)
              }}
            >
              Add
            </button>
            <button
              className="px-3 py-2 text-black rounded-md hover:bg-gray-100"
              onClick={() => setIsAddingAttachment(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="px-3 py-2 bg-black text-white rounded-md hover:bg-opacity-65 text-xs mt-2"
          onClick={() => setIsAddingAttachment(true)}
        >
          Add an attachment
        </button>
      )}
    </div>
  )
}

export default AttachmentsList

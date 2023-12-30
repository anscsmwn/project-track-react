import React from 'react'

const AttachmentItem = ({ attachment, deleteAttachment }) => {
  return (
    <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
      <a
        href={attachment.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {attachment.url}
      </a>
      <button
        onClick={() => deleteAttachment(attachment.id)}
        className="text-gray-400 hover:text-gray-600"
      ></button>
    </li>
  )
}

export default AttachmentItem

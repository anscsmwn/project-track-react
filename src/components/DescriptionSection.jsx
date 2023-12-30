import React, { useState } from 'react'

const DescriptionSection = ({ task }) => {
  const [isEditable, setIsEditable] = useState(false)
  const [description, setDescription] = useState(task.description)

  const handleOnClick = () => {
    setIsEditable(true)
  }

  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  const handleBlur = () => {
    setIsEditable(false)
    // Here you can also call a function to update the task description in your state or backend
  }

  return (
    <div className="pl-2">
      <div className="flex gap-2 items-center text-xl">
        <h2 className="font-semibold">Description</h2>
      </div>
      {isEditable ? (
        <div>
          <textarea
            className="text-sm w-full rounded-md group p-2 min-h-40"
            value={description}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
          <div>
            <button
              className="px-3 py-2 bg-black text-white rounded-md hover:bg-opacity-65"
              onClick={handleBlur}
            >
              Save
            </button>
            <button
              className="px-3 py-2 text-black rounded-md hover:bg-gray-100"
              onClick={() => {
                setDescription(task.description)
                setIsEditable(false)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          className="text-sm w-full hover:bg-gray-100 rounded-md group p-2 cursor-pointer"
          onClick={handleOnClick}
        >
          {description}
        </div>
      )}
    </div>
  )
}

export default DescriptionSection

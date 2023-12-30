import React from 'react'
import CommentSection from '../CommentSection'
import AttachmentsList from '../AttachmentsList'
import ProblemSection from '../ProblemSection'
import TodoListSection from '../TodoListSection'
import checkIcon from '../../assets/check.svg'
import dotIcon from '../../assets/dot.svg'

const KanbanCardModal = ({
  task,
  isModalOpen,
  setIsModalOpen,
  handleStatusChange,
}) => {
  if (!isModalOpen) return null
  const [isStatusChanging, setIsStatusChanging] = React.useState(false)
  return (
    <div
      onClick={(e) => {
        setIsModalOpen(false)
      }}
      className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 pl-3 rounded-md w-1/2 h-[600px] overflow-auto"
      >
        <div className="flex gap-2 items-center text-3xl">
          <h3 className="font-semibold">{task.title}</h3>
        </div>
        <div className="text-sm mt-2">
          <div className="py-1 flex gap-5 items-center">
            <div className="text-gray-400 flex items-center gap-2 w-1/3 pl-2">
              <p>Status</p>
            </div>
            <div>
              <p
                onClick={() => {
                  setIsStatusChanging(true)
                }}
                className="bg-gray-300 px-1 pr-3 py-1 rounded-full flex justify-between items-center hover:opacity-95 cursor-pointer transition-all max-w-[200px]"
              >
                <div className="flex gap-1 items-center">
                  <img src={dotIcon} alt="dot" className="w-4 h-4 opacity-40" />
                  {task.status}
                </div>
                {isStatusChanging && (
                  <img
                    src={checkIcon}
                    alt="check"
                    className="ml-2 w-3 h-3 opacity-50"
                  />
                )}
              </p>
              <div className="">
                {isStatusChanging && (
                  <div className="space-y-1 my-1 bg-white w-full">
                    {['To Do', 'In Progress', 'Done']
                      .filter((status) => status !== task.status)
                      .map((status) => (
                        <button
                          onClick={() => {
                            handleStatusChange(status, task.id)
                            setIsStatusChanging(false)
                          }}
                          className="bg-gray-300 pl-1 pr-3 py-1 max-w-[200px] rounded-full flex gap-1 items-center hover:opacity-95 cursor-pointer transition-all"
                        >
                          <img
                            src={dotIcon}
                            alt="dot"
                            className="w-4 h-4 opacity-40"
                          />
                          {status}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="py-1 flex gap-5 items-center w-full">
            <div className="text-gray-400 flex items-center gap-2 w-1/3 pl-2">
              <p>Due Date</p>
            </div>
            <p>December 25, 2023 1:43 PM</p>
          </div>
          <div className="py-1 flex gap-5 items-center w-full">
            <div className="text-gray-400 flex items-center gap-2 w-1/3 pl-2">
              <p>Assign</p>
            </div>
            <p>Annas Casmawan Ahmad</p>
          </div>
        </div>
        <div className="text-sm space-y-2">
          <div className="pl-2">
            <div className="flex gap-2 items-center text-xl">
              <h2 className="font-semibold">Description</h2>
            </div>
            <p className="text-sm max-w-xl">{task.description}</p>
          </div>
          <TodoListSection />
          <ProblemSection />
          <AttachmentsList />
          <div>
            <hr className="my-5 border-b border-solid border-gray-200" />
            <CommentSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanCardModal

import React from 'react'
import CommentSection from '../CommentSection'
import AttachmentsList from '../AttachmentsList'
import ProblemSection from '../ProblemSection'
import TodoListSection from '../TodoListSection'
import checkIcon from '../../assets/check.svg'
import dotIcon from '../../assets/dot.svg'
import DescriptionSection from '../DescriptionSection'
import closeIcon from '../../assets/close.svg'
import { getDetailTask } from '../../services/KanbanBoard'
import bookmarkIcon from '../../assets/bookmark.svg'
import problemIcon from '../../assets/problem.svg'
import todoIcon from '../../assets/todo.svg'
import attachmentIcon from '../../assets/attachment.svg'
import descriptionIcon from '../../assets/description.svg'

const KanbanCardModal = ({ task, setIsModalOpen, handleStatusChange }) => {
  const [isStatusChanging, setIsStatusChanging] = React.useState(false)
  const [activeField, setActiveField] = React.useState({
    description: false,
    todo: false,
    problems: false,
    attachments: false,
  })
  const [detailTask, setDetailTask] = React.useState({
    comments: [],
    attachments: [],
    description: '',
    problems: [],
    todos: [],
    title: '',
    status: '',
  })
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    const getTaskDetail = async () => {
      setIsLoading(true)
      const response = await getDetailTask(task.id)
      setDetailTask(response[0])
      setIsLoading(false)
    }
    getTaskDetail()
  }, [task])
  if (isLoading)
    return (
      <div className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50 flex items-center justify-center"></div>
    )
  return (
    <div
      onClick={(e) => {
        setIsModalOpen(false)
      }}
      className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 pl-3 rounded-md lg:w-1/2 md:w-9/12 w-full mx-2 h-[500px] sm:h-[600px] overflow-auto"
      >
        <div>
          <div className="flex gap-2 items-center justify-between text-3xl">
            <div className="flex items-center gap-1">
              <img src={bookmarkIcon} alt="bookmark" className="w-6 h-6" />
              <h3 className="font-semibold text-2xl">{detailTask.title}</h3>
            </div>
            <button onClick={() => setIsModalOpen(false)}>
              <img src={closeIcon} alt="close" className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm mt-2">
            <div className="py-1 flex gap-5 items-center">
              <div className="text-gray-400 flex items-center gap-2 w-1/3 pl-2">
                <p>Status</p>
              </div>
              <div>
                <div
                  onClick={() => {
                    setIsStatusChanging(true)
                  }}
                  id='btn-status'
                  className="bg-gray-300 px-1 pr-3 py-1 rounded-full flex justify-between items-center hover:opacity-95 cursor-pointer transition-all max-w-[200px]"
                >
                  <div className="flex gap-1 items-center">
                    <img
                      src={dotIcon}
                      alt="dot"
                      className="w-4 h-4 opacity-40"
                    />
                    {detailTask.status}
                  </div>
                  {isStatusChanging && (
                    <img
                      src={checkIcon}
                      alt="check"
                      className="ml-2 w-3 h-3 opacity-50"
                    />
                  )}
                </div>
                <div className="">
                  {isStatusChanging && (
                    <div className="space-y-1 my-1 bg-white w-full">
                      {['To Do', 'In Progress', 'Done']
                        .filter((status) => status !== task.status)
                        .map((status) => (
                          <button
                          id={`btn-status-${status.toLocaleLowerCase().replace(' ','-')}`}
                            key={status}
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
          </div>
        </div>
        <div className="text-sm space-y-2 flex flex-col md:flex-row gap-10">
          <div className="md:w-4/5">
            {(detailTask.description !== '' ||
              activeField.description === true) && (
              <DescriptionSection task={detailTask} />
            )}
            {(detailTask.todos.length !== 0 || activeField.todo === true) && (
              <TodoListSection taskId={task.id} todos={detailTask.todos} />
            )}
            {(detailTask.problems.length !== 0 ||
              activeField.problems === true) && (
              <ProblemSection taskId={task.id} problems={detailTask.problems} />
            )}
            {(detailTask.attachments.length !== 0 ||
              activeField.attachments === true) && (
              <AttachmentsList
                taskId={task.id}
                attachments={detailTask.attachments}
              />
            )}
            <div>
              <hr className="my-5 border-b border-solid border-gray-200" />
              <CommentSection taskId={task.id} comments={detailTask.comments} />
            </div>
          </div>
          <div className="md:w-1/5 flex flex-col items-start text-xs font-semibold ">
            {(activeField.todo === false ||
              activeField.problems === false ||
              activeField.attachments === false) && (
              <>
                <p className="text-xs mb-2">Add to card</p>
                <div className="space-y-1 w-full">
                  {detailTask.todos.length === 0 &&
                    activeField.todo === false && (
                      <button
                        onClick={() =>
                          setActiveField({ ...activeField, todo: true })
                        }
                        className="px-3 py-2 border border-solid border-slate-100 rounded-md w-full text-start bg-slate-100 transition-all duration-200 flex items-center gap-2"
                      >
                        <img src={todoIcon} alt="todo" className="w-4 h-4" />
                        Todos
                      </button>
                    )}
                  {detailTask.problems.length === 0 &&
                    activeField.problems === false && (
                      <button
                        onClick={() =>
                          setActiveField({ ...activeField, problems: true })
                        }
                        className="px-3 py-2 border border-solid border-slate-100 rounded-md w-full text-start bg-slate-100 transition-all duration-200 flex items-center gap-2"
                      >
                        <img
                          src={problemIcon}
                          alt="problem"
                          className="w-4 h-4"
                        />
                        Problems
                      </button>
                    )}
                  {detailTask.attachments.length === 0 &&
                    activeField.attachments === false && (
                      <button
                        onClick={() =>
                          setActiveField({
                            ...activeField,
                            attachments: true,
                          })
                        }
                        className="px-3 py-2 border border-solid border-slate-100 rounded-md w-full text-start bg-slate-100 transition-all duration-200 flex items-center gap-2"
                      >
                        <img
                          src={attachmentIcon}
                          alt="attachment"
                          className="w-4 h-4"
                        />
                        Attachments
                      </button>
                    )}
                  {detailTask.description === '' &&
                    activeField.description === false && (
                      <button
                        onClick={() =>
                          setActiveField({
                            ...activeField,
                            description: true,
                          })
                        }
                        className="px-3 py-2 border border-solid border-slate-100 rounded-md w-full text-start bg-slate-100 transition-all duration-200 flex items-center gap-2"
                      >
                        <img
                          src={descriptionIcon}
                          alt="description"
                          className="w-4 h-4"
                        />
                        Description
                      </button>
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanCardModal

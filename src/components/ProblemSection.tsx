import React from 'react'
import CheckboxList from './CheckboxList'

const ProblemSection = () => {
  return (
    <div>
      <div className="flex gap-2 items-center text-xl pl-2">
        <h2 className="font-semibold">Problem</h2>
      </div>
      <CheckboxList />
    </div>
  )
}

export default ProblemSection

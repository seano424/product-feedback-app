import { useState } from 'react'
import Bar from '../molecules/Bar'
import Card from '../molecules/Card'
import AddButton from '@/components/atoms/AddButton'

function Suggestions() {
  const [suggestions, setSuggestions] = useState([0])
  return (
    <>
      <div className="xl:my-10 xl:ml-40 xl:w-[50rem]">
        <Bar />

        {suggestions.length ? (
          <>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </>
        ) : (
          <div className="flex flex-col items-center  mt-8 rounded-lg text-center mx-10 sm:mx-auto gap-5 bg-white p-20">
            <img
              className="w-28"
              src="/assets/suggestions/illustration-empty.svg"
              alt=""
            />
            <h2 className="font-bold text-dark-200 tracking-wide pt-4">
              There is no feedback yet.
            </h2>
            <p className=" text-dark-100 pb-4">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
            <AddButton />
          </div>
        )}
      </div>
    </>
  )
}

export default Suggestions

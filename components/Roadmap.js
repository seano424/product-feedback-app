import React from 'react'

function Roadmap() {
  return (
    <div className="flex flex-col justify-center bg-white p-5 rounded-lg xl:h-48 h-48">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold">Roadmap</h4>
        <p className=" underline text-secondary text-sm">View</p>
      </div>
      <div>
        <div className="flex justify-between items-center gap-5">
          <p className="rounded-full h-2 w-2 bg-gradient-2" />
          <p className="flex-1 text-dark-100">Planned</p>
          <p>2</p>
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="rounded-full h-2 w-2 bg-primary" />
          <p className="flex-1 text-dark-100">In-Progress</p>
          <p>3</p>
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="rounded-full h-2 w-2 bg-gradient-1" />
          <p className="flex-1 text-dark-100">Live</p>
          <p>1</p>
        </div>
      </div>
    </div>
  )
}

export default Roadmap

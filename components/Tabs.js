import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import RoadmapCard from './RoadmapCard'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const items = useSelector(selectProductReviews)

  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCategories({
      Planned: [...items.filter((i) => i.status === 'planned')],
      InProgress: [...items.filter((i) => i.status === 'in-progress')],
      Live: [...items.filter((i) => i.status === 'live')],
    })
    setLoading(false)
  }, [items])

  return (
    <div className="w-full lg:hidden mx-auto px-2 py-16 sm:px-0">
      {!loading && (
        <Tab.Group>
          <Tab.List className="flex space-x-1 border-b border-light-200">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-base leading-5 font-bold tracking-wide text-blue-700 ',
                    'focus:outline-none',
                    selected
                      ? `border-b-4 ${
                          category === 'InProgress' && 'border-primary'
                        } ${category === 'Planned' && ' border-gradient-2'}
                      ${category === 'Live' && ' border-gradient-1'}`
                      : 'text-dark-100 hover:bg-white/[0.12] hover:text-dark-200'
                  )
                }
              >
                {category === 'InProgress' ? 'In-Progress' : category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'bg-white rounded-xl p-3',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                )}
              >
                <div className="flex items-center space-x-2 text-2xl font-bold tracking-wide mb-4">
                  <h1 className="capitalize">
                    {posts[0]?.status === 'InProgress'
                      ? 'In-Progress'
                      : posts[0]?.status}
                  </h1>
                  <p>({posts.length})</p>
                </div>
                <ul>
                  {posts.map((post) => (
                    <RoadmapCard key={post.id} post={post} />
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  )
}

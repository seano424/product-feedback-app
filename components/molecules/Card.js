import { ChevronUpIcon } from '@heroicons/react/solid'
import Comment from 'public/assets/shared/icon-comments.svg'
import Link from 'next/link'
function Card(props) {
  const { category, comments, description, id, status, title, upvotes } = props
  return (
    <Link href={`/feedback/${id}`}>
      <a>
        <section className="p-8 my-8 shadow-sm cursor-pointer bg-white flex flex-col sm:flex-row  rounded-lg sm:justify-between gap-4 sm:gap-8 sm:mx-0">
          <article className="hidden sm:flex">
            <div className="flex sm:flex-col">
              <div className="bg-light-200 rounded-xl px-3 py-2 flex flex-col items-center cursor-pointer">
                <ChevronUpIcon className="h-4 text-secondary" />
                <p className="tracking-tighter text-sm xl:text-lg">{upvotes}</p>
              </div>
            </div>
          </article>
          <article className="flex flex-col gap-2 sm:flex-1">
            <h4 className="font-bold text-sm xl:text-lg">{title}</h4>
            <p className="text-xs xl:text-base text-dark-100">{description}</p>
            <p className="text-xs xl:text-base text-secondary  bg-light-200 max-w-max px-3 py-2 rounded-xl font-semibold">
              {category}
            </p>
          </article>
          <article className="hidden sm:flex ">
            <div className="flex items-center gap-2">
              <Comment />
              <p>{comments ? Object.keys(comments).length : 0}</p>
            </div>
          </article>
          <article className="flex sm:hidden justify-between">
            <div className="flex sm:flex-col bg-light-200 sm:h-12 rounded-xl max-w-max px-3 py-2 cursor-pointer">
              <ChevronUpIcon className="h-4 text-secondary" />
              <p className="tracking-tighter text-sm">{upvotes}</p>
            </div>
            <div className="flex items-center gap-2">
              <Comment />
              <p>{comments ? Object.keys(comments).length : 0}</p>
            </div>
          </article>
        </section>
      </a>
    </Link>
  )
}

export default Card

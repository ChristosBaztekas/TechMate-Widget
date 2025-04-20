import propTypes from 'prop-types'

const Query = ({ query }) => {
  return (
    <div className="flex w-full items-end justify-end">
      <p className="w-fit animate-fadeIn rounded-t-rad rounded-l-rad bg-lightColor p-3 text-base font-light">
        {query}
      </p>
    </div>
  )
}

Query.propTypes = {
  query: propTypes.string.isRequired,
}

export default Query
import propTypes from "prop-types";

const Query = ({ query }) => {
  return (
    <div className="w-full justify-end items-end flex">
      <p
        className="w-fit bg-lightColor text-sm text-darkColor font-light p-3 rounded-l-rad rounded-b-rad animate-fadeIn"
      >
        {query}
      </p>
    </div>
  );
};

Query.propTypes = {
  query: propTypes.string.isRequired,
};

export default Query;
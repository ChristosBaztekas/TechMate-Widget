import propTypes from "prop-types";

const Query = ({ query }) => {
  return (
    <div className="w-full justify-end items-end flex">
      <p
        style={{ borderRadius: "10px" }}
        className="w-fit bg-lightColor sm:text-lg text-darkColor font-light p-4 rounded-[20px]"
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

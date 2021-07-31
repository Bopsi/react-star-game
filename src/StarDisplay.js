import utils from "./utils";

const StarDisplay = ({ count }) => {
  return (
    <>
      {utils.range(1, count).map((starId) => (
        <div className="star" key={`star-${starId}`} />
      ))}
    </>
  );
};

export default StarDisplay;

import { useSelector } from "react-redux";
import "./SpotImages.css";

const SpotImages = ({ spotId }) => {
  const spot = useSelector((state) => state.spot.spotDetails[spotId]);

  if (!spot.SpotImages) {
    return <div>Loading images...</div>;
  }

  // console.log("SPOT", spot);

  const firstImage = spot?.SpotImages[0];
  const allLastImages = spot?.SpotImages.slice(1);

  return (
    <div className="spot-images-container">
      <div className="first-image-div">
        <img
          className="first-image"
          src={firstImage.url}
          alt={`Image # ${firstImage.id}`}
        />
      </div>

      <div className="images-grid">
        {allLastImages.map((image) => (
          <div key={image.id} className="spot-image">
            <img
              src={image.url}
              className="single-image-container"
              alt={`Image for Spot Number:${image.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotImages;

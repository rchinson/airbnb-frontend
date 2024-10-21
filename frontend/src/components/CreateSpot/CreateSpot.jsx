import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CreateSpotThunk } from "../../store/spots";
import { addImageThunk } from "../../store/spots";
import "./CreateSpot.css";

export const CreateSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ errors, setErrors ] = useState({});
  const [ hasSubmitted, setHasSubmitted ] = useState(false);

  const [ formData, setFormInfo ] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    description: "",
    name: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });



  const handleChange = (e) => {
    setFormInfo({ ...formData, [e.target.id]: e.target.value });
  };


  
  useEffect(() => {
    const newErrors = {};
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (formData.description < 30)
      newErrors.description = "Description needs 30 or more characters";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.image1) newErrors.image1 = "Preview Image URL is required";
    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const spot = {
      country: formData.country,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      description: formData.description,
      name: formData.name,
      price: formData.price,
    };

    const createNewSpot = await dispatch(CreateSpotThunk(spot, navigate));
    if (createNewSpot) {
      const images = [
        { url: formData.image1, preview: true },
        { url: formData.image2, preview: false },
        { url: formData.image3, preview: false },
        { url: formData.image4, preview: false },
        { url: formData.image5, preview: false },
      ].filter((image) => image.url);

      await Promise.all(
        images.map((image) => dispatch(addImageThunk(createNewSpot.id, image)))
      );

    }
  };


  return (
    <div className="spot-input-container">

      <form className="spot-input-form" action="POST" onSubmit={handleSubmit}>

        <div className="form-prompt">
          <h2>Create a New Spot</h2>
          <h3>Where&apos;s your place located?</h3>
          <p>
            Guests will only get your address once they&apos;ve booked a
            reservation.
          </p>
        </div>


        <div className="country-div">
          <div>Country</div>

          <input
            id="country"
            placeholder="Country"
            type="text"
            value={formData.country}
            onChange={handleChange}
          />
          {hasSubmitted && errors.country && (
            <p className="error">{errors.country}</p>

          )}
        </div>

        <div className="address-div">
          <div>Street Address</div>
          <input
            id="address"
            placeholder="Street Address"
            type="text"
            value={formData.address}
            onChange={handleChange}
          />
          {hasSubmitted && errors.address && (
            <p className="error">{errors.address}</p>
          )}
        </div>

            <div className="city-div">
              <div>City</div>

              <input
                id="city"
                placeholder="City"
                type="text"
                value={formData.city}
                onChange={handleChange}
              />
              {hasSubmitted && errors.city && (
                <p className="error">{errors.city}</p>
              )}
            </div>


            <div className="state-div">
              <div>State</div>
              <input
                id="state"
                placeholder="State"
                type="text"
                value={formData.state}
                onChange={handleChange}
              />
              {hasSubmitted && errors.state && (
                <p className="error">{errors.state}</p>
              )}
            </div>


          
    

        <hr></hr>

        <div className="form-description">

            <h3>Describe your place to guests</h3>
            <p>
              Mention the best features of your space, any special amenitites
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>

          <textarea
            className="form-textarea"
            placeholder="Please write at least 30 characters"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
          {hasSubmitted && errors.description && (
            <p className="error">{errors.description}</p>
          )}
        </div>

        <hr></hr>

        <div className="form-title">

            <h3>Create a title for your spot</h3>
            <p>
              Catch guests&apos; attention with a spot title that highlights what
              makes your place special.
            </p>

          <input
            className="input-title"
            placeholder="Name of your spot"
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          {hasSubmitted && errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>

        <hr></hr>

        <div className="form-price-container">
            
          <div className="form-headers">
            <h3>Set a base price for your spot</h3>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
          </div>

          <div>
            $
            <input
              className="input-price"
              placeholder="Price per night (USD)"
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          {hasSubmitted && errors.price && (
            <p className="error">{errors.price}</p>
          )}
        </div>

        <hr></hr>

        <div className="image-inputs-container">

         
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot</p>
         

          <input
            placeholder="Image URL"
            type="url"
            id="image1"
            value={formData.image1}
            onChange={handleChange}
          />
          {hasSubmitted && errors.image1 && (
            <p className="error">{errors.image1}</p>
          )}
          <input
            placeholder="Image URL"
            type="url"
            id="image2"
            value={formData.image2}
            onChange={handleChange}
          />
          <input
            placeholder="Image URL"
            type="url"
            id="image3"
            value={formData.image3}
            onChange={handleChange}
          />
          <input
            placeholder="Image URL"
            type="url"
            id="image4"
            value={formData.image4}
            onChange={handleChange}
          />
          <input
            placeholder="Image URL"
            type="url"
            id="image5"
            value={formData.image5}
            onChange={handleChange}
          />
        </div>

        <hr></hr>

        <button className="submit-button" type="submit">
          Create Spot
        </button>
      </form>

    </div>

  );
};

export default CreateSpot;

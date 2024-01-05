import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateRatedHandicrafts } from "@/reduxFolder/actions/userActions";
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
function calculateAverageRating(rates) {
  let sum = 0;
  if (rates.length === 0) return 0;
  rates.forEach((rate) => {
    sum += rate.rate;
  });
  return sum / rates.length;
}
function selectRatingValue(handicraft, connectedUser) {
  if (connectedUser && connectedUser.role === "customer") {
    const rate = connectedUser.ratedHandicrafts.find(
      (rating) => rating.handicraftId === handicraft._id
    );
    if (rate) return rate.rate;
    else return calculateAverageRating(handicraft.rates);
  } else {
    return calculateAverageRating(handicraft.rates);
  }
}
export default function HoverRating({ handicraft }) {
  const connectedUser = useSelector((state) => state.user) || {};
  const [hover, setHover] = React.useState(-1);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(
    selectRatingValue(handicraft, connectedUser)
  );
  React.useEffect(() => {
    setValue(selectRatingValue(handicraft, connectedUser));
  }, [connectedUser.ratedHandicrafts]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    try {
      const response = await axios.post(`/api/customers/rate-handicraft/${handicraft._id}`, {
        rating: newValue,
      });
      // dispatch(updateRatedHandicrafts(handicraft._id, newValue));
      dispatch(updateRatedHandicrafts(response.data.data))

    } catch (error) {
      console.log(error);
    }
    /* let url = `/api/customers/rate-handicraft/${handicraft._id}`;
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: newValue }),
    });
    if (response.ok) {
      let res = await response.json();
      console.log(res.data);
      dispatch(updateRatedHandicrafts(res.data));
      setValue(res.data.rate);
    } else {
      console.log("error");
    } */
  };

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        readOnly={connectedUser?.role !== "customer" ? true : false}
        name="hover-feedback"
        value={value}
        // precision={connectedUser?.role !== "customer" ? 0.5 : 1}
        getLabelText={getLabelText}
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import { updateRatedItems } from "@/reduxFolder/actions/userActions";
import { calculateAverageRating } from "@/lib";
import axios from "axios";
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

/* function calculateAverageRating(rates) {
  console.log("rates", rates);
  let sum = 0;
  if (rates.length === 0) return 0;
  rates.forEach((rate) => {
    sum += rate.rate;
  });
  return sum / rates.length;
} */

function selectRatingValue(item, connectedUser) {
  if (connectedUser && connectedUser.role === "customer") {
    const rate = connectedUser.ratedItems.find(
      (rating) => rating.itemId === item._id
    )?.rate;
    if(rate) return rate;
    else return calculateAverageRating(item.rates);
  } else {
    return calculateAverageRating(item.rates);
  }
}

export default function HoverRatingItem({ item }) {
  const connectedUser = useSelector((state) => state.user) || {};

  const [value, setValue] = React.useState(
    selectRatingValue(item, connectedUser)
  );

  const [hover, setHover] = React.useState(-1);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setValue(selectRatingValue(item, connectedUser));
    console.log("useEffect");
  }, [connectedUser.ratedItems]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    try {
      //q use axios
      let url = `/api/customers/rate-item/${item._id}`;
      let response = await axios.post(url, { rating: newValue });
      dispatch(updateRatedItems(response.data.data));
    } catch (error) {
      console.log(error);
    }
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
        precision={connectedUser?.role !== "customer" ? 0.5 : 1}
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

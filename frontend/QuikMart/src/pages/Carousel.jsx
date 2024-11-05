import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";


const ImageCarousel = ({ image, altText = "carousel image" }) => {
  const [showImage, setShowImage] = useState(0);

  const handlePrev = () => {
    setShowImage((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setShowImage(0);
  };

  return (
    <Box sx={{ position: "relative", maxWidth: '80%', mx: "auto" }}>
      {/* Display the single image */}
      <Box
        component="img"
        src={image}
        alt={altText}
        sx={{ width: "100%", borderRadius: 2 }}
      />

      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          px: 1,
          borderRadius: 1,
        }}
      >
        1 / 1
      </Typography>
    </Box>
  );
};

export default ImageCarousel;

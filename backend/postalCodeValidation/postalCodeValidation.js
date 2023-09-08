const axios = require("axios");

const validatePostalCode = async (postalCode, bringApiKey) => {
  try {
    const bringResponse = await axios.get(
      `https://api.bring.com/shippingguide/api/postalCode.json?pnr=${postalCode}`,
      {
        headers: {
          "X-MyBring-API-Uid": bringApiKey,
        },
      }
    );
    return bringResponse.data.valid;
  } catch (error) {
    console.error("Error validating postal code", error);
    return false;
  }
};

module.exports = { validatePostalCode };

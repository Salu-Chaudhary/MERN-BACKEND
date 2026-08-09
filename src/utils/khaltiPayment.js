import axios from "axios";
import config from "../config/config.js";

// const axios = require("axios");
const payViaKhalti = async (data) => {
  const body = {
    return_url: config.appUrl,
    website_url: config.appUrl,
    amount: data.amount * 100,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: {
      name: data.customer.name,
      email: data.customer.email,
    },
  };

  console.log(config.appUrl);

  console.log(config.khalti.apiUrl);
  console.log(config.khalti.secret);

  const response = await axios.post(config.khalti.apiUrl, body, {
    headers: {
      Authorization: `Key ${config.khalti.secret}`,
    },
  });

  console.log(response);
  return response.data;
};

export { payViaKhalti };

import axios from "axios";

const instance = axios.create({
	baseURL: "https://shop-zcj5.onrender.com/api", // Adjust this if necessary
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default instance;

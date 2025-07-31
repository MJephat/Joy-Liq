import axios from "axios";

const instance = axios.create({
	baseURL: "https://double-shasa.onrendr.come/api", // Adjust this if necessary
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default instance;

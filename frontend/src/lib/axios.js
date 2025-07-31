import axios from "axios";

const instance = axios.create({
	baseURL: "/api", // Adjust this if necessary
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default instance;

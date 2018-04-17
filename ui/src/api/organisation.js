import axios from "axios";

const path = "organisations";

export function save(body) {
	if (body.id) {
		return axios.patch(`${path}/${body.id}`, body);
	} else {
		return axios.post(path, body);
	}
}

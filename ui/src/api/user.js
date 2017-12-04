import axios from "axios";

const path = "users";

export function findAll({ page, size, sort } = {}) {
	return axios.get(path, { params: { page, size, sort } });
}

export function findOne(id) {
	return axios.get(`${path}/${id}`);
}

export function save(body) {
	if (body.id) {
		return axios.patch(`${path}/${body.id}`, body);
	} else {
		return axios.post(path, body);
	}
}

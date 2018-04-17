import axios from "axios";

const path = "tasks";

export function findAll({ userId, statusId, page, size, sort } = {}) {
	return axios.get(path, {
		params: { "user.id": userId, statusId, page, size, sort },
	});
}

export function findOne(id) {
	return axios.get(`${path}/${id}`);
}

export function patch(id, body) {
	return axios.patch(`${path}/${id}`, body);
}

export function save(body) {
	if (body.id) {
		return patch(body.id, body);
	} else {
		return axios.post(path, body);
	}
}

export const TaskStatus = {
	TODO: 0,
	IN_PROGRESS: 1,
	DONE: 2,
};

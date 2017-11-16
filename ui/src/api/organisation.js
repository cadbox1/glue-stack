import axios from "axios";
import { signOut } from "./authentication";

const path = "organisations";

export function findAll({ something } = {}) {
	return axios.get(path);
}

export function findOne(id) {
	return axios.get(`${path}/${id}`);
}

export function save(body) {
	if (body.id) {
		return axios.patch(`${path}/${body.id}`, body);
	} else {
		signOut();
		return axios.post(path, body);
	}
}

import { action, observable } from "mobx";
import axios from "axios";

import Task from "./task";

class TaskStore {
	create(collection) {
		return new Task({ store: this, collection });
	}

	load(itemId) {
		return axios.get(`tasks/${itemId}`);
	}

	save(item) {
		if (item.id == null) {
			return axios.post("tasks", item.toJS());
		} else {
			return axios.patch(`tasks/${item.id}`, item.toJS());
		}
	}
}

const taskStore = new TaskStore();

export default taskStore;

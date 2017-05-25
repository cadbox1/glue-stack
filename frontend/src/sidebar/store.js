import { action, observable } from "mobx";

class SidebarStore {
	@observable showSidebar = true;

	@action.bound toggle() {
		this.showSidebar = !this.showSidebar;
	}
}

export default new SidebarStore();

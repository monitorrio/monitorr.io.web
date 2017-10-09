export default class LoaderService {
	constructor() {
		this.isShowing = false;
	}

	show() {
		this.isShowing = true;
	}

	hide() {
		this.isShowing = false;
	}
}

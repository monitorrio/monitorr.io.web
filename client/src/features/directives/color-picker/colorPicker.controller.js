export default class ColorPickerController {

	constructor() {
		this.defaultColors = [
			'#7bd148',
			'#5484ed',
			'#a4bdfc',
			'#46d6db',
			'#7ae7bf',
			'#4C968C',
			'#6A7A83',
			'#f56954',
			'#ff851b',
			'##E35F8F'
		];

		this.colors = this.customColors || this.defaultColors;
		this.options = this.options || {};
		this.options.size = this.options.size || 20;
		this.css = {};
		this.ulCss = {};
		this.css.display = 'inline-block';
		// Set size of squares
		this.css.height = this.css.width = '35px';
		this.selected = this.selected || this.colors[0];
	}

	pick(color) {
		this.selected = color;
	}
}

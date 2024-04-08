class Feedback {
	constructor(title = '', icon = 'none') {
		this.title = title;
		this.icon = icon;
	}
	toast() {
		wx.showToast({
			title: this.title,
			icon: this.icon,
			mask: true,
			duration: 2000
		})
	}
	// 上传本地图片
}
export {
	Feedback
}
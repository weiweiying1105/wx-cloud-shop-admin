"use strict";
const common_vendor = require("../common/vendor.js");
class Feedback {
  constructor(title = "", icon = "none") {
    this.title = title;
    this.icon = icon;
  }
  toast() {
    common_vendor.wx$1.showToast({
      title: this.title,
      icon: this.icon,
      mask: true,
      duration: 2e3
    });
  }
  // 上传本地图片
}
exports.Feedback = Feedback;

"use strict";
const common_vendor = require("../common/vendor.js");
let inIt = function() {
  return new Promise(async (resolve, reject) => {
    var res = new common_vendor.wx$1.cloud.Cloud({
      // 用户端 AppID
      resourceAppid: "wx5067cbe94f579c89",
      // 用户端环境 ID
      resourceEnv: "wwkm-user-6gay7mi163b57adf"
    });
    await res.init();
    await res.callFunction({
      name: "cloudbase_auth",
      data: {}
    });
    resolve(res);
  });
};
exports.inIt = inIt;

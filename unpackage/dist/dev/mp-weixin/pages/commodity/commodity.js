"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_Loading = common_vendor.resolveComponent("Loading");
  _component_Loading();
}
const _sfc_main = {
  __name: "commodity",
  setup(__props) {
    const state = common_vendor.reactive({
      sort: [],
      goods: [],
      loading: false
    });
    const {
      sort,
      goods,
      loading
    } = common_vendor.toRefs(state);
    function rootSoRt() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/sort-admin/sort"
      });
    }
    function rootGoods() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/goods-admin/goods"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(sort), (item, index, i0) => {
          return {
            a: common_vendor.t(item.sort_name),
            b: index,
            c: index == _ctx.num ? 1 : "",
            d: common_vendor.o(($event) => _ctx.seLect(index, item.sort_name, item._id), index)
          };
        }),
        b: common_vendor.f(common_vendor.unref(goods), (item, index, i0) => {
          return common_vendor.e({
            a: item.goods_cover,
            b: common_vendor.t(item.goods_title),
            c: common_vendor.t(item.stock),
            d: common_vendor.t(item.goods_price),
            e: item.shelves
          }, item.shelves ? {
            f: common_vendor.o(($event) => _ctx.shelf(item._id, index), index)
          } : {}, {
            g: index
          });
        }),
        c: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {}, {
        d: common_vendor.o(rootSoRt),
        e: common_vendor.o(rootGoods)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f133ce92"], ["__file", "/Users/weiyingwei/Documents/HBuilderProjects/lingshi-admin/pages/commodity/commodity.vue"]]);
wx.createPage(MiniProgramPage);

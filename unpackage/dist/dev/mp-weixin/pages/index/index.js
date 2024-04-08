"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const search_data = common_vendor.reactive({
      S_height: 0,
      //胶囊按钮的高度
      S_top: 0,
      //胶囊按钮距离顶部的高度
      Custom_height: 0,
      //上两个的和
      pro_hei: 0,
      //订单收益板块距离手机顶部的高度
      profit_top: 0,
      //九宫格距离手机顶部的高度
      // 九宫格的数据
      plate: [
        {
          image: "/static/detail/hengfu.svg",
          name: "横幅管理"
        },
        {
          image: "/static/detail/miaosha.svg",
          name: "秒杀管理"
        },
        {
          image: "/static/detail/shangpin.svg",
          name: "商品管理"
        },
        {
          image: "/static/detail/dingdan.svg",
          name: "订单管理"
        },
        {
          image: "/static/detail/fenlei.svg",
          name: "分类管理"
        }
      ]
    });
    const {
      S_height,
      S_top,
      Custom_height,
      pro_hei,
      profit_top,
      plate
    } = common_vendor.toRefs(search_data);
    common_vendor.onMounted(() => {
      cupSule();
      proFit();
    });
    function proFit() {
      const query = common_vendor.wx$1.createSelectorQuery();
      query.select(".profit-view").boundingClientRect();
      query.exec((res2) => {
        search_data.profit_top = res2[0].height + search_data.pro_hei + 10;
      });
    }
    const cupSule = () => {
      const but_data = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      search_data.S_top = but_data.top;
      search_data.S_height = but_data.height;
      search_data.Custom_height = but_data.top + but_data.height;
      search_data.pro_hei = but_data.top + but_data.height + 20;
    };
    function jump(index) {
      switch (index) {
        case 0:
          common_vendor.wx$1.navigateTo({
            url: "/pages/banner-amdin/banner"
          });
          break;
        case 1:
          common_vendor.wx$1.navigateTo({
            url: "/pages/seckill-admin/seckill"
          });
          break;
        case 2:
          common_vendor.wx$1.switchTab({
            url: "/pages/commodity/commodity"
          });
          break;
        case 3:
          common_vendor.wx$1.switchTab({
            url: "/pages/order/order"
          });
          break;
        case 4:
          common_vendor.wx$1.navigateTo({
            url: "/pages/sort-admin/sort"
          });
      }
    }
    const res = common_vendor.reactive({
      profit: "0.00",
      sales: "0.00",
      orders: 0,
      com_order: 0
    });
    const {
      profit,
      sales,
      orders,
      com_order
    } = common_vendor.toRefs(res);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s("height:" + common_vendor.unref(S_top) + "px;"),
        b: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        c: common_vendor.s("line-height:" + common_vendor.unref(S_height) + "px;"),
        d: common_vendor.s("padding-left:10px"),
        e: common_vendor.s("height:" + common_vendor.unref(Custom_height) + "px;"),
        f: common_vendor.t(common_vendor.unref(profit)),
        g: common_vendor.t(common_vendor.unref(sales)),
        h: common_vendor.t(common_vendor.unref(orders)),
        i: common_vendor.t(common_vendor.unref(com_order)),
        j: common_vendor.s("top:" + common_vendor.unref(pro_hei) + "px;"),
        k: common_vendor.f(common_vendor.unref(plate), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => jump(index), index)
          };
        }),
        l: common_vendor.s("top:" + common_vendor.unref(profit_top) + "px;")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/weiyingwei/Documents/HBuilderProjects/lingshi-admin/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

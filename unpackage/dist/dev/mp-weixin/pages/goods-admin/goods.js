"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const _sfc_main = {
  __name: "goods",
  setup(__props) {
    const priceinv = common_vendor.reactive({
      price: "",
      stock: ""
    });
    const {
      price,
      stock
    } = common_vendor.toRefs(priceinv);
    const specs = common_vendor.reactive({
      specs_data: []
    });
    const cover = common_vendor.reactive({
      goods_title: "",
      sto_image: []
    });
    const video = common_vendor.reactive({
      sto_video: ""
    });
    common_vendor.onMounted(async () => {
      let DB = await AccConfig_init.inIt();
      const res = await DB.database().collection("goods_sort").field({
        _openid: false
      }).get();
      sortdata.sortArray = res.data;
    });
    const sortdata = common_vendor.reactive({
      sortArray: [],
      sort_value: "",
      sort_id: ""
      //分类的id，用于提交数据时对选中的分类下的quantity++
    });
    const {
      sortArray,
      sort_value
    } = common_vendor.toRefs(sortdata);
    const detail = common_vendor.reactive({
      sto_detail: []
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: cover.goods_title,
        b: common_vendor.o(($event) => cover.goods_title = $event.detail.value),
        c: cover.sto_image.length > 0
      }, cover.sto_image.length > 0 ? {
        d: common_vendor.f(cover.sto_image, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.o(($event) => _ctx.preView(item.image), index),
            c: common_vendor.o(($event) => _ctx.deleteImg(index), index),
            d: index
          };
        })
      } : {}, {
        e: common_vendor.o((...args) => _ctx.upImage && _ctx.upImage(...args)),
        f: video.sto_video != ""
      }, video.sto_video != "" ? {
        g: common_vendor.o(($event) => video.sto_video = "")
      } : {}, {
        h: video.sto_video == ""
      }, video.sto_video == "" ? {
        i: common_vendor.o((...args) => _ctx.upVideo && _ctx.upVideo(...args))
      } : {}, {
        j: video.sto_video != ""
      }, video.sto_video != "" ? {
        k: video.sto_video
      } : {}, {
        l: common_vendor.t(common_vendor.unref(sort_value)),
        m: common_vendor.unref(sortArray),
        n: common_vendor.o((...args) => _ctx.changeEnd && _ctx.changeEnd(...args)),
        o: specs.specs_data.length > 0 ? true : false,
        p: common_vendor.unref(price),
        q: common_vendor.o(($event) => common_vendor.isRef(price) ? price.value = $event.detail.value : null),
        r: specs.specs_data.length > 0 ? true : false,
        s: common_vendor.unref(stock),
        t: common_vendor.o(($event) => common_vendor.isRef(stock) ? stock.value = $event.detail.value : null),
        v: specs.specs_data.length == 0
      }, specs.specs_data.length == 0 ? {} : {}, {
        w: specs.specs_data.length > 0
      }, specs.specs_data.length > 0 ? {
        x: common_vendor.f(specs.specs_data, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.f(item.att_data, (item_S, index_S, i1) => {
              return {
                a: common_vendor.t(item_S.att_val),
                b: index_S
              };
            }),
            c: common_vendor.t(item.stock),
            d: common_vendor.t(item.price),
            e: index
          };
        })
      } : {}, {
        y: common_vendor.o((...args) => _ctx.juMp && _ctx.juMp(...args)),
        z: detail.sto_detail.length > 0
      }, detail.sto_detail.length > 0 ? {
        A: common_vendor.f(detail.sto_detail, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.o(($event) => _ctx.previewDeta(item.image), index),
            c: common_vendor.o(($event) => _ctx.deleteDeta(index), index),
            d: index
          };
        })
      } : {}, {
        B: common_vendor.o((...args) => _ctx.upDetail && _ctx.upDetail(...args)),
        C: common_vendor.o((...args) => _ctx.subMit && _ctx.subMit(...args))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/weiyingwei/Documents/HBuilderProjects/lingshi-admin/pages/goods-admin/goods.vue"]]);
wx.createPage(MiniProgramPage);

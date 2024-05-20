"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "specs",
  setup(__props) {
    const show = common_vendor.ref(false);
    const sku_data = common_vendor.reactive({
      sku: [{
        title: 1,
        att_data: [],
        //动态属性[{att_name:'颜色',att_val:''}]
        price: "",
        stock: "",
        image: ""
      }]
    });
    const Sto_att = common_vendor.reactive({
      attobj: [{
        att: ""
      }, {
        att: ""
      }, {
        att: ""
      }]
    });
    const attribute = common_vendor.reactive({
      selected: []
      // {att:'',checked:''}
    });
    function handleSubMitAttr() {
      attribute.selected = Sto_att.attobj.filter((item) => {
        console.log(item);
        item.att != "";
      }).map((element) => {
        console.log(element);
        element.checked = true;
      });
      show.value = false;
    }
    function newSpecs() {
    }
    function deleteSku(index) {
    }
    function chEchange(e) {
    }
    function fInd(att, checked) {
    }
    async function handleUpLoadImgae(index) {
    }
    function dePicture(index) {
    }
    function preView(image) {
    }
    function preserve() {
    }
    function cancel() {
    }
    common_vendor.onLoad((event) => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => show.value = true),
        b: common_vendor.f(attribute.selected, (item, index, i0) => {
          return {
            a: item.att,
            b: item.checked,
            c: common_vendor.t(item.name),
            d: index,
            e: common_vendor.o(($event) => fInd(item.att, item.checked), index)
          };
        }),
        c: common_vendor.o(chEchange),
        d: common_vendor.f(sku_data.sku, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title)
          }, sku_data.sku.length > 1 ? {
            b: common_vendor.o(($event) => deleteSku(), index)
          } : {}, {
            c: item.att_data.length > 0
          }, item.att_data.length > 0 ? {
            d: common_vendor.f(item.att_data, (item_add, index_add, i1) => {
              return {
                a: common_vendor.t(item_add.att_name),
                b: "请输入" + item_add.att_name,
                c: item_add.att_val,
                d: common_vendor.o(($event) => item_add.att_val = $event.detail.value, index_add),
                e: index_add
              };
            })
          } : {}, {
            e: item.price,
            f: common_vendor.o(($event) => item.price = $event.detail.value, index),
            g: item.stock,
            h: common_vendor.o(($event) => item.stock = $event.detail.value, index),
            i: item.image == ""
          }, item.image == "" ? {
            j: common_vendor.o(($event) => handleUpLoadImgae(), index)
          } : {
            k: item.image,
            l: common_vendor.o(($event) => preView(item.image), index)
          }, {
            m: item.image != ""
          }, item.image != "" ? {
            n: common_vendor.o(($event) => dePicture(), index)
          } : {}, {
            o: index
          });
        }),
        e: sku_data.sku.length > 1,
        f: common_vendor.o(newSpecs),
        g: common_vendor.o(($event) => show.value = false),
        h: common_vendor.o(handleSubMitAttr),
        i: common_vendor.f(Sto_att.attobj, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.att,
            c: common_vendor.o(($event) => item.att = $event.detail.value, index),
            d: index
          };
        }),
        j: show.value,
        k: common_vendor.o(($event) => show.value = false),
        l: common_vendor.o(cancel),
        m: common_vendor.o(preserve)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wx-cloud-shop-admin/pages/specs/specs.vue"]]);
wx.createPage(MiniProgramPage);

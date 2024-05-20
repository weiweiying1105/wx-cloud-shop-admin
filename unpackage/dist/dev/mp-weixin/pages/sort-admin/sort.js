"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const AccConfig_media = require("../../Acc-config/media.js");
if (!Math) {
  Loading();
}
const Loading = () => "../public-view/loading.js";
const _sfc_main = {
  __name: "sort",
  setup(__props) {
    const show = common_vendor.ref(false);
    const data = common_vendor.reactive({
      sort: [],
      sort_name: ""
    });
    const {
      sort,
      sort_name
    } = common_vendor.toRefs(data);
    common_vendor.ref(0);
    let loading = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      getSort();
    });
    async function getSort() {
      const DB = await AccConfig_init.inIt();
      const res = await DB.database().collection("goods_sort").field({
        _openid: false
      }).limit(10).get();
      console.log(res);
      data.sort = res.data;
    }
    const handleDelete = async (_id, index, quantity) => {
      if (quantity > 0) {
        new AccConfig_media.Feedback("你这个分类下还有商品，不能删").toast();
        return;
      }
      try {
        const db = await AccConfig_init.inIt();
        await db.database().collection("goods_sort").doc(_id).remove();
        data.sort.splice(index, 1);
      } catch (err) {
        new AccConfig_media.Feedback("删失败了", "error").toast();
      }
    };
    async function handleSubmit() {
      if (data.sort_name !== "") {
        const DB = await AccConfig_init.inIt();
        const query_data = await DB.database().collection("goods_sort").where({
          sort_name: data.sort_name
        }).get();
        if (query_data.data.length > 0) {
          new AccConfig_media.Feedback("该分类已存在", "error").toast();
        } else {
          const res = await DB.database().collection("goods_sort").add({
            data: {
              sort_name: data.sort_name,
              quantity: 0
            }
          });
          data.sort.push({
            sort_name: data.sort_name,
            _id: res._id,
            quantity: 0
          });
          data.sort_name = "";
          show.value = false;
        }
      } else {
        new AccConfig_media.Feedback("你敢不敢写点东西再提交").toast();
      }
    }
    const pageIndex = common_vendor.ref(0);
    common_vendor.onReachBottom(async () => {
      loading.value = true;
      pageIndex.value++;
      let sk = pageIndex.value * 10;
      const DB = await AccConfig_init.inIt();
      const res = await DB.database().collection("goods_sort").field({
        _openid: false
      }).limit(10).skip(sk).get();
      console.log(res);
      let merge = [...data.sort, ...res.data];
      const obj = {};
      const new_data = merge.reduce((prev, item) => {
        if (!obj[item._id]) {
          prev.push(item);
          obj[item._id] = true;
          return prev;
        }
      }, []);
      data.sort = new_data;
      loading.value = false;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(sort) && common_vendor.unref(sort).length > 0
      }, common_vendor.unref(sort) && common_vendor.unref(sort).length > 0 ? {} : {}, {
        b: common_vendor.f(common_vendor.unref(sort), (item, index, i0) => {
          return {
            a: common_vendor.t(item.sort_name),
            b: common_vendor.o(($event) => handleDelete(item._id, index, item.quantity), index),
            c: index
          };
        }),
        c: common_vendor.unref(sort) && common_vendor.unref(sort).length === 0
      }, common_vendor.unref(sort) && common_vendor.unref(sort).length === 0 ? {} : {}, {
        d: common_vendor.o(($event) => show.value = false),
        e: common_vendor.unref(sort_name),
        f: common_vendor.o(common_vendor.m(($event) => common_vendor.isRef(sort_name) ? sort_name.value = $event.detail.value : null, {
          trim: true
        })),
        g: common_vendor.o(handleSubmit),
        h: show.value,
        i: common_vendor.o(($event) => show.value = false),
        j: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {}, {
        k: common_vendor.o(($event) => show.value = true)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8b65ec7"], ["__file", "D:/wx-cloud-shop-admin/pages/sort-admin/sort.vue"]]);
wx.createPage(MiniProgramPage);

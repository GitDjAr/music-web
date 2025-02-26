import requier from "@/utils/requires.js";

// 获取首页推荐
// url https://gitee.com/duanfb/ApiCenter/raw/master/gtp/home.json
async function getHomelist() {
  return requier({
    url: "/home",
    method: "GET",
    show: true,
    baseURL: "/apiG",
  });
}

// https://www.gtpso.com/index.php/Home/QueryService/getNewTabs?num=100
function getNewTabs() {
  return requier({
    url: "/Home/QueryService/getNewTabs?num=100",
    method: "GET",
    show: true,
    baseURL: "/apiG2",
  });
}

// https://www.gtpso.com/index.php/Home/QueryService/search?searchBy=tab&search=%E5%91%A8%E6%9D%B0%E4%BC%A6&p=1
function search(search: string) {
  return requier({
    url: "/Home/QueryService/search?searchBy=tab&search=" + search + "&p=1",
    method: "GET",
    show: true,
    baseURL: "/apiG2",
  });
}

// https://www.gtpso.com/index.php/Home/QueryService/getUrlById?fileId=84322
function getUrlById(fileId: string | number) {
  return requier({
    url: "/Home/QueryService/getUrlById?fileId=" + fileId,
    method: "GET",
    show: true,
    baseURL: "/apiG2/",
  });
}

export { getHomelist, getNewTabs, search, getUrlById };

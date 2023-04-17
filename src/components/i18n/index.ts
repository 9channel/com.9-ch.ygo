import * as sc from "./zh-CN";
import * as tc from "./zh-TW";
import * as en from "./en-US";
import * as jp from "./ja-JP";
export type langData = Record<string, string>;
const replace = (base: langData, tar: langData) => {
  for (const key in tar) {
    if (Object.prototype.hasOwnProperty.call(tar, key)) {
      const element = tar[key];
      base[key] = element;
    }
  }
  return base;
};
const translate = () => {
  const { language } = navigator;
  const settingLanguage = localStorage.getItem("language");
  const lang = settingLanguage || language;
  let data: langData = {};
  data = replace(data, sc.default);
  switch (lang) {
    case "zh-CN":
      break;
    case "zh-TW":
      data = replace(data, tc.default);
      break;
    case "en-US":
      data = replace(data, en.default);
      break;
    case "ja-JP":
      data = replace(data, jp.default);
      break;
    default:
      console.error("Unknown language");
  }
  return data;
};
export default translate;

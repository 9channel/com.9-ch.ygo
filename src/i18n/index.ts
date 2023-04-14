import * as sc from "./zh-CN";
import * as tc from "./zh-TW";
import * as en from "./en-US";
import * as jp from "./ja-JP";
const translate = () => {
  const { language } = navigator;
  const settingLanguage = localStorage.getItem("language");
  const lang = settingLanguage || language;
  switch (lang) {
    case "zh-CN":
      return sc.default;
    case "zh-TW":
      return tc.default;
    case "en-US":
      return en.default;
    case "ja-JP":
      return jp.default;
    default:
      console.error("Unknown language");
      return sc.default;
  }
};
export default translate;

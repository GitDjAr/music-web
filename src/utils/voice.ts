import * as Notif from "@arco-design/web-vue";

// 模拟声音
const playVoice = (t: string) => {
  // 检查浏览器是否支持Web Speech API
  if ("speechSynthesis" in window) {
    // 创建一个新的 SpeechSynthesisUtterance 对象
    var speech = new SpeechSynthesisUtterance();

    // 设置要朗读的文本内容
    speech.text = t;

    // 读取文本内容
    speechSynthesis.speak(speech);
  } else {
    console.log("Web语言API在这个浏览器不支持。");
  }
};
let Notification = null;
function px() {
  if (Notification) {
    return Notification;
  }
  return new Proxy(Notif.Notification, {
    get(target, prop) {
      const value = target[prop];
      if (typeof value === "function") {
        return new Proxy(value, {
          apply: function (target, thisArg, argumentsList) {
            playVoice(argumentsList[0]);
            console.log(
              "Function called with arguments:",
              thisArg,
              argumentsList
            );
            return target.apply(thisArg, argumentsList);
          },
        });
      }
      return value;
    },
  });
}
Notification = px();
export { Notification, playVoice };

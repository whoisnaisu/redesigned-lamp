import Vue from "vue";

const errMessage: string = "Error occurred while";

declare module "vue/types/vue" {
  interface Vue {
    $logError(action: string, err: any): void;
  }
}

function logError(action: string, err: any): void {
  Vue.prototype.$logError = function (action: string, err: any) {
    console.error(`${errMessage} ${action}\n`, err);
  };
}

export default logError;

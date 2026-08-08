import Vue from "vue";

const errMessage: string = "Error occurred while";

declare module "vue/types/vue" {
  interface Vue {
    $logError(action: string, err: any): void;
  }
}

function logError(action: string, err: any): void {
  console.error(`${errMessage} ${action}\n`, err);
}

Vue.prototype.$logError = function (action: string, err: any) {
  logError(action, err);
};

export default logError;

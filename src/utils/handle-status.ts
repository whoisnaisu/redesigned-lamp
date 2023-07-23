declare module "vue/types/vue" {
  interface Vue {
    $handleStatus: HandleStatus;
  }
}

class HandleStatus {
  private static instance: HandleStatus | null = null;
  public isLoading: boolean;
  public isError: boolean;

  private constructor() {
    this.isLoading = false;
    this.isError = false;
  }

  public static getInstance(): HandleStatus {
    if (!HandleStatus.instance) {
      HandleStatus.instance = new HandleStatus();
    }
    return HandleStatus.instance;
  }

  public setLoading(): void {
    this.isLoading = true;
    this.isError = false;
  }

  public setError(): void {
    this.isError = true;
    this.isLoading = false;
  }

  public clearStatus(): void {
    this.isLoading = false;
    this.isError = false;
  }
}
export default HandleStatus;

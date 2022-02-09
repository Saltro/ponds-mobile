declare interface ResponseBody<T = any> {
  code: number;
  message: string;
  data: T;
}

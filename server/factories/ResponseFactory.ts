export interface FormattedResponse {
  statusCode: number;
  body: any;
}

export interface ResponseFactory {
  getErrorStatusCode(errorName: string): number;
  formatErrorResponse(data: Error): FormattedResponse;
}

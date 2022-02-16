export interface FormattedResponse {
  statusCode: number;
  body: any;
}

export interface ResponseFactory {
  getErrorStatusCode(errorName: string): number;
  formatResponse(data: any): FormattedResponse;
  formatErrorResponse(data: Error): FormattedResponse;
}

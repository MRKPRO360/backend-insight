export type TErrSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrResponse = {
  statusCode: number;
  message: string;
  errSources: TErrSources;
};

export type PageProps = {
  params: { _id: string };
  searchParams: SearchParams;
};

export type SearchParamsPromise = Promise<{ [key: string]: string }>;
export type ParamsPromise = Promise<{ [key: string]: string }>;

export type SearchParams = {
  [key: string]: string | number | boolean;
};

export type PagePropsPromise = {
  params: ParamsPromise;
  searchParams: SearchParamsPromise;
};

export type Children = {
  children: React.ReactNode;
};

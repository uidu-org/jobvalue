export type BillingKind = {
  id: string;
  name: string;
};

export type Province = {
  id: string;
  name: string;
  abbr: string;
};

export type BillingProps = {
  defaultBillingKind?: string;
  billingKinds?: Array<BillingKind>;
  provinces?: Array<Province>;
};

export type BillingKind = {
  id: string;
  name: string;
};

export type BillingProps = {
  defaultBillingKind?: string;
  billingKinds?: Array<BillingKind>;
};

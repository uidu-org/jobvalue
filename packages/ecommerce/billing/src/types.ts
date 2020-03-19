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
  defaultValues?: {
    billing_first_name: string;
    billing_last_name: string;
    billing_fiscal_code: string;
    billing_address: string;
    billing_city: string;
    billing_zip: string;
    billing_province: string;
  };
};

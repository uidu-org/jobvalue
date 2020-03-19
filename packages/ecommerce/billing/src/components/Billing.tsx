import FieldGeosuggest from '@uidu/field-geosuggest';
import FieldNumber from '@uidu/field-number';
import FieldText from '@uidu/field-text';
import FieldTextarea from '@uidu/field-textarea';
import Select from '@uidu/select';
import CodiceFiscale from 'codice-fiscale-js';
import React, { useState } from 'react';
import { BillingProps } from '../types';

export default function Billing({
  defaultBillingKind = 'personal',
  billingKinds = [{ id: 'personal', name: 'Persona Fisica' }],
  provinces = [],
  defaultValues = null,
}: BillingProps) {
  const [billingKind, setBillingKind] = useState(defaultBillingKind);
  return (
    <>
      {billingKinds.length > 1 && (
        <Select
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: '#fff',
            }),
            valueContainer: (base, state) => ({
              ...base,
              padding:
                state.isMulti && state.hasValue
                  ? 'calc(.5rem - 3px) .5rem'
                  : '.75rem 1rem',
            }),
          }}
          label="Tipologia"
          name="billing_kind"
          options={billingKinds}
          onChange={(_name, value) => setBillingKind(value)}
          value={billingKind}
        />
      )}
      {billingKind === 'company' ? (
        <FieldText
          name="billing_company_name"
          label="Ragione sociale"
          required
        />
      ) : (
        <div className="row">
          <div className="col-sm-6">
            <FieldText
              name="billing_first_name"
              label="Nome su fattura"
              value={defaultValues?.billing_first_name}
              required
            />
          </div>
          <div className="col-sm-6">
            <FieldText
              name="billing_last_name"
              label="Cognome su fattura"
              value={defaultValues?.billing_last_name}
              required
            />
          </div>
        </div>
      )}
      {billingKind !== 'personal' && (
        <>
          <div className="row">
            <div className="col-sm-6">
              <FieldText type="email" name="billing_pec" label="PEC" required />
            </div>
            <div className="col-sm-6">
              <FieldText
                name="billing_code"
                label="Codice destinatario"
                placeholder="0000000"
                required
              />
            </div>
          </div>
        </>
      )}
      <div className="row">
        <div className={`col-sm-${billingKind === 'personal' ? 12 : 6}`}>
          <FieldText
            name="billing_fiscal_code"
            label="Codice fiscale"
            required
            value={defaultValues?.billing_fiscal_code}
            // @ts-ignore
            validations={{
              isValidCodiceFiscale: (values, value) => {
                if (value && value !== '') {
                  try {
                    const cf = new CodiceFiscale(value);
                    return cf.isValid();
                  } catch (error) {
                    return 'Inserisci un codice fiscale valido';
                  }
                }
                return 'Inserisci un codice fiscale valido';
              },
            }}
          />
        </div>
        {billingKind !== 'personal' && (
          <div className="col-sm-6">
            <FieldText name="billing_vat_code" label="Partita IVA" required />
          </div>
        )}
      </div>
      <FieldTextarea
        label="Indirizzo"
        name="billing_address"
        value={defaultValues?.billing_address}
        required={billingKind === 'company'}
      />
      <FieldGeosuggest
        name="billing_city"
        label="Comune"
        required
        value={defaultValues?.billing_city}
        onGeocode={console.log}
        countryRestricted="it"
      />
      <FieldNumber
        name="billing_zip"
        label="CAP"
        value={defaultValues?.billing_zip}
        required
        options={{ format: '#####', mask: '_', allowEmptyFormatting: true }}
      />
      <Select
        options={provinces}
        name="billing_province"
        label="Provincia (Sigla)"
        getOptionValue={({ abbr }) => abbr}
        required={provinces.length > 0}
        isLoading={provinces.length === 0}
        value={defaultValues?.billing_province}
      />
    </>
  );
}

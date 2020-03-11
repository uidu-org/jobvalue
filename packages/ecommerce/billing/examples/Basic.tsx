import Form, { FormSubmit } from '@uidu/form';
import React from 'react';
import Billing from '..';

export default function Basic() {
  return (
    <>
      <div className="mb-4">
        <Form
          handleSubmit={async model => console.log(model)}
          footerRenderer={({ loading, canSubmit }) => (
            <FormSubmit loading={loading} canSubmit={canSubmit} label="Invia" />
          )}
        >
          <fieldset>
            <legend>Default</legend>
            <Billing />
          </fieldset>
        </Form>
      </div>
      <Form
        handleSubmit={async model => console.log(model)}
        footerRenderer={({ loading, canSubmit }) => (
          <FormSubmit loading={loading} canSubmit={canSubmit} label="Invia" />
        )}
      >
        <fieldset>
          <legend>Multiple billing kinds</legend>
          <Billing
            billingKinds={[
              {
                id: 'company',
                name: 'Azienda',
              },
              {
                id: 'individual',
                name: 'Ditta individuale / Libero professionista',
              },
              {
                id: 'personal',
                name: 'Persona fisica',
              },
            ]}
          />
        </fieldset>
      </Form>
    </>
  );
}

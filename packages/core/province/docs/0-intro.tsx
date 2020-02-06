import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # Province
  --- come si usa

  ## Usage

  ${code`import Province from '@jobvalue/province';`}

  ${(
    <Example
      packageName="@jobvalue/province"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Step Props"
      props={require('!!extract-react-types-loader!../src/components/Province')}
    />
  )}
`;

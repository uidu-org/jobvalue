import { code, Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`

  # SalariesVariations
  --- come si usa

  ## Usage

  ${code`import SalariesVariations from '@jobvalue/salaries-variations';`}

  ${(
    <Example
      packageName="@jobvalue/salaries-variations"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}
`;

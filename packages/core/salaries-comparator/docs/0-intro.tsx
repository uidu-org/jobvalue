import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # SalariesComparator
  --- come si usa

  ## Usage

  ${code`import SalariesComparator from '@jobvalue/salaries-comparator';`}

  ${(
    <Example
      packageName="@jobvalue/salaries-comparator"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Step Props"
      props={require('!!extract-react-types-loader!../src/components/SalariesComparator')}
    />
  )}
`;

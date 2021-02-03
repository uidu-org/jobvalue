import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # Salaries
  Salary renders a salary chart. You can configure how the chart behaves using props. For instance you can add \`mySalary\` and show comparison with benchmarks.
  You can also change chart colors, when needed.

  ## Usage

  ${code`import Salaries from '@jobvalue/salaries';`}

  ${(
    <Example
      packageName="@jobvalue/salaries"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Step Props"
      props={require('!!extract-react-types-loader!../src/components/Billing')}
    />
  )}
`;

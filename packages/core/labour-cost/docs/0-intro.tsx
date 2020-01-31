import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # LabourCost
  --- come si usa

  ## Usage

  ${code`import LabourCost from '@jobvalue/labour-cost';`}

  ${(
    <Example
      packageName="@jobvalue/labour-cost"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Step Props"
      props={require('!!extract-react-types-loader!../src/components/LabourCost')}
    />
  )}
`;

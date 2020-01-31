import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # SalariesComparator
  --- come si usa

  ## Usage

  ${code`import Job, { JobCustomizations } from '@jobvalue/job';`}

  ${(
    <Example
      packageName="@jobvalue/job"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Job Props"
      props={require('!!extract-react-types-loader!../src/components/Job')}
    />
  )}
`;

import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';

export default class ExVar extends PureComponent<any> {
  render() {
    const { salaryDataForChart, loaded } = this.props;
    return (
      <div className="d-flex flex-row align-items-center">
        <div className="card-body">
          <p className="mb-1">Incidenza sulla RAL</p>
          <p className="text-muted mb-0">
            Rapporto fra la retribuzione variabile media annua percepita e la
            RAL media annua
          </p>
        </div>
        <div
          className="card-body flex-shrink-0 text-center"
          style={{ width: '35%' }}
        >
          {loaded && salaryDataForChart ? (
            <div>
              <h3 className="text-nowrap">{salaryDataForChart[1].ex_var}</h3>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}

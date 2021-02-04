import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';

export default class ExCount extends PureComponent<any> {
  render() {
    const { salaryDataForChart, loaded } = this.props;
    return (
      <div className="d-flex flex-row align-items-center">
        <div className="card-body">
          <p className="text-muted mb-0">Numero percettori</p>
        </div>
        <div
          className="card-body flex-shrink-0 text-center"
          style={{ width: '35%' }}
        >
          {loaded && salaryDataForChart ? (
            <div>
              <h3 className="text-nowrap">
                {salaryDataForChart[1].incumbentsCount}
              </h3>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}

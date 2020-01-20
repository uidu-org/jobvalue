import Navigation from '@uidu/navigation';
import { ShellHeader } from '@uidu/shell';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { externalPackages as packages } from '../../site';
import * as fs from '../../utils/fs';
import defaultNavigations from './navigations/Default';
import { standardGroups } from './navigations/Packages';

export type State = {
  searchDrawerValue: string;
};

export default class Nav extends React.Component<{}, State> {
  state = {
    searchDrawerValue: '',
  };

  closeSearchDrawer = () =>
    this.setState({
      searchDrawerValue: '',
    });
  updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      searchDrawerValue: e.target.value,
    });

  render() {
    const { searchDrawerValue } = this.state;
    const dirs = fs.getDirectories(packages.children);

    return (
      <Switch>
        <Route
          render={({ location }) => {
            const schema = [
              {
                type: 'InlineComponent',
                component: () => (
                  <ShellHeader className="px-3 px-xl-4 py-3">
                    JOBVALUIKIT
                  </ShellHeader>
                ),
              },
              {
                type: 'NavigationSection',
                items: [
                  {
                    type: 'InlineComponent',
                    component: () => (
                      <div className="px-3 px-xl-4 mb-4">
                        <input
                          type="search"
                          className="form-control shadow-none mb-4"
                          autoComplete="off"
                          placeholder="Cerca tra i moduli.."
                        />
                      </div>
                    ),
                  },
                  {
                    type: 'NavigationGroup',
                    items: defaultNavigations,
                  },

                  ...standardGroups(dirs, location.pathname),
                ],
              },
            ];

            return <Navigation schema={schema} />;
          }}
        />
      </Switch>
    );
  }
}

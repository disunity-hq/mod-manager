import React, { ReactElement, useEffect } from 'react';
import { Menu, Layout, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { SideBarProps } from './NavBar';
import { RootState } from '../../../store/types';
import { loadGamesAsync } from '../../../store/games/actions';
import { connect } from 'react-redux';
import { GamesMap } from '../../../../models';

const { Sider } = Layout;

interface GamesSidebarStateProps {
  loading: boolean;
  games: GamesMap;
}

const mapStateToProps = (state: RootState): GamesSidebarStateProps => ({
  loading: state.games.loading,
  games: state.games.games,
});

const mapDistpatchtoProps = {
  loadGames: loadGamesAsync.request,
};

type GamesSideBarProps = ReturnType<typeof mapStateToProps> &
  typeof mapDistpatchtoProps &
  SideBarProps;

export const GamesSideBar = ({
  collapsed: expanded,
  theme,
  toggleExpanded,
  segment,
  loading,
  loadGames,
  games,
}: React.PropsWithChildren<GamesSideBarProps>): ReactElement => {
  useEffect((): void => {
    if (!games || Object.keys(games).length === 0) loadGames();
  }, []);
  return (
    <Sider collapsible collapsed={expanded} onCollapse={toggleExpanded} theme={theme}>
      <Menu theme={theme} selectedKeys={[segment || 'browse']} mode="inline">
        <Menu.Item key="browse">
          <Icon type="search" />
          <span>Browse for Games</span>
          <Link to="/games" />
        </Menu.Item>
        {loading ? (
          <Menu.Item key="spinner">
            <Spin />
          </Menu.Item>
        ) : (
          Object.entries(games).map(
            ([key, game]): ReactElement => (
              <Menu.Item key={key}>
                <Icon type="file-unknown" />
                <span>{game.name}</span>
                <Link to={`/games/${key}`} />
              </Menu.Item>
            )
          )
        )}
      </Menu>
    </Sider>
  );
};

export default connect(
  mapStateToProps,
  mapDistpatchtoProps
)(GamesSideBar);

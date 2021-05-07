/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import { Link, matchPath, useLocation } from 'react-router-dom';

const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 2px;
  color: black;

  a {
    padding: 15px 20px;
    display: flex;
    height: 100%;
    align-items: center;
    gap: 10px;
    color: inherit;
    width: 100%;
  }

  &:hover {
    background-color: #f5f5f6;
  }

  &.active {
    background-color: #cccccc;
  }
`;

type Props = {
  href: string;
  icon?: string;
  title: string;
};

const NavItem = ({ href, icon = '', title }: Props) => {
  const location = useLocation();

  const active = (href as string)
    ? !!matchPath(href, location.pathname)
    : false;

  return (
    <NavItemWrapper className={active ? 'active' : ''}>
      <Link to={href}>
        {icon}
        <span>{title}</span>
      </Link>
    </NavItemWrapper>
  );
};

export default NavItem;

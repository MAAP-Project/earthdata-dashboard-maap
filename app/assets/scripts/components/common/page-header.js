import React from 'react';
import T from 'prop-types';
import styled, { css, createGlobalStyle } from 'styled-components';
import { rgba } from 'polished';
import { connect } from 'react-redux';

import config from '../../config';

import { Link, NavLink } from 'react-router-dom';
import { visuallyHidden, unscrollableY } from '../../styles/helpers';
import { themeVal, stylizeFunction } from '../../styles/utils/general';
import { reveal } from '../../styles/animation';
import { filterComponentProps } from '../../utils/utils';
import { glsp } from '../../styles/utils/theme-values';
import media from '../../styles/utils/media-queries';
import { surfaceElevatedD } from '../../styles/skins';
import { wrapApiResult } from '../../redux/reduxeed';
import { headingAlt } from '../../styles/type/heading';

import Button from '../../styles/button/button';
import indicatorsList from '../indicators';

const { appTitle, appVersion, baseUrl } = config;

const _rgba = stylizeFunction(rgba);

const PageHead = styled.header`
  position: relative;
  z-index: 20;
  background: ${themeVal('color.link')};
  color: ${themeVal('color.baseLight')};

  /* Animation */
  animation: ${reveal} 0.32s ease 0s 1;
`;

const PageHeadInner = styled.div`
  display: flex;
  padding: ${glsp(0.5, 0.5, 0.5, 1)};
  align-items: center;
  margin: 0 auto;
  height: 100%;

  ${media.largeUp`
    padding: ${glsp(0.75)};
  `}
`;

const PageHeadline = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  padding-right: ${glsp()};
  margin-right: auto;
`;

const PageTitle = styled.h1`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  margin: 0;
  line-height: 1;
`;

const PageTitlePrimeLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr;

  ${media.largeUp`
    grid-template-columns: min-content 1fr;
    grid-gap: 0 ${glsp(0.5)};
  `}

  &,
  &:visited {
    color: inherit;
  }

  &::before {
    grid-row: 1 / span 2;
    content: '';
    height: 48px;
    width: 56px;
    background: url(${`${baseUrl}/assets/graphics/layout/app-logo-sprites.png`});
    background-size: auto 100%;
    background-repeat: none;
    background-position: top right;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.16;
    transform: scale(2) translate(-0.5rem, -25%);
    transform-origin: top left;
    clip-path: polygon(0 25%, 100% 25%, 100% 75%, 0 75%);

    ${media.largeUp`
      position: static;
      transform: none;
      opacity: 1;
      clip-path: none;
    `}
  }

  &:hover {
    opacity: 1;

    &::before {
      background-position: top left;
    }
  }

  sup {
    grid-row: 1;
    font-size: 0.5rem;
    line-height: 1;
    font-weight: ${themeVal('type.base.extrabold')};
    text-transform: uppercase;
    align-self: end;
    top: inherit;
    vertical-align: inherit;
    transform: translate(0, -0.125rem);

    ${media.largeUp`
      font-size: 0.875rem;
      line-height: 1rem;
      transform: none;
    `}

    span {
      ${visuallyHidden()};
    }
  }

  strong {
    grid-row: 2;
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: ${themeVal('type.base.regular')};
    align-self: center;
    letter-spacing: -0.025em;
    transform: translate(0, 0.125rem);

    ${media.largeUp`
      font-size: 1.25rem;
      line-height: 1.5rem;
      font-weight: ${themeVal('type.base.light')};
      transform: none;
    `}
  }
`;

const PageTitleSecLink = styled(Link)`
  font-size: 0.75rem;
  line-height: 1rem;
  text-transform: uppercase;
  color: ${themeVal('color.link')};
  background: ${themeVal('color.surface')};
  padding: 0 ${glsp(0.25)};
  border-radius: ${themeVal('shape.rounded')};
  bottom: inherit;
  vertical-align: inherit;
  margin: ${glsp(0, 0.5)};

  ${media.largeUp`
    margin: ${glsp(0.25, 0.5)};
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0 ${glsp(0.5)};
  `}
`;

const PageNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  background: ${themeVal('color.silk')};
  transition: all 0.16s ease 0s;
  opacity: 0;
  visibility: hidden;
  transform: translate3d(0,0,0);

  ${media.largeUp`
    position: static;
    opacity: 1;
    visibility: visible;
    background: transparent;
    width: auto;
    height: auto;
  `}

  ${({ revealed }) => revealed &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const PageNavInner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 18rem;
  height: 100%;
  background: ${themeVal('color.primary')};
  color: ${themeVal('color.baseLight')};
  transition: all 0.32s ease 0s;
  transform: translate(100%, 0);

  ${({ revealed }) =>
    revealed &&
    css`
      transform: translate(0, 0);
    `};
  
  ${media.largeUp`
    flex-flow: row nowrap;
    transform: none;
    width: auto;
    height: auto;
  `}
`;

const PageNavHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  padding: ${glsp(0.5, 0.5, 0.5, 1)};
  align-items: center;

  ${media.largeUp`
    ${visuallyHidden()};
  `}
`;

const PageNavTitle = styled.h2`
  ${headingAlt}
  font-size: 0.875rem;
  line-height: 2rem;
  margin: 0 auto 0 0;

  ${media.largeUp`
    ${visuallyHidden()};
  `}
`;

const PageNavBody = styled.div`
  display: grid;
  grid-gap: ${glsp()};
  padding: ${glsp()};
  box-shadow: inset 0 1px 0 0 ${_rgba('#FFFFFF', 0.12)};
  overflow: auto;
  flex: 1;

  ${media.largeUp`
    padding: 0;
    box-shadow: none;
    overflow: visible;
  `}

  > *:last-child {
    padding-bottom: ${glsp()};

    ${media.largeUp`
      padding: 0;
    `}
  }
`;

const PrimeMenuBlock = styled.section`
  color: ${themeVal('color.surface')};

  ${media.largeUp`
    ${surfaceElevatedD()}
    border-radius: ${themeVal('shape.rounded')};
    padding: ${glsp()};
    color: ${themeVal('type.base.color')};
    width: 14rem;
  `}
`;

const PrimeMenuBlockTitle = styled.h6`
  ${headingAlt}
  margin: 0 0 ${glsp(0.5)} 0;
  display: none;

  ${media.largeUp`
    display: block;
    margin: 0 0 ${glsp(0.25)} 0;
  `}
`;

const PrimeMenu = styled.ul`
  display: flex;
  flex-flow: column nowrap;

  ${media.largeUp`
    flex-flow: row nowrap;
  `}

  a {
    display: block;
    text-align: left;
  }

  > li {
    position: relative;

    ${media.largeUp`
      margin: 0 0 0 ${glsp(0.25)};
    `}
  }

  ${PrimeMenuBlock} {
    transition: all 0.16s ease 0s;

    ${media.largeUp`
      position: absolute;
      right: 0;
      visibility: hidden;
      opacity: 0;
      transform: translate(0, -${glsp(0.25)});
    `}
  }

  > li:hover ${PrimeMenuBlock},
  > li:focus-within ${PrimeMenuBlock},
  ${PrimeMenuBlock}:hover,
  ${PrimeMenuBlock}:focus {
    visibility: visible;
    opacity: 1;

    ${media.largeUp`
      transform: translate(0, ${glsp(0.25)});
    `}
  }
`;

const PrimeSubmenu = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  padding: ${glsp(0, 1)};

  ${media.largeUp`
    padding: 0;
  `}
`;

const ShareLi = styled.li`
  margin-top: ${glsp()};
  padding-top: ${glsp()};
  box-shadow: inset 0 1px 0 0 ${_rgba('#FFFFFF', 0.12)};

  ${media.largeUp`
    display: block;
    margin-top: 0;
    padding-top: 0;
    box-shadow: none;
  `}

  > a {
    display: none;
    text-align: center;

    ${media.largeUp`
      display: block;
    `}
  }

  ${PrimeMenuBlockTitle} {
    display: block;
  }

  ${PrimeSubmenu} {
    padding: 0;
  }
`;

const PageNavGlobalStyle = createGlobalStyle`
  body {
    ${unscrollableY()}
  }
`;

// See documentation of filterComponentProp as to why this is
const propsToFilter = ['variation', 'size', 'hideText', 'useIcon', 'active'];
const NavLinkFilter = filterComponentProps(NavLink, propsToFilter);

class PageHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      panelOpen: false
    };
  }

  render () {
    const { spotlightList, isMediumDown } = this.props;

    const spotlightAreas = spotlightList.isReady() && spotlightList.getData();

    return (
      <PageHead role='banner'>
        <PageHeadInner>
          <PageHeadline>
            <PageTitle>
              <PageTitlePrimeLink to='/' title='View the welcome page'>
                <sup>
                  <span>NASA - </span>Earthdata
                </sup>
                <strong>{appTitle}</strong>
              </PageTitlePrimeLink>
              <PageTitleSecLink to='/development' title={appVersion}>
                Beta
              </PageTitleSecLink>
            </PageTitle>
          </PageHeadline>

          {this.state.panelOpen && <PageNavGlobalStyle />}

          {isMediumDown && (
            <Button
              hideText
              useIcon='hamburger-menu'
              variation='achromic-plain'
              title='Show menu'
              onClick={() => this.setState({ panelOpen: true })}
            >
              Show menu
            </Button>
          )}

          <PageNav role='navigation' revealed={this.state.panelOpen}>
            <PageNavInner revealed={this.state.panelOpen}>
              <PageNavHeader>
                <PageNavTitle>Menu</PageNavTitle>
                {isMediumDown && (
                  <Button
                    hideText
                    useIcon='xmark'
                    variation='achromic-plain'
                    title='Hide menu'
                    onClick={() => this.setState({ panelOpen: false })}
                  >
                    Hide menu
                  </Button>
                )}
              </PageNavHeader>
              <PageNavBody>
                <PrimeMenu>
                  <li>
                    <Button
                      element={NavLinkFilter}
                      to='/'
                      exact
                      variation='achromic-plain'
                      title='View the Welcome page'
                    >
                      Welcome
                    </Button>
                  </li>
                  <li>
                    <Button
                      element={NavLinkFilter}
                      to='/explore'
                      exact
                      variation='achromic-plain'
                      title='View the Explore page'
                      useIcon={isMediumDown ? null : ['chevron-down--small', 'after']}
                    >
                      Explore
                    </Button>
                    <PrimeMenuBlock>
                      <PrimeMenuBlockTitle>Explore</PrimeMenuBlockTitle>
                      <PrimeSubmenu aria-label='submenu'>
                        <li>
                          <Button
                            element={NavLinkFilter}
                            to='/explore/global'
                            exact
                            variation={isMediumDown ? 'achromic-plain' : 'primary-plain'}
                            title='Explore the global map'
                          >
                            Global
                          </Button>
                        </li>
                        {spotlightAreas &&
                          spotlightAreas.map((ss) => (
                            <li key={ss.id}>
                              <Button
                                element={NavLinkFilter}
                                to={`/explore/${ss.id}`}
                                variation={isMediumDown ? 'achromic-plain' : 'primary-plain'}
                                title={`Explore ${ss.label}`}
                              >
                                {ss.label}
                              </Button>
                            </li>
                          ))}
                      </PrimeSubmenu>
                    </PrimeMenuBlock>
                  </li>
                  <li>
                    <Button
                      element={NavLinkFilter}
                      to='/indicators'
                      exact
                      variation='achromic-plain'
                      title='View the Indicators page'
                      useIcon={isMediumDown ? null : ['chevron-down--small', 'after']}
                    >
                      Indicators
                    </Button>
                    <PrimeMenuBlock>
                      <PrimeMenuBlockTitle>Indicators</PrimeMenuBlockTitle>
                      <PrimeSubmenu aria-label='submenu'>
                        {indicatorsList
                          .filter((d) => !!d.LongForm)
                          .map((d) => (
                            <li key={d.id}>
                              <Button
                                element={NavLinkFilter}
                                to={`/indicators/${d.id}`}
                                variation={isMediumDown ? 'achromic-plain' : 'primary-plain'}
                                title='Learn about the indicator'
                              >
                                {d.name}
                              </Button>
                            </li>
                          ))}
                      </PrimeSubmenu>
                    </PrimeMenuBlock>
                  </li>
                  <li>
                    <Button
                      element={NavLinkFilter}
                      to='/about'
                      variation='achromic-plain'
                      title='Learn more'
                    >
                      About
                    </Button>
                  </li>
                  <li>
                    <Button
                      variation='achromic-plain'
                      title='Send feedback'
                      onClick={() => {
                        window.feedback.showForm();
                      }}
                    >
                      Feedback
                    </Button>
                  </li>
                  <ShareLi>
                    <Button
                      as='a'
                      href='#share-options'
                      variation='achromic-plain'
                      title='View share options'
                      hideText
                      useIcon='share-2'
                    >
                      <span>Share</span>
                    </Button>
                    <PrimeMenuBlock id='share-options'>
                      <PrimeMenuBlockTitle>Share</PrimeMenuBlockTitle>
                      <PrimeSubmenu aria-label='submenu'>
                        <li>
                          <Button
                            as='a'
                            variation={isMediumDown ? 'achromic-plain' : 'primary-plain'}
                            useIcon='brand-facebook'
                            href=''
                            title='Share on Facebook'
                            target='_blank'
                          >
                            Facebook
                          </Button>
                        </li>
                        <li>
                          <Button
                            as='a'
                            variation={isMediumDown ? 'achromic-plain' : 'primary-plain'}
                            useIcon='brand-twitter'
                            href=''
                            title='Share on Twitter'
                            target='_blank'
                          >
                            Twitter
                          </Button>
                        </li>
                      </PrimeSubmenu>
                    </PrimeMenuBlock>
                  </ShareLi>
                </PrimeMenu>
              </PageNavBody>
            </PageNavInner>
          </PageNav>
        </PageHeadInner>
      </PageHead>
    );
  }
}

PageHeader.propTypes = {
  spotlightList: T.object,
  isMediumDown: T.bool
};

function mapStateToProps (state, props) {
  return {
    spotlightList: wrapApiResult(state.spotlight.list)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);

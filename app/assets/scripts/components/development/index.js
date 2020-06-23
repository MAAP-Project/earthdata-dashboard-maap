import React from 'react';
import styled from 'styled-components';

import App from '../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import Constrainer from '../../styles/constrainer';
import Prose from '../../styles/type/prose';
import Button from '../../styles/button/button';

import { glsp } from '../../styles/utils/theme-values';
import media from '../../styles/utils/media-queries';

const ContributeCta = styled.div`
  display: grid;
  grid-gap: ${glsp()};
  grid-template-columns: repeat(12, 1fr);

  > * {
    grid-column: auto / span 12;
  }

  ${media.mediumUp`
    > * {
      grid-column: auto / span 4;
    }
  `}

  ${media.largeUp`
    > * {
      grid-column: auto / span 3;
    }
  `}
`;

const PageConstrainer = styled(Constrainer)`
  ${Prose}${Prose} {
    max-width: 50rem;

    ${media.largeUp`
      margin-bottom: ${glsp(3)};
    `}
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;

export default class Development extends React.Component {
  render () {
    return (
      <App pageTitle='Development & contributing'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Development & contributing</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <p>
                  NASA started the development of the Dashboard in May 2020. This experimental site reflects a rapid response to COVID-19 currently underway and will continue to evolve as more data become available.
                </p>
                <p>
                  We welcome your feedback to help improve the Dashboard.
                </p>
              </Prose>
              <ContributeCta>
                <Button
                  element='a'
                  href='https://github.com/NASA-IMPACT/covid-dashboard'
                  variation='primary-raised-dark'
                  useIcon={['brand-github', 'after']}
                >
                  Github
                </Button>
                <Button
                  variation='primary-raised-dark'
                  useIcon={['speech-balloon', 'after']}
                  onClick={() => {
                    window.feedback.showForm();
                  }}
                >
                  Feedback
                </Button>
              </ContributeCta>
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import styles from './PageLayout.scss';

type Props = {
  children: Node,
};

export default class PageLayout extends Component<Props> {
  render() {
    const { children } = this.props;

    return <div className={styles.page}>{children}</div>;
  }
}

/* @flow */

import React, {Component} from 'react';
import {Flex, Box} from 'reflexbox';
import Sections from '../../../Sections/Sections';
import cloneDeep from 'lodash/cloneDeep';
const map = function(n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

export default class RowLayoutView extends Component {
  static propTypes = {};

  render() {
    const {model, settings} = this.props;

    const rows = cloneDeep(model.val.rows);

    const emptyColumns = [];
    const settedColumns = [];
    let total_setted_Percentage = 0;

    rows.forEach((item, index) => {
      if (item.compSettings && item.compSettings.widthPercentage) {
        settedColumns[index] = item;
        total_setted_Percentage += +item.compSettings.widthPercentage;
      } else {
        emptyColumns[index] = item;
      }
    });

    if (total_setted_Percentage < 100) {
      // 没有超过100 的话, 没有设置的 均分 剩余空间
      const remained = 100 - total_setted_Percentage;
      const remained_one = remained / emptyColumns.length;
      emptyColumns.forEach(
        item =>
          (item.compSettings = {
            ...item.compSettings,
            widthPercentage: remained_one
          })
      );
    }

    const percentages = [];
    const total = rows.reduce((t, item, index, ary) => {
      let {widthPercentage} = item.compSettings || {};
      // || columnPercentages[index];

      let flexBasis = map(widthPercentage || 0, 0, 100, 0, 12);
      percentages[index] = flexBasis;
      return flexBasis + t;
    }, 0);

    return (
      <Flex flexColumn={false} wrap>
        {rows.map((rowSections, sectionIndex) => {
          let flexBasis = percentages[sectionIndex];
          flexBasis = map(flexBasis, 0, total, 0, 12);
          let basis = parseInt(flexBasis);

          if (basis < 1) {
            return <noscript key={sectionIndex} />;
          }
          return (
            <Box auto key={sectionIndex} sm={basis} col={12}>
              <Sections
                model={rowSections}
                settings={settings}
                editMode={false}
              />
            </Box>
          );
        })}
      </Flex>
    );
  }
}

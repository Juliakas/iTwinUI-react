/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useCallback } from 'react';
import { CellProps, Column, TableState } from 'react-table';
import {
  Code,
  Table,
  IconButton,
  Leading,
  tableFilters,
  TableFilterValue,
  TableProps,
} from '../../src/core';
import { Story, Meta } from '@storybook/react';
import { useMemo, useState } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { SvgChevronDown, SvgChevronRight } from '@itwin/itwinui-icons-react';
import { CreeveyStoryParams } from 'creevey';

export default {
  title: 'Core/Table',
  component: Table,
  args: {
    data: [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    emptyTableContent: 'No data.',
  },
  argTypes: {
    columns: {
      control: { disable: true },
    },
    isSelectable: {
      control: { disable: true },
    },
    style: {
      control: { disable: true },
    },
    className: {
      control: { disable: true },
    },
    initialState: {
      table: { disable: true },
    },
    stateReducer: {
      table: { disable: true },
    },
    useControlledState: {
      table: { disable: true },
    },
    defaultColumn: {
      table: { disable: true },
    },
    getSubRows: {
      table: { disable: true },
    },
    getRowId: {
      table: { disable: true },
    },
    manualRowSelectedKey: {
      table: { disable: true },
    },
    autoResetSelectedRows: {
      table: { disable: true },
    },
    selectSubRows: {
      table: { disable: true },
    },
    manualSortBy: {
      table: { disable: true },
    },
    defaultCanSort: {
      table: { disable: true },
    },
    disableMultiSort: {
      table: { disable: true },
    },
    isMultiSortEvent: {
      table: { disable: true },
    },
    maxMultiSortColCount: {
      table: { disable: true },
    },
    disableSortRemove: {
      table: { disable: true },
    },
    disabledMultiRemove: {
      table: { disable: true },
    },
    orderByFn: {
      table: { disable: true },
    },
    sortTypes: {
      table: { disable: true },
    },
    autoResetSortBy: {
      table: { disable: true },
    },
    autoResetHiddenColumns: {
      table: { disable: true },
    },
  },
} as Meta<TableProps>;

export const Basic: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'Description',
            accessor: 'description',
            maxWidth: 200,
          },
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      {...rest}
    />
  );
};

export const Selectable: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const onSelect = useCallback(
    (rows, state) =>
      action(
        `Selected rows: ${JSON.stringify(rows)}, Table state: ${JSON.stringify(
          state,
        )}`,
      )(),
    [],
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'Description',
            accessor: 'description',
            maxWidth: 200,
          },
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      isSelectable={true}
      onSelect={onSelect}
      {...rest}
    />
  );
};

Selectable.args = { isSelectable: true };

export const Sortable: Story<TableProps> = (args) => {
  const { columns, data, isSortable, ...rest } = args;
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const onSort = useCallback(
    (state) => action(`Sort changed. Table state: ${JSON.stringify(state)}`)(),
    [],
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'Description Not Sortable',
            accessor: 'description',
            maxWidth: 200,
            disableSortBy: true,
          },
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name3', description: 'Description3' },
      { name: 'Name2', description: 'Description2' },
    ],
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      isSortable={isSortable}
      onSort={onSort}
      {...rest}
    />
  );
};

Sortable.args = {
  data: [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name3', description: 'Description3' },
    { name: 'Name2', description: 'Description2' },
  ],
  isSortable: true,
};

export const Filters: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;
  type TableStoryDataType = {
    index: number;
    name: string;
    description: string;
    ids: number[];
    date: Date;
  };

  const translatedLabels = useMemo(
    () => ({
      filter: 'Filter',
      clear: 'Clear',
      from: 'From',
      to: 'To',
    }),
    [],
  );

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-us', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    [],
  );

  const formatDate = useCallback(
    (date: Date) => {
      return formatter.format(date);
    },
    [formatter],
  );

  const tableColumns = useMemo(
    (): Column[] => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'index',
            Header: '#',
            accessor: 'index',
            width: 80,
            fieldType: 'number',
            Filter: tableFilters.NumberRangeFilter(translatedLabels),
            filter: 'between',
          },
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
            fieldType: 'text',
            Filter: tableFilters.TextFilter(translatedLabels),
          },
          {
            id: 'description',
            Header: 'Description',
            accessor: 'description',
            fieldType: 'text',
            Filter: tableFilters.TextFilter(translatedLabels),
            maxWidth: 200,
          },
          {
            id: 'ids',
            Header: 'IDs (enter one of the IDs in the filter)',
            accessor: 'ids',
            Cell: (props: CellProps<TableStoryDataType>) => {
              return props.row.original.ids.join(', ');
            },
            Filter: tableFilters.TextFilter(translatedLabels),
            filter: 'includes',
          },
          {
            id: 'date',
            Header: 'Date',
            accessor: 'date',
            Cell: (props: CellProps<TableStoryDataType>) => {
              return formatDate(props.row.original.date);
            },
            Filter: tableFilters.DateRangeFilter({
              translatedLabels,
            }),
            filter: 'betweenDate',
          },
        ],
      },
    ],
    [formatDate, translatedLabels],
  );

  const tableData = useMemo(
    () => [
      { index: 1, name: 'Name1', description: 'Description1', ids: ['1'] },
      {
        index: 2,
        name: 'Name2',
        description: 'Description2',
        ids: ['2', '3', '4'],
      },
      { index: 3, name: 'Name3', description: 'Description3', ids: ['3', '4'] },
    ],
    [],
  );

  const onFilter = React.useCallback(
    (filters: TableFilterValue<TableStoryDataType>[], state: TableState) => {
      action(
        `Filter changed. Filters: ${JSON.stringify(
          filters,
        )}, State: ${JSON.stringify(state)}`,
      )();
    },
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      onFilter={onFilter}
      {...rest}
    />
  );
};

Filters.args = {
  data: [
    {
      index: 1,
      name: 'Name1',
      description: 'Description1',
      ids: ['1'],
      date: new Date('May 1, 2021'),
    },
    {
      index: 2,
      name: 'Name2',
      description: 'Description2',
      ids: ['2', '3', '4'],
      date: new Date('May 2, 2021'),
    },
    {
      index: 3,
      name: 'Name3',
      description: 'Description3',
      ids: ['3', '4'],
      date: new Date('May 3, 2021'),
    },
  ],
  emptyFilteredTableContent: 'No results found. Clear or try another filter.',
};

export const ExpandableSubcomponent: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;

  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();
  const onExpand = useCallback(
    (state) => action(`Expanded. Table state: ${JSON.stringify(state)}`)(),
    [],
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'expander',
            Cell: (props: CellProps<{ name: string; description: string }>) => (
              <IconButton
                styleType='borderless'
                size='small'
                onClick={() => {
                  props.row.toggleRowExpanded();
                }}
              >
                {props.row.isExpanded ? (
                  <SvgChevronDown />
                ) : (
                  <SvgChevronRight />
                )}
              </IconButton>
            ),
            cellClassName: 'iui-slot',
            width: 60,
          },
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'Description',
            accessor: 'description',
            maxWidth: 200,
          },
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  const expandedSubComponent = useCallback(
    (row) => (
      <div style={{ padding: 16 }}>
        <Leading>Extra information</Leading>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      subComponent={expandedSubComponent}
      onExpand={onExpand}
      {...rest}
    />
  );
};

ExpandableSubcomponent.args = {
  data: [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Description3' },
  ],
  isSelectable: true,
};

ExpandableSubcomponent.parameters = {
  creevey: {
    tests: {
      async open() {
        const closed = await this.takeScreenshot();
        const table = await this.browser.findElement({
          css: '.iui-table',
        });

        const expanderButtons = await table.findElements({
          css: '.iui-button',
        });
        await expanderButtons[0].click();
        await expanderButtons[2].click();

        const expanded = await this.takeScreenshot();
        await this.expect({ closed, expanded }).to.matchImages();
      },
    },
  } as CreeveyStoryParams,
};

export const ExpandableSubrows: Story<TableProps> = (args) => {
  type TableDataType = {
    name: string;
    description: string;
    subRows: TableDataType[];
  };
  const { data, ...rest } = args;

  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();
  const onExpand = useCallback(
    (state) => action(`Expanded. Table state: ${JSON.stringify(state)}`)(),
    [],
  );

  const tableColumns = useMemo<Column<TableDataType>[]>(
    () => [
      {
        id: 'expander',
        Header: 'Name',
        Cell: (props: CellProps<TableDataType>) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: props.row.depth * 20,
            }}
          >
            {props.row.canExpand && (
              <IconButton
                style={{ position: 'absolute' }}
                styleType='borderless'
                size='small'
                onClick={() => {
                  props.row.toggleRowExpanded();
                }}
              >
                {props.row.isExpanded ? (
                  <SvgChevronDown />
                ) : (
                  <SvgChevronRight />
                )}
              </IconButton>
            )}
            <div style={{ marginLeft: 32 }}>{props.row.original.name}</div>
          </div>
        ),
        maxWidth: 400,
        minWidth: 400,
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
      },
      {
        id: 'click-me',
        Header: 'Click',
        maxWidth: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <a className='iui-anchor' onClick={onClick}>
              Click me!
            </a>
          );
        },
      },
    ],
    [],
  );

  const tableColumnsWithHeaders = useMemo<Column<TableDataType>[]>(
    () => [
      {
        Header: 'Table',
        columns: tableColumns,
      },
    ],
    [tableColumns],
  );

  return (
    <Table
      {...rest}
      columns={tableColumnsWithHeaders}
      data={data}
      emptyTableContent='No data.'
      onExpand={onExpand}
    />
  );
};

ExpandableSubrows.args = {
  data: [
    {
      name: 'Row 1',
      description: 'Description 1',
      subRows: [
        { name: 'Row 1.1', description: 'Description 1.1', subRows: [] },
        {
          name: 'Row 1.2',
          description: 'Description 1.2',
          subRows: [
            {
              name: 'Row 1.2.1',
              description: 'Description 1.2.1',
              subRows: [],
            },
            {
              name: 'Row 1.2.2',
              description: 'Description 1.2.2',
              subRows: [],
            },
            {
              name: 'Row 1.2.3',
              description: 'Description 1.2.3',
              subRows: [],
            },
            {
              name: 'Row 1.2.4',
              description: 'Description 1.2.4',
              subRows: [],
            },
          ],
        },
        { name: 'Row 1.3', description: 'Description 1.3', subRows: [] },
        { name: 'Row 1.4', description: 'Description 1.4', subRows: [] },
      ],
    },
    {
      name: 'Row 2',
      description: 'Description 2',
      subRows: [
        { name: 'Row 2.1', description: 'Description 2.1', subRows: [] },
        { name: 'Row 2.2', description: 'Description 2.2', subRows: [] },
        { name: 'Row 2.3', description: 'Description 2.3', subRows: [] },
      ],
    },
    { name: 'Row 3', description: 'Description 3', subRows: [] },
  ],
};
ExpandableSubrows.parameters = {
  creevey: {
    tests: {
      async open() {
        const closed = await this.takeScreenshot();
        const table = await this.browser.findElement({
          css: '.iui-table',
        });

        let expanderButtons = await table.findElements({
          css: '.iui-button',
        });
        await expanderButtons[0].click();
        expanderButtons = await table.findElements({
          css: '.iui-button',
        });
        await expanderButtons[1].click();

        const expanded = await this.takeScreenshot();
        await this.expect({ closed, expanded }).to.matchImages();
      },
    },
  } as CreeveyStoryParams,
};

export const LazyLoading: Story<TableProps> = (args) => {
  const { columns, ...rest } = args;

  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'Description',
            accessor: 'description',
            maxWidth: 200,
          },
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const generateData = (start: number, end: number) => {
    return [...new Array(end - start)].map((_, index) => ({
      name: `Name${start + index}`,
      description: `Description${start + index}`,
    }));
  };

  const [tableData, setTableData] = useState(() => generateData(0, 100));

  const [isLoading, setIsLoading] = useState(false);

  const onBottomReached = useCallback(() => {
    action('Bottom reached!')();
    setIsLoading(true);
    // Simulating request
    setTimeout(() => {
      setTableData(() => [
        ...tableData,
        ...generateData(tableData.length, tableData.length + 100),
      ]);
      setIsLoading(false);
    }, 1000);
  }, [tableData]);

  return (
    <Table
      columns={columns || tableColumns}
      emptyTableContent='No data.'
      onBottomReached={onBottomReached}
      isLoading={isLoading}
      {...rest}
      data={tableData}
    />
  );
};

LazyLoading.argTypes = {
  data: { control: { disable: true } },
  isLoading: { control: { disable: true } },
};

export const RowInViewport: Story<TableProps> = (args) => {
  const { columns, ...rest } = args;

  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'Description',
            accessor: 'description',
            maxWidth: 200,
          },
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
    () =>
      [...new Array(100)].map((_, index) => ({
        name: `Name${index}`,
        description: `Description${index}`,
      })),
    [],
  );

  const onRowInViewport = useCallback((rowData) => {
    action(`Row in view: ${JSON.stringify(rowData)}`)();
  }, []);

  return (
    <>
      <div>
        Demo of <Code>IntersectionObserver</Code> hook that triggers{' '}
        <Code>onRowInViewport</Code> callback once the row is visible.
      </div>
      <div>
        Open{' '}
        <a
          className='iui-anchor'
          onClick={() =>
            parent.document.getElementById('tabbutton-actions')?.click()
          }
        >
          Actions
        </a>{' '}
        tab to see when callback is called and scroll the table.
      </div>
      <br />
      <Table
        columns={columns || tableColumns}
        emptyTableContent='No data.'
        onRowInViewport={onRowInViewport}
        {...rest}
        data={tableData}
      />
    </>
  );
};

RowInViewport.argTypes = {
  data: { control: { disable: true } },
};

export const Loading: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'Description',
            accessor: 'description',
            maxWidth: 200,
          },
        ],
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || []}
      isLoading={true}
      emptyTableContent='No data.'
      {...rest}
    />
  );
};

Loading.args = {
  data: [],
  isLoading: true,
};

export const NoData: Story<TableProps> = ({ columns, data, ...rest }) => {
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'Description',
            accessor: 'description',
            maxWidth: 200,
          },
        ],
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || []}
      isLoading={false}
      emptyTableContent='No data.'
      {...rest}
    />
  );
};

NoData.args = {
  data: [],
};

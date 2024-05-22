import * as React from "react";
import ReactDOM from "react-dom/client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const defaultData = [
  {
    Name: "Test data provider 1",
    Country: "Romania",
    Website: "https://google.com",
    Type: "Institutional",
    "Requirement groups": ["Atmosphere", "Cryosphere", "Hidrology"],
  },
  {
    Name: "Test data provider 2",
    Country: "Romania",
    Website: "https://yahoo.com",
    Type: "Institutional",
    "Requirement groups": ["Atmosphere", "Cryosphere"],
  },
  {
    Name: "Test data provider 3",
    Country: "France",
    Website: "https://yahoo.com",
    Type: "Institutional",
    "Requirement groups": ["Atmosphere"],
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("Name", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Country", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Website", {
    cell: (info) => <a href={info.getValue()}>{info.getValue()}</a>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Type", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Requirement groups", {
    cell: (info) => (
      <>
        {info.getValue().map((item) => (
          <>
            <span>{item} ZZZZ</span>
            <br />
          </>
        ))}
      </>
    ),
    footer: (info) => info.column.id,
  }),
];

function App() {
  const [data, _setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
}
export default App;

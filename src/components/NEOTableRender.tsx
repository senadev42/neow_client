import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { prepareData } from "../utils/tableutils";
import { NearEarthObject, NearEarthObjectsData } from "../types/neotypes";
import { useMemo } from "react";

export const NEOTableRender = ({ data }: { data: NearEarthObjectsData }) => {
  // Memoize the prepareData function call
  const preparedData = useMemo(() => prepareData(data), [data]);

  const columnHelper = createColumnHelper<NearEarthObject>();

  //columns + row transforming
  const columns = [
    columnHelper.accessor(
      (row: NearEarthObject) =>
        row.close_approach_data[0].close_approach_date_full,
      {
        id: "time",
        header: "Time",
      }
    ),
    columnHelper.accessor("name", {
      id: "name",
      header: "Asteroid Name",
    }),
    columnHelper.accessor(
      (row: NearEarthObject) =>
        row.is_potentially_hazardous_asteroid ? "Yes" : "No",
      {
        id: "potentialHazard",
        header: "Potential Hazard",
      }
    ),
    columnHelper.accessor(
      (row: NearEarthObject) =>
        Math.round(row.estimated_diameter.meters.estimated_diameter_max) +
        " meters",
      {
        id: "estimatedDiameter",
        header: "Estimated Diameter",
      }
    ),
    columnHelper.accessor(
      (row: NearEarthObject) =>
        Math.round(
          parseFloat(row.close_approach_data[0].miss_distance.kilometers)
        ).toLocaleString() + " km",
      {
        id: "missDistance",
        header: "Miss Distance",
      }
    ),
    columnHelper.accessor(
      (row: NearEarthObject) =>
        Math.round(
          parseFloat(
            row.close_approach_data[0].relative_velocity.kilometers_per_hour
          )
        ).toLocaleString() + " km/hr",
      {
        id: "velocity",
        header: "Velocity",
      }
    ),

    columnHelper.accessor((row: NearEarthObject) => row.id, {
      id: "note",
      header: "Note",
      cell: (cell) => {
        const { row } = cell;
        const note = localStorage.getItem(`note_${row.original.id}`);
        return (
          <input
            type="text"
            defaultValue={note || ""}
            className="w-full"
            onChange={(e) => {
              localStorage.setItem(`note_${row.original.id}`, e.target.value);
            }}
          />
        );
      },
    }),
  ];

  const table = useReactTable({
    data: preparedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
  });

  return (
    <div>
      {/* the table itself */}
      <div >
      <table className="md:min-w-full divide-y divide-gray-200 md:px-16">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-2 md:px-6 py-3 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2 md:px-6 md:py-2 md:whitespace-nowrap text-right text-xs md:text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      {/*  pagination controls */}
      <div className="flex justify-around p-4 text-sm mt-5">
        {/* Jump to controls */}
        <div className="flex items-center gap-x-4">
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        {/* button controls */}
        <div className="space-x-2">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-3 rounded-md"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-3 rounded-md"
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-3 rounded-md"
          >
            {">"}
          </button>
          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-3 rounded-md"
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

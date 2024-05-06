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
        ) + " km",
      {
        id: "missDistance",
        header: "Miss Distance (Kilometers)",
      }
    ),
    columnHelper.accessor(
      (row: NearEarthObject) =>
        Math.round(
          parseFloat(
            row.close_approach_data[0].relative_velocity.kilometers_per_hour
          )
        ) + " km/hr",
      {
        id: "velocity",
        header: "Velocity (Kilometers/Hour)",
      }
    ),
  ];

  const table = useReactTable({
    data: preparedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
  });

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                <td key={cell.id} className="px-6 py-2 whitespace-nowrap w-36">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/*  pagination controls */}
      <div className="flex justify-around p-4">

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

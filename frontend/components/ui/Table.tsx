import { ReactNode } from "react";
import { classNames } from "@/lib/utils";

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export default function Table<T extends { id: string }>({
  columns,
  rows,
  empty = "No records yet.",
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: string;
}) {
  return (
    <div className="overflow-x-auto border border-ivory/10">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-brass/10 border-b border-brass/30">
            {columns.map((c) => (
              <th
                key={c.key}
                className={classNames(
                  "px-5 py-4 font-satoshi text-[11px] font-bold tracking-[0.2em] uppercase text-brass",
                  c.className
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-10 text-center font-satoshi text-sm text-ivory/40"
              >
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={row.id}
                className={classNames("border-b border-ivory/5", i % 2 === 1 ? "bg-charcoal/50" : "")}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={classNames("px-5 py-4 font-satoshi text-sm text-ivory/80", c.className)}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

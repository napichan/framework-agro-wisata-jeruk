export type ExcelCell = string | number;

type ExcelOptions = {
  /** Indeks kolom (0-based) yang diformat sebagai rupiah. */
  currencyColumns?: number[];
  /** Lebar kolom dalam karakter, urut sesuai kolom. */
  columnWidths?: number[];
};

/**
 * Unduh data sebagai file Excel (.xlsx) asli, bukan CSV yang diganti ekstensi.
 * Hanya dipakai di komponen client (dipicu klik tombol).
 */
export async function downloadExcel(
  filename: string,
  sheetName: string,
  header: string[],
  rows: ExcelCell[][],
  options: ExcelOptions = {},
): Promise<void> {
  const { utils, writeFileXLSX } = await import("./xlsx-write");

  const sheet = utils.aoa_to_sheet([header, ...rows]);

  if (options.columnWidths) {
    sheet["!cols"] = options.columnWidths.map((wch) => ({ wch }));
  }

  for (const column of options.currencyColumns ?? []) {
    for (let row = 2; row <= rows.length + 1; row++) {
      const cell = sheet[utils.encode_cell({ r: row - 1, c: column })];
      if (cell && cell.t === "n") cell.z = '"Rp"#,##0';
    }
  }

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, sheet, sheetName);
  writeFileXLSX(workbook, filename);
}

// Wrapper tipis agar bundler hanya menyertakan fungsi SheetJS yang dipakai
// saat dynamic import (rekomendasi resmi SheetJS untuk framework/bundler).
import { utils, writeFileXLSX } from "xlsx";

export { utils, writeFileXLSX };

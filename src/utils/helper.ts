function formatFileSize(size: number): string {
  const i: number = Math.floor(Math.log(size) / Math.log(1024));

  return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

export { formatFileSize };
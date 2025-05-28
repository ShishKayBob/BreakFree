export const getNextMonthNames = (n: number): string[] => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const startIndex = today.getMonth(); // 0-based index

  const result: string[] = [];

  for (let i = 0; i < n; i++) {
    const monthIndex = (startIndex + i) % 12;
    result.push(monthNames[monthIndex]);
  }

  return result;
}
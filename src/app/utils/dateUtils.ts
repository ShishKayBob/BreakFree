export const getNextMonthNames = (n: number): string[] => {
   const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const result: string[] = [];

  let currentMonth = today.getMonth(); // 0-indexed
  let currentYear = today.getFullYear();

  for (let i = 0; i < n; i++) {
    const monthIndex = (currentMonth + i) % 12;
    const yearOffset = Math.floor((currentMonth + i) / 12);
    const year = currentYear + yearOffset;

    result.push(`${monthNames[monthIndex]} ${year}`);
  }

  return result;
}
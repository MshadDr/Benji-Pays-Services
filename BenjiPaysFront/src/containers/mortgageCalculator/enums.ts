export const selectItems: { value: string; label: string }[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'accelerated-bi-weekly', label: 'Accelerated Bi-weekly' }]

export const amortizationOptions = Array.from({ length: 30 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `${i + 1}-year`,
}));
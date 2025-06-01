export function getColor(category: string) {
  switch (category.toLowerCase()) {
    case 'technical': return 'bg-blue-200';
    case 'billing': return 'bg-green-200';
    case 'general': return 'bg-yellow-200';
    default: return 'bg-gray-200';
  }
}
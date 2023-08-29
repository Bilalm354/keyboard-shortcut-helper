export function convertToWords(input: string): string {
  const words = input.replace(/([a-z])([A-Z])/g, '$1 $2');
    
  const parts = words.split('.').map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
    
  return parts.join(' ').trim();
}

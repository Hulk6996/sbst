import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

function decodeFields(encoded, translations) {
    const decodedList = []; 
    const uniqueIds = new Set(); 

    for (const item of encoded) {
      const decodedItem = {}; 

      for (const key in item) {
        const value = item[key];

        if (key.endsWith('Id') && translations[value] !== undefined) {
          const decodedValue = translations[value]; 
          decodedItem[key] = decodedValue; 
          uniqueIds.add(value); 
        } else {
          decodedItem[key] = value; 
        }
      }
  
      decodedList.push(decodedItem); 
    }
  
    return [decodedList, Array.from(uniqueIds)];
  }
  

  const [decodedData, uniqueIds] = decodeFields(encoded, translations);
  
  console.log("Раскодированные данные:");
  console.log(decodedData);
  console.log("\nУникальные id:");
  console.log(uniqueIds);
  
  



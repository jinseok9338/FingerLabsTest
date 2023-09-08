

import axios from "axios"
import fs from "fs"


const BATCH_SIZE = 50;



const fetchTecha = async () => {
    let techaDataJson = [];
    
    for (let i = 0; i < 1000; i += BATCH_SIZE) {
      const techaPromises = [];
      
      for (let j = i; j < i + BATCH_SIZE; j++) {
        const promise = axios.get(`https://planet-miya.sunmiya.club/techa/${j}.json`)
          .then(response => response.data);
        techaPromises.push(promise);
      }
  

      try {
        const newBatch = await Promise.all(techaPromises);
        techaDataJson = [...techaDataJson, ...newBatch];
      } catch (error) {
        console.error('An error occurred while fetching a batch:', error);
        // Handle error appropriately
      }
    }
    
    return techaDataJson;
  };





fetchTecha()
  .then(data => {
    const tsCode = `// src/data/index.ts
import { Techa } from "../types/techa";

export const techaData: Techa[] = ${JSON.stringify(data, null, 2)};
`;
    return fs.promises.writeFile('src/data/index.ts', tsCode);
  })
  .then(() => {
    console.log('Data successfully written to src/data/index.ts');
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });



import axios from "axios"
import fs from "fs"

// fetch data url and return data and write in the src/data/index.ts

//from 0 to 1000
//fetch data from https://planet-miya.sunmiya.club/techa/{index}.json
// and make it into array of Techa






const BATCH_SIZE = 50;


const MAX_RETRIES = 3;


const fetchTecha = async () => {
    let techaDataJson = [];
    
    for (let i = 0; i < 1000; i += BATCH_SIZE) {
      const techaPromises = [];
      
      for (let j = i; j < i + BATCH_SIZE; j++) {
        const promise = axios.get(`https://planet-miya.sunmiya.club/techa/${j}.json`)
          .then(response => response.data);
        techaPromises.push(promise);
      }
  
      // Wait for all promises in the current batch to resolve
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


// write in the src/data/index.ts


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

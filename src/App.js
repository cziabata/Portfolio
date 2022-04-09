import React from "react";
import './App.css';

const palindrom = word => {
  let newWord = word.toLowerCase().split("").reverse().join("");
  if (word === newWord) return "true"
  else return "false"
}

/* 
Функція chooseOptimalDistance приймає параметри:
sumMax (максимальна сума відстаней, ціле число >= 0),
numberOfCities (кількість міст, які потрібно відвідати, numberOfCities >= 1),
distancesBeetweenCities (список відстаней, всі відстані є додатними або нульовими цілими числами, і цей список містить принаймні один елемент). 

Функція повертає "найкращу" суму, тобто найбільшу можливу суму k відстаней, менших або рівних заданій межі t, якщо ця сума існує, або якщо не існує - null. 
Примітка: не змінюйте змінну ls. 
*/

const errorLog = "sumMax >= 0; numberOfCities >= 1; distancesBeetweenCities = arr[], arr.length >= 1, arr elements must be positive numbers or 0"

const chooseOptimalDistance = (sumMax, numberOfCities, distancesBeetweenCities) => {
  let bestWay = "null";
  if (numberOfCities>=1 && distancesBeetweenCities.length !==0) {
    if (distancesBeetweenCities.length === 1 && numberOfCities === 1) {
      const checkDistance = distancesBeetweenCities.reduce((prev, curr)=>prev+curr); // get sum of the distances
      if (checkDistance <= sumMax) { 
        bestWay = checkDistance;
        return bestWay;
      }
    } else if (distancesBeetweenCities.length > 1 && numberOfCities > 1) {
      const getSumsOfAllUniqDists = (distancesBeetweenCities, numberOfCities) => {
        const res = new Set();
        if (numberOfCities === 0) res.add([]);
        else {
          for (const pc of getSumsOfAllUniqDists(distancesBeetweenCities, numberOfCities - 1)) {
            for (const e of distancesBeetweenCities) {
              if (pc.indexOf(e) !== -1) break;
              res.add([e, ...pc].sort((a, b) => a - b));
            }
          }
        }
        return res;
      }
      
      console.log([...getSumsOfAllUniqDists([1, 2, 3, 4, 5], 3)].map(e => [e, e.reduce((a, b) => a + b, 0)]));
    }
    return bestWay > 0 && bestWay !== false ? bestWay : "null" 
  } else {
    return `Pass correct data: ${errorLog}`
  }
}


function App() {
  return (
    <div className="App">
      <div><b> - App</b></div>
      <div><span><b> - chooseOptimalDistance function:</b>  </span> {chooseOptimalDistance(99, 2,  [100, 7])}</div>
      <div><span><b> - palindrom function:</b>  </span> {palindrom("abba")}</div>
    </div>
  );
}

export default App;

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
    } else if (distancesBeetweenCities.length > 1 && numberOfCities >= 1) {
      const getSumsOfAllUniqDists = (distancesBeetweenCities, numberOfCities) => {
        const newDistSum = new Set();
        if (numberOfCities === 0) newDistSum.add([]);
        else {
          for (const item of getSumsOfAllUniqDists(distancesBeetweenCities, numberOfCities - 1)) {
            for (const dist of distancesBeetweenCities) {
              if (item.indexOf(dist) !== -1) break;
              newDistSum.add([dist, ...item].sort((a, b) => a - b));
            }
          }
        }
        return newDistSum;
      }
      
      let distVariants = [...getSumsOfAllUniqDists(distancesBeetweenCities, numberOfCities)].map(
        e => [e, e.reduce((a, b) => a + b, 0)]); // get unique arrays with distations 
      let distSums = [...distVariants.map(variant=> {return variant[1]})]; // get sums of unique distations
      let filteredDistSums = distSums.filter(distSum => distSum <= sumMax)
      if(filteredDistSums.length > 0) {
        bestWay = Math.max(...filteredDistSums);
        return bestWay;
      }
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
      <div><span><b> - chooseOptimalDistance function:</b>  </span> {chooseOptimalDistance(50, 1,  [8, 7, 8, 15, 14, 63])}</div>
      <div><span><b> - palindrom function:</b>  </span> {palindrom("abba")}</div>
    </div>
  );
}

export default App;

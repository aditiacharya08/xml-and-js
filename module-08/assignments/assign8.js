const timeout = (ms) =>  new Promise((resolve) => {
    setTimeout(() => {
    resolve();
  }, ms);
});

const generateRandomNumber = () =>  Math.floor(Math.random() * 40);

const generateData = async() => {
  await timeout(1000)
  return Array.from({ length: 20 }, generateRandomNumber);
}

const convertToFeet = async(meters) => {
  const feet = meters * 3.2808;
  await timeout(3500)
  return feet
}

const processData = async (data) => {
  data.map(async (value) => {
    return convertToFeet(value);
  });
}

const logResult = async (meters, feet) => {
  console.log(`Converted ${meters}m to ${feet}ft`);
}

const main = async() => {
  console.log("Start");
  const data = await generateData();
    for(let i = 0; i < data.length; i++){
        const a = data[i];
        const result = await convertToFeet(a);
        logResult(a, result);
    }
    
    console.log("Finish");
}
main();
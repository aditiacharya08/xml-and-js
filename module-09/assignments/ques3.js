const func1 = new Promise((resolve) => resolve(`func1`));
const func2 = new Promise((resolve) => resolve(`func2`));
const func3 = new Promise((resolve) => resolve(`func3`));

  const problem3 = async () => {
    const all_response = await Promise.all([func1, func2, func3]);
    console.log(all_response);
  };

problem3();
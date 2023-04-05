function Problem5(...inputArgs) {
    return new Promise((resolveAction, rejectAction) => {
    if (inputArgs.length > 0) {
    resolveAction(inputArgs);
    } else {
    rejectAction('No inputArgs provided!');
    }
    });
    }
    
    async function ProcessData() {
    try {
    const outcome = await Problem5(5, 10, 15, 20);
    console.log(outcome);
    } catch (failure) {
    console.error(failure);
    }
    }
    
    ProcessData();
  
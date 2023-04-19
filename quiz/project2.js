const getResults = () => {
    fetch(
      `https://api.fda.gov/drug/drugsfda.json?&limit=20`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = document.getElementById("results");
        list.innerHTML = "";
        data.results.map((item) => {
          if(item.openfda){
            const html = `
            <div class="card">
              <h2 class="drug_name">${item.openfda.generic_name}</h2>
              <h3>Drug details:</h3>            
              <h4>Manufacturers:</h4>
              ${getItemsFromArray(item.openfda.manufacturer_name)}
              <h4>Type of Drug:</h4>
              <p>${item.openfda.product_type}</p>
              <h4>Substance Name:</h4>
              <p>${item.openfda.substance_name}</p>
              ${item.products ? `<h4>Products:</h4>
              ${getItemsFromArray(item.products,"brand_name")}` : ""}
            </div>
              `;
 
          list.insertAdjacentHTML("beforeend", html);
          }
        });
      });
  };
  
  getResults("title");

  const getItemsFromArray = (arr,key = "")=> {
    let items = ``;
    arr.forEach((el)=>{
        key ? items += `<li>${el[key]}</li>` :
        items += `<li>${el}</li>`
    })
    return `<ul>${items}</ul>`
  }
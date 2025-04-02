import { endpoint } from "../utils/sec";

export async function getItemsApi(data) {
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    let response = await fetch(`${endpoint.main}/pricelist`, options);
    let result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function setItemsApi(data, currency, cookie, isALocalRef) {
  try {
    let dataArr = [];
    let dataObj = {};
    console.log(currency);

    data.forEach((item) => {
      if (isALocalRef) {
        dataObj = {
          cookie,
          method: "PATCH",
          itemCode: item.unit,
          routeParams: `Items('${item.unit}')`,
          content: {
            ItemPrices: [
              {
                PriceList: 1,
                BasePriceList: -1,
                Factor: parseFloat(item.markup),
              },
            ],
          },
        };

        dataArr.push(dataObj);
      } else {
        switch (currency) {
          case "usd":
            dataObj = {
              cookie,
              method: "PATCH",
              itemCode: item.unit,
              routeParams: `Items('${item.unit}')`,
              content: {
                ItemPrices: [
                  {
                    PriceList: 6,
                    BasePriceList: 6,
                    Currency: "USD",
                    Factor: 1,
                    Price: parseFloat(item.price),
                  },
                  {
                    PriceList: 1,
                    BasePriceList: 6,
                    Currency: "USD",
                    Factor: parseFloat(item.markup),
                    Price: parseFloat(item.updatedPrice),
                  },
                ],
              },
            };
            break;
          case "dop": {
            dataObj = {
              cookie,
              method: "PATCH",
              itemCode: item.unit,
              routeParams: `Items('${item.unit}')`,
              content: {
                ItemPrices: [],
              },
            };

            console.log(item);
            dataObj.content.ItemPrices.push({
              PriceList: 1,
              BasePriceList: 3,
              Currency: "DOP",
              Factor: parseFloat(item.markup),
              Price: parseFloat(item.updatedPrice),
            });
          }
          default:
            break;
        }
        dataArr.push(dataObj);
      }
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataArr),
    };

    console.log(dataArr);

    const res = await fetch(`${endpoint.main}/pricelist/update`, options);
    const result = await res.json();

    console.log(result);
    if (result.error) throw new Error(JSON.stringify(result));

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

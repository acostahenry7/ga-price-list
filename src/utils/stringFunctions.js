function getCompanyName(key) {
  let companyName = "";

  switch (key) {
    case "DB_LM":
      companyName = "Lasa Motors";
      break;
    case "DB_MP":
      companyName = "Motoplex";
      break;
    case "DB_AA":
      companyName = "Avant Auto";
      break;
    case "DB_GA":
      companyName = "Gar 210";
      break;
    case "DB_KI":
      companyName = "KTM Import";
      break;
    case "DB_CL":
      companyName = "CycleLab";
      break;
    case "DB_CF":
      companyName = "Clutch Food";
      break;
    case "DB_AA_TEST":
      companyName = "DMS PRUEBA (Avant Auto)";
      break;
    default:
      companyName = "DMS PRUEBA (Avant Auto)";
      break;
  }

  return companyName;
}

function addQueryParams(url, params) {
  url = url + "?";

  Object.entries(params).forEach((param, index) => {
    url += `${param[0]}=${param[1]}${
      index != Object.entries(params).length - 1 ? "&" : ""
    }`;
  });

  return url;
}

export { getCompanyName, addQueryParams };

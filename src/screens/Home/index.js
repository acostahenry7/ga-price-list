import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { getItemsApi } from "../../api/priceList";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getItemsFromRes } from "../../utils/getResArray";
import "./Home.css";

export default function Home(props) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { data, setData } = props;
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

  const [searchToggle, setSearchToggle] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      name: "Artículo",
      selector: (row) => row.unit,
      sortable: true,
      selectable: true,
      reorder: true,
    },
    {
      name: "Embarque",
      selector: (row) => row.shipment,
      sortable: true,
      reorder: true,
    },
    {
      name: "Precio actual",
      selector: (row) => <b>{`$${row.price} ${row.currency || "USD"}`}</b>,
      sortable: true,
      reorder: true,
    },
    // {
    //   name: "Acciones",
    //   selector: (row) => row.price,
    //   sortable: true,
    //   reorder: true,
    // },
  ];

  const handleSubmit = (e) => {
    console.log("hi");
    e.preventDefault();
    setSearchToggle(!searchToggle);
  };

  useEffect(() => {
    (async () => {
      props.setSearchField("all");
      props.setSearchValue("");
      // await requestApi();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await requestApi();
    })();
  }, [searchToggle]);

  async function requestApi() {
    try {
      setIsLoading(true);

      let response = await getItemsApi({
        field: props.searchField,
        value: props.searchValue,
        target: {
          db: auth.userData.companyDB,
          priceList: "1",
        },
      });
      setIsLoading(false);
      if (response.error === true) {
        alert(response.body);
      } else {
        let arr = [];

        if (props.searchField != "all" && response.body.length > 0) {
          setIsUpdateDisabled(false);
        } else {
          setIsUpdateDisabled(true);
        }

        arr = getItemsFromRes(response.body);
        console.log(arr);

        setData(arr);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="container">
      <p>{auth?.userData?.manager}</p>

      <div className="">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="table-header-form shadow-sm rounded">
            <div>
              <select
                className="form-control"
                onChange={(e) => {
                  props.setSearchField(e.target.value);
                  props.setSearchValue("");
                }}
              >
                <option value="all">Todo</option>
                <option value="itemNum">Número Artículo</option>
                <option value="brandCode">Código Marca</option>
                <option value="shipment">Embarque</option>
              </select>
            </div>
            <div>
              <input
                value={props.searchValue}
                onChange={(e) =>
                  props.setSearchValue(e.target.value.toUpperCase())
                }
                className="form-control"
              />
            </div>
            <button className="btn btn-dark" type="submit">
              Buscar
            </button>
            <button
              style={{ marginLeft: 10 }}
              className="btn btn-primary"
              disabled={isUpdateDisabled}
              onClick={() => {
                navigate("/update");
              }}
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
      <div className="mt-5 text-center dt-container">
        <DataTable
          title={"Lista de Articulos"}
          data={data}
          columns={columns}
          filters={["shipment"]}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

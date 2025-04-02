import React, { useEffect, useState } from "react";
import Datatable from "../../components/DataTable";
import UpdatingForm from "../../components/UpdatingForm";
import { Modal } from "../../components/Modal";
import { ItemList } from "../../components/ItemList";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { getItemsFromRes } from "../../utils/getResArray";
import { getItemsApi } from "../../api/priceList";

export default function Update(props) {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [markup, setMarkup] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [res, setRes] = useState({});
  const [isALocalRef, setIsALocalRef] = useState(false);
  const navigate = useNavigate();

  const [columns, setColumns] = useState([
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
      selectable: true,
      reorder: true,
    },
    {
      name: "Último costo liquidado",
      selector: (row) => row.price + " " + row.currency,
      sortable: true,
      selectable: true,
      reorder: true,
      omit: false,
    },
    {
      name: "Precio (Costo * markup)",
      selector: (row) => <b>{row.updatedPrice + " " + row.currency}</b>,
      sortable: true,
      selectable: true,
      reorder: true,
      omit: false,
    },
  ]);

  useEffect(() => {
    (async () => {
      // updateByMarkup(markup, "dop");

      let response = await getItemsApi({
        field: props.searchField,
        value: props.searchValue,
        target: {
          db: auth.userData.companyDB,
          priceList: isALocalRef ? "-1" : "3",
        },
      });
      setIsLoading(false);
      if (response.error === true) {
        alert(response.body);
      } else {
        let arr = [];

        arr = getItemsFromRes(response.body);
        setData(arr);
      }

      setColumns(
        columns.map((column) => {
          if (isALocalRef == true) {
            if (
              column.name == "Embarque" ||
              column.name == "Último costo liquidado" ||
              column.name == "Precio (Costo * markup)"
            ) {
              column.omit = true;
            }
          } else {
            column.omit = false;
          }
          return column;
        })
      );
    })();
  }, [isALocalRef]);

  const updateByMarkup = async (markup, currency) => {
    let newData = [];
    console.log(markup, currency, data, "###");

    data.forEach((item) => {
      if (isALocalRef) {
        newData.push({
          unit: item.unit,
          markup: markup,
        });
      } else {
        newData.push({
          unit: item.unit,
          shipment: item.shipment,
          price: (() => {
            let price = 0;
            if (currency == "dop") {
              if (item.currency == "USD") {
                price = (item.cost * item.rate).toFixed(2);
              } else {
                price = parseFloat(item.cost).toFixed(2);
              }
            } else {
              console.log({
                currency,
                itemCurrency: item.currency,
                cost: item.cost,
                rate: item.rate,
              });
              if (item.currency == "USD") {
                price = item.cost.toFixed(2);
              } else {
                price = (item.cost / parseFloat(item.rate)).toFixed(2);
              }
            }
            return price;
          })(),

          updatedPrice: (() => {
            let price = 0;
            if (currency == "dop") {
              if (item.currency == "USD") {
                price = (
                  parseFloat((item.cost * item.rate).toFixed(2)) * markup
                ).toFixed(2);
              } else {
                price = (item.cost * markup).toFixed(2);
              }
            } else {
              console.log({
                currency,
                itemCurrency: item.currency,
                cost: item.cost,
                markup,
              });
              if (item.currency == "USD") {
                price = (item.cost * markup).toFixed(2);
              } else {
                price = (
                  parseFloat((item.cost / parseFloat(item.rate)).toFixed(2)) *
                  markup
                ).toFixed(2);
              }
            }
            return price;
          })(),
          cost: (() => {
            let price = 0;
            if (currency == "dop") {
              if (item.currency == "USD") {
                price = (item.cost * item.rate).toFixed(2);
              } else {
                price = parseFloat(item.cost).toFixed(2);
              }
            } else {
              console.log({
                currency,
                itemCurrency: item.currency,
                cost: item.cost,
                rate: item.rate,
              });
              if (item.currency == "USD") {
                price = item.cost.toFixed(2);
              } else {
                price = (item.cost / parseFloat(item.rate)).toFixed(2);
              }
            }
            return price;
          })(),
          markup: markup,
          currency: currency?.toUpperCase() || item.currency?.toUpperCase(),
          rate: item.rate,
        });
      }
    });

    console.log(newData);
    setData(newData);
  };

  return (
    <div className="container">
      <UpdatingForm
        data={data}
        updateByMarkup={updateByMarkup}
        markup={markup}
        setMarkup={setMarkup}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setOpenModal={setOpenModal}
        setIsALocalRef={setIsALocalRef}
        isALocalRef={isALocalRef}
        setRes={setRes}
      />
      <div className=" dt-container">
        <Datatable
          title=""
          data={data}
          columns={columns}
          isLoading={isLoading}
        />
      </div>
      {openModal && res && (
        <Modal title="Resumen" setOpenModal={setOpenModal}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ItemList
              title="Artículos no actualizados"
              counter={res.body.fails.length}
            >
              {res.body.fails.map((unit, index) => (
                <li key={index}>{unit}</li>
              ))}
            </ItemList>
            <ItemList
              title="Artículos  actualizados"
              counter={res.body.updated.length}
              incon={<BiCheck />}
            >
              {res.body.updated.map((unit, index) => (
                <li key={index}>{unit}</li>
              ))}
            </ItemList>
          </div>
        </Modal>
      )}
    </div>
  );
}

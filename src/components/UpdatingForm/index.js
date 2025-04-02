import React, { useState } from "react";
import "./UpdatingForm.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import { setItemsApi } from "../../api/priceList";
import useAuth from "../../hooks/useAuth";
import { createTransactionLogApi } from "../../api/log";

export default function UpdatingForm({
  data,
  updateByMarkup,
  markup,
  setMarkup,
  isLoading,
  setIsLoading,
  setOpenModal,
  isALocalRef,
  setIsALocalRef,
  setRes,
}) {
  const [isMarkupAplied, setIsMarkupAplied] = useState(false);
  const [markupValue, setMarkupValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("dop");
  const { auth } = useAuth();

  console.log(currencyValue);

  const handleUpdate = async () => {
    setIsLoading(true);
    console.log("TO API", data, currencyValue);
    let res = await setItemsApi(data, currencyValue, auth.Cookie, isALocalRef);
    await createTransactionLogApi({
      username: auth.userData.UserName,
      comment: `El embarque ${data[0].shipment} fue actualizado con un markup de ${markupValue} en ${currencyValue}`,
      status: "ALLOWED",
      cookie: auth.Cookie,
    });
    setRes(res);
    setIsLoading(false);
    setOpenModal(true);
    setIsMarkupAplied(false);
  };

  return (
    <form className="update-form">
      {
        <div className="update-form_section">
          {/* <div className="update-form_section_title">
            <h5>Moneda</h5>
          </div> */}
          <div className="update-form_section_body">
            <div className="form-group">
              <span>Seleccione una moneda</span>
              <select
                className="form-control"
                value={currencyValue}
                onChange={(e) => setCurrencyValue(e.target.value)}
              >
                <option value="usd">USD - USA Dollar</option>
                <option value="dop">DOP - Dominican Peso</option>
              </select>
            </div>
            {/* <div className="form-group">
              <span>Valor</span>
              <input className="form-control" />
            </div> */}
            {/* <div className="form-group">
              <p></p>
              <span className="btn btn-light search">
                <AiOutlineSearch size={18} />
              </span>
            </div> */}
          </div>
        </div>
      }

      <div className="update-form_section">
        {/* <div className="update-form_section_title">
          <h5 className="">Factor</h5>
        </div> */}
        <div className="update-form_section_body">
          <div className="form-group">
            <span>
              Factor
              {markupValue <= 1 && (
                <span style={{ fontSize: 11, color: "red" }}>
                  {" "}
                  (Debe ser mayor a 1)
                </span>
              )}
            </span>
            <input
              className="form-control"
              placeholder="Ej. 2"
              disabled={isMarkupAplied}
              value={markupValue}
              type="number"
              onChange={(e) => {
                setMarkupValue(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="update-form_section">
        <div className="update-form_section_body">
          <div className="form-group actions">
            {!isMarkupAplied && (
              <button
                disabled={
                  markupValue.length > 0 && markupValue > 1 ? false : true
                }
                onClick={(e) => {
                  e.preventDefault();
                  setMarkup(markupValue);
                  updateByMarkup(markupValue, currencyValue);
                  setIsMarkupAplied(true);
                }}
                className="btn btn-primary"
                style={{ marginRight: 5 }}
              >
                Aplicar Markup
              </button>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                marginLeft: 40,
              }}
            >
              <input
                id="localRef"
                type="checkbox"
                style={{ minWidth: "auto", width: 25, marginBottom: 5 }}
                onChange={(e) => {
                  setIsALocalRef(e.target.checked);
                }}
              />
              <label style={{ margin: 0, fontSize: 14 }} htmlFor="localRef">
                {" "}
                <b>Es una pieza local</b>{" "}
              </label>
            </div>
            {isMarkupAplied && (
              <button
                style={{ marginRight: 5 }}
                onClick={(e) => {
                  e.preventDefault();
                  updateByMarkup(1, "dop");
                  setMarkupValue("");
                  setIsMarkupAplied(false);
                }}
                className="btn btn-danger"
              >
                Cancelar
              </button>
            )}
            {isMarkupAplied && (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await handleUpdate();
                }}
                className="btn btn-success "
              >
                Confirmar
              </button>
            )}
            {isLoading && (
              <Oval
                width={40}
                color="#4cb2f1"
                height={40}
                wrapperClass="loader"
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

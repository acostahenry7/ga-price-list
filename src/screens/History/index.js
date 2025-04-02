import React, { useEffect } from "react";
import Datatable from "../../components/DataTable";
import { getTransactionLogsApi } from "../../api/log";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { app } from "../../utils/sec";

function History({ setToken }) {
  const { auth, logout } = useAuth();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const logs = await getTransactionLogsApi({ cookie: auth.Cookie });
        setIsLoading(false);
        let arr = [];

        logs.body
          .filter((item) => item.U_ApplicationName == app.name)
          .forEach((logItem) => {
            console.log(logItem);
            arr.push({
              username: logItem.U_USER_CODE,
              date: logItem.U_CreateDate,
              host: logItem.U_ClientHost,
              comment: logItem.U_Comment,
              status: logItem.U_EventStatus,
              appName: logItem.U_ApplicationName,
            });

            setData(arr);
          });
      } catch (error) {
        console.log(error.message);
        if (error.message.toLowerCase().includes("invalid session")) {
          navigate("/");
          alert(error.message);
          setToken("");
        }
      }
    })();
  }, []);

  const columns = [
    {
      name: "Fecha",
      selector: (row) => `${row.date.split("T")[0]} ${row.date.split("T")[1]}`,
      sortable: true,
      selectable: true,
      reorder: true,
    },
    {
      name: "Usuario",
      selector: (row) => row.username,
      sortable: true,
      reorder: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.comment,
      sortable: true,
      reorder: true,
    },
    {
      name: "IP Cliente",
      selector: (row) => row.host,
      sortable: true,
      reorder: true,
    },
    {
      name: "Estado",
      selector: (row) =>
        (() => {
          let status = "";

          switch (row.status) {
            case "ALLOWED":
              status = "Permitido";
              break;
            case "DENIED":
              status = "Denegado";
              break;
            default:
              break;
          }

          return status;
        })(),
      sortable: true,
      reorder: true,
    },
  ];

  return (
    <div className="container">
      <Datatable
        columns={columns}
        data={data}
        title="Log de transacciones"
        isLoading={isLoading}
      />
      <span></span>
    </div>
  );
}

export { History };

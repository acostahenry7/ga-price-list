import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { FallingLines } from "react-loader-spinner";

export default function Datatable({
  columns,
  data,
  filters,
  isLoading,
  title,
}) {
  const [filteredText, setFilteredText] = useState("");
  const [selectedItems, setSelectedItems] = useState("setSelectedItems");
  // const filteredData = data.filter((item) =>
  //   filters
  //     ? item[filters[0]] &&
  //       item[filters[0]]
  //         .toString()
  //         .toLowerCase()
  //         .includes(filteredText.toLowerCase())
  //     : item.toString().toLowerCase().includes(filteredText.toLowerCase())
  // );

  const customStyles = {
    table: {
      style: {
        marginTop: 30,
      },
    },

    responsiveWrapper: {
      style: {
        borderRadius: 10,
      },
    },

    headRow: {
      style: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "rgba(33,37,41,0.85)",
        color: "white",
      },
    },

    // headCells: {
    //   style: {
    //     backgroundColor: "#e4231b",
    //     color: "white",
    //   },
    // },
  };

  const SearchComponent = useMemo(() => {
    const handleClear = () => {
      if (filteredText) {
        setFilteredText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilteredText(e.target.value.toUpperCase())}
        onClear={handleClear}
        filterText={filteredText}
      />
    );
  }, [filteredText]);

  const handleSelected = (selected) => {
    setSelectedItems(selected);
    console.log(selected);
  };

  return (
    <DataTable
      title={title || ""}
      className="shadow-sm"
      data={data}
      columns={columns}
      customStyles={customStyles}
      progressPending={isLoading}
      progressComponent={<FallingLines color="grey" />}
      responsive
      //expandableRows
      //subHeader
      subHeaderComponent={SearchComponent}
      pagination
      highlightOnHover
      selectableRowsHighlight
      onColumnOrderChange={(cols) => console.log(cols)}
      onSelectedRowsChange={({ selectedRows }) => handleSelected(selectedRows)}
    />
  );
}

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="search"
      placeholder="Filter"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    {/* <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton> */}
  </>
);

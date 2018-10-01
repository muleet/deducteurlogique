import React from "react";
import ShowTruthTable from "./Components/ShowTruthTable";

const TruthTable = () => {
  return (
    <main className="main-info">
      <div>
        <h2>Table de vérité pour connecteurs binaires</h2>
        <ShowTruthTable />
      </div>
    </main>
  );
};

export default TruthTable;


const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (row: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    
    <table className="table">
      <thead className="thead">
        <tr className="">
          {columns.map((column) => (
            <th key={column.accessor} className={column.className + " font-medium py-2 "}>
              {column.header === "checkbox" ? (
                <div className="inline-flex items-center">
                  <input type="checkbox" name="chkColSelect" />                  
                </div>
              ) : column.header === "..." ? (
                <div className="">
                  <button className="btnIcon relative_ -right_-1" title="Ver acciones para los registros seleccionados">                     
                    <i className="fa-solid fa-caret-down"></i>
                  </button>
                </div>
              ) : column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((row) => renderRow(row))}</tbody>
    </table>
  );
};
export default Table;

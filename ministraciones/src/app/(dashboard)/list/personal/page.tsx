import Table from "@/components/Table";
import { personalData } from "@/Lib/data";

type Personal = {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
};

const columns = [
  /*{
    header: "checkbox",
    accessor: "checkbox",
    className: "w-0 pl-2",
  },*/
  {
    header: "",
    accessor: "actions",
    className: "w-0",
  },

  {
    header: "#",
    accessor: "id",
    className: " min-w-[20px]",
  },
  {
    header: "Nombre",
    accessor: "name",
    className: " min-w-[100px]",
  },
  {
    header: "Correo",
    accessor: "email",
    className: " ",
  },
  {
    header: "Rol",
    accessor: "role",
    className: "",
  },
];

const PersonalListPage = () => {
  const renderRow = (row: any) => {
    return (
      <tr
        key={row.id}
        className="trZebra"
      >
        {/*<td className="flex p-2 items-center gap-2 w-fit">
          <input
            type="checkbox"
            name={"chkRow" + row.id}
            className="w-4 h-4 cursor-pointer  text-menuIcon"
          />
        </td>*/}
        <td className="w-fit">
          <button className="btnTop mr-1" title="Ver opciones">
            <i className="fa-solid fa-ellipsis-vertical px-1 text-menuIcon"></i>
          </button>
        </td>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td className="hover:text-textoLinkHover dark:hover:text-textoGolden1">
          {row.email}
        </td>
        <td>{row.role}</td>
      </tr>
    );
  };
  return (
    <div className="flex overflow-x-auto">
      {/*LIST */}
      <Table columns={columns} renderRow={renderRow} data={personalData} />
    </div>
  );
};

export default PersonalListPage;

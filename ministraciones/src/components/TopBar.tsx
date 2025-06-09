import TitleName from "./elements/TitleName";

const TopBar = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-linear-to-b from-fondoGradienteTopFrom to-fondoGradienteTopTo text-textoBoton1 border-t-1 border-black">
      {/*system name*/}
      <TitleName />
    </div>
  );
};

export default TopBar;

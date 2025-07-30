"use client"
import { useState, useCallback, Children, cloneElement } from "react";
import PropTypes from "prop-types";

const PanelsDragDivider = ({
  initialWidth = 200,
  minWidth = 1,
  maxWidth = 999,
  children,
  className = "",
  dividerClassName = "bg-fondoTablaFilaZebra hover:bg-fondoBoton2Hover transition-colors",
}) => {
  const [leftWidth, setLeftWidth] = useState(initialWidth);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);

      const startX = e.clientX;
      const startWidth = leftWidth;

      const handleMouseMove = (moveEvent) => {
        const newWidth = startWidth + moveEvent.clientX - startX;
        setLeftWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [leftWidth, minWidth, maxWidth]
  );

  // Validamos que tenga exactamente dos hijos
  const [leftPanel, rightPanel] = Children.toArray(children);

  return (
    <div className={`flex flex-row h-full w-full ${className}`}>
      {/* Panel izquierdo con ancho controlado */}
      {cloneElement(leftPanel, {
        style: { ...leftPanel.props.style, width: `${leftWidth}px` },
        className: `flex-shrink-0 ${leftPanel.props.className || ""}`,
      })}

      {/* Divisor */}
      <div
        className={`w-1 cursor-col-resize ${dividerClassName} ${isDragging ? "bg-blue-500" : ""}`}
        onMouseDown={handleMouseDown}
      />

      {/* Panel derecho (flexible) */}
      {cloneElement(rightPanel, {
        className: `flex-1 ${rightPanel.props.className || ""}`,
      })}
    </div>
  );
};

PanelsDragDivider.propTypes = {
  initialWidth: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  dividerClassName: PropTypes.string,
};

export default PanelsDragDivider;
/* Ejemplo de uso:
<PanelsDragDivider initialWidth={1} className="overflow-hidden">
	<div>
		Filtrar por
	</div>
	<DataTableView schema={schema} />
</PanelsDragDivider>
*/
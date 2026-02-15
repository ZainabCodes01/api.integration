
interface DropdownProps {
  position: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  position = "bottom",
  children,
}) => {
  return (
    <div
      className={`dropdown-base z-50 dropdown-${position}`}
    >
      {children}
    </div>
  );
};

export default Dropdown;
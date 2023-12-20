const ButtonComponent = ({ onClick }) => {
  return (
    <button type="button" className="create-button" onClick={onClick}>
      Create New
    </button>
  );
};

export default ButtonComponent;

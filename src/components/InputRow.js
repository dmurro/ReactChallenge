import { useState } from "react";
import { Operators } from "../businessLogic";

function InputRow() {
  const [row, setRow] = useState([]);

  /** Function onClick that adds new object to the row array
   *  with default config properties
   */
  const AddRow = () => {
    const newRow = [...row, { id: row.length, value: "+", input: 0, isEnable: true }];
    setRow(newRow);
  };

  /**
   * Function onChange that get every user digit
   * and populate the row.input object property
   * @param {number} index - index of the row
   * @param {number} input - value of the input
   */
  const handleInput = (index, input) => {
    const newObj = [...row];
    newObj[index].input = input;
    setRow(newObj);
  };

  /**
   * Function onChange that assigns the value of the operator
   * from the html template select options to the row object
   * @param {number} index - index of the row
   * @param {number} input - value of the operator "+" || "-"
   */
  const handleOperation = (index, value) => {
    const newOperation = [...row];
    newOperation[index].value = value;
    setRow(newOperation);
  };

  /**
   * Function on click that handles the state enabled or disabled of the input
   * and assigns a boolean value to the variable isEnable.
   * @param {number} i - id of the row
   */
  const handleIsEnable = (i) => {
    const handleEnable = [...row];
    handleEnable[i].isEnable ? 
    (handleEnable[i].isEnable = false) 
    : 
    (handleEnable[i].isEnable = true);
    setRow(handleEnable);
  };

  /**
   * Function delete a row on click by checking the row id
   * @param {number} id - id of the row
   */
  const handleDelete = (id) => {
    const getRow = [...row];
    getRow.splice(id, 1);
    setRow(getRow);
  };

  const result = Operators(row);

  return (
    <div className="container">
        <button className="container_button" onClick={() => AddRow()}>
          Add Row
        </button>
      <section id="calculator">
        <ul>
          {row.map((row, i) => (
            <li className="row_container" key={row.id}>
              <select onChange={(e) => handleOperation(row.id, e.target.value)} disabled={!row.isEnable}>
                <option>+</option>
                <option>-</option>
              </select>
              <input type="number" onChange={(e) => handleInput(i, e.target.value)}
                    disabled={!row.isEnable}   
                    placeholder="Insert number..."
                    />
              <button className="row_container_button_delete" onClick={() => handleDelete(row.id)} 
                      disabled={!row.isEnable}>
                Delete
              </button>
              <button className="row_container_button_enable" onClick={() => handleIsEnable(i)}>
                {row.isEnable ? "Disable" : "Enable"}
              </button>
              <p className={row.isEnable ? "hidden_warning" : "show_warning"}>
                Warning! This value, won' t be part of the operation!
              </p>
            </li>
          ))}
        </ul>
      </section>
      {/* round the result to a max of 3 decimal digits */}
      <div className="result">Result {result.toFixed(3)}</div> 
    </div>
  );
}

export default InputRow;

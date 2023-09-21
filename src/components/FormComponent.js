import { useState, useEffect, useReducer } from "react";
import uuid from "react-uuid";
import "./FormComponent.css";

const FormComponent = (props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [formValid, setFormValid] = useState(false);

  const inputTitle = (event) => {
    setTitle(event.target.value);
  };

  const inputAmount = (event) => {
    setAmount(event.target.value);
  };

  const saveItem = (event) => {
    event.preventDefault();
    const itemData = {
      id: uuid(),
      title: title,
      amount: Number(amount),
    };

    props.onAddItem(itemData);
    setTitle("");
    setAmount("");
  };

  useEffect(() => {
    const checkData = title.trim().length > 0 && amount !== 0 && amount !== "";
    setFormValid(checkData);
  }, [title, amount]);

  const [showButton, setShowButton] = useState(true);
  const reducer = (state, action) => {
    switch (action.type) {
      case "SHOW":
        return setShowButton(true);
      case "HIDE":
        return setShowButton(false);
      default:
        return setShowButton(true);
    }
  };

  const [result, dispath] = useReducer(reducer, showButton);
  console.log(result);

  return (
    <div>
      <form onSubmit={saveItem}>
        <div className="form-control">
          <label>ชื่อรายการ</label>
          <input
            type="text"
            placeholder="ระบุชื่อรายการของคุณ"
            onChange={inputTitle}
            value={title}
          ></input>
        </div>
        <div className="form-control">
          <label>ชื่อรายการ</label>
          <input
            type="number"
            placeholder="(+ รายรับ, - รายจ่าย)"
            onChange={inputAmount}
            value={amount}
          ></input>
        </div>
        <div>
          {showButton && (
            <button type="submit" className="btn" disabled={!formValid}>
              เพิ่มข้อมูล
            </button>
          )}
        </div>
        <div>
          <h4>ซ่อนปุ่มเพิ่มข้อมูล</h4>
          <button
            type="button"
            className="btn-switch"
            onClick={() => dispath({ type: "SHOW" })}
          >
            เปิด
          </button>
          <button
            type="button"
            className="btn-switch"
            onClick={() => dispath({ type: "HIDE" })}
          >
            ปิด
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;

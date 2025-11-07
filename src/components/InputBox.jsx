import React, { useId, useState } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const bump = (dir) => {
    if (!onAmountChange) return;
    const base = Number(amount) || 0;
    const next = base + dir * 1;
    if (next < 0) {
      onAmountChange("0");
      setError("");
      return;
    }
    onAmountChange(String(next));
    setError("");
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
          {label}
        </label>

        <div className="flex items-center">
          <input
            id={amountInputId}
        
            type="text"
            placeholder="Amount"
            disabled={amountDisable}
            value={amount === "" ? "" : amount}
            className={`outline-none w-full bg-transparent py-1.5 border-b ${
              error ? "border-red-500" : "border-transparent"
            } ${shake ? "animate-[shake_0.3s_linear]" : ""}`}
            onWheel={(e) => e.currentTarget.blur()}
            onChange={(e) => {
              const raw = e.target.value;

        
              if (raw === "") {
                onAmountChange("");
                setError("");
                return;
              }

            
              const validNumber = /^[0-9]*\.?[0-9]*$/;
              if (!validNumber.test(raw)) {
                alert("Only numbers are allowed!");
                onAmountChange("0");
                setError("");
                triggerShake();
                return;
              }

              
              const cleaned = raw.replace(/^0+(?=\d)/, "");

            
              const val = Number(cleaned);
              if (val < 0) {
                onAmountChange("0");
                setError("");
                return;
              }

              
              onAmountChange(cleaned);
              setError("");
            }}
          />

          <div className="flex flex-col ml-2 select-none">
            <button
              type="button"
              className="border rounded px-2 py-1 leading-none"
              disabled={amountDisable}
              onClick={() => bump(+1)}
            >
              +
            </button>
            <button
              type="button"
              className="border rounded px-2 py-1 leading-none mt-1"
              disabled={amountDisable}
              onClick={() => bump(-1)}
            >
              −
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-xs mt-1" aria-live="polite">
            {error}
          </p>
        )}
      </div>

      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => {
            onCurrencyChange && onCurrencyChange(e.target.value);
          }}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

export default InputBox;

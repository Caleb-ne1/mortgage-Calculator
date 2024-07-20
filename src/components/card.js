import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import Calc from "../assets/calc.png";

export function Card() {
    const [amount, setAmount] = useState("");
    const [term, setTerm] = useState("");
    const [rate, setRate] = useState("");
    const [operation, setOperation] = useState("");
    let [total, setTotal] = useState("0.00");
    let [repay, setRepay] = useState("0.00");

    const handleAmount = (event) => setAmount(event.target.value);
    const handleTerm = (event) => setTerm(event.target.value);
    const handleRate = (event) => setRate(event.target.value);
    const handleOperation = (event) => setOperation(event.target.value);

    const calculateMortgage = () => {
        const mortgageAmount = parseFloat(amount);
        const mortgageTerm = parseFloat(term);
        const mortgageRate = parseFloat(rate);

        const monthlyRate = mortgageRate / 12 / 100;
        const numPayments = mortgageTerm * 12;

        if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(mortgageRate)) {
            alert("Please enter valid numbers for amount, term and rate.");
            return;
        }

        let calculatedTotal = "0.00";
        let calculatedRepay = "0.00";
        if (operation == "repayment") {
            calculatedTotal = (
                (mortgageAmount *
                    (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
                (Math.pow(1 + monthlyRate, numPayments) - 1)
            ).toFixed(2);
        } else if ("interest") {
            calculatedRepay = (mortgageAmount * monthlyRate).toFixed(2);
        } else {
            alert("Please select a mortgage type.");
        }
        setTotal(calculatedTotal);
        setRepay(calculatedRepay);
    };
    return (
        <div className="container">
            <div className="calculator">
                <h1 className="title">Mortgage calculator</h1>
                <div className="group input-amount">
                    <label htmlFor="amount">Mortgage Amount</label>
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        name="amount"
                        onChange={handleAmount}
                    />
                </div>
                <div className="row">
                    <div className="input-term">
                        <label htmlFor="term">Mortgage Term</label>
                        <input id="term" value={term} name="term" onChange={handleTerm} />
                    </div>
                    <div className="input-rate">
                        <label htmlFor="rate">Interest rate</label>
                        <input
                            type="text"
                            value={rate}
                            id="rate"
                            name="rate"
                            onChange={handleRate}
                        />
                    </div>
                </div>
                <div className="group-input">
                    <label htmFor="term">Mortgage Type</label>
                    <div className="radio">
                        <input
                            type="radio"
                            id="repayment"
                            name="operation"
                            value="repayment"
                            onChange={handleOperation}
                        />
                        <label htmlFor="repayment">Repayment</label>
                    </div>
                    <div className="radio">
                        <input
                            type="radio"
                            id="interest"
                            name="operation"
                            value="interest"
                            onChange={handleOperation}
                        />
                        <label htmlFor="interest">Interest Only</label>
                    </div>

                    <button onClick={calculateMortgage}>
                        <FaCalculator /> Calculate Repayments
                    </button>
                </div>
            </div>
            <div className="results-container">
                <div className="icon">
                    <img src={Calc} className="logo" />
                </div>
                <h2>Your Results</h2>
                <div className="mortgage-results">
                    <p>Your monthly repayments</p>
                    <h1 className="repay">Ksh {total}</h1>
                    <hr />
                    <p>Total you'll repay over the term</p>
                    <h2>Ksh {repay}</h2>
                </div>
            </div>
        </div>
    );
}

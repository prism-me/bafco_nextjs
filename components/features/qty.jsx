import React, { useState, useEffect } from 'react';

function Qty(props) {
    const { value = 1, adClass = "", max = 100, changeQty } = props;
    const [current, setCurrent] = useState(value);

    useEffect(() => {
        setCurrent(value);
    }, [value])

    useEffect(() => {
        changeQty && changeQty(current);
    }, [current])

    function increment() {
        if (max <= 0 || current >= max)
            return;
        setCurrent(current + 1);
    }

    function decrement() {
        if (current > 1) {
            setCurrent(current - 1);
        }
    }

    function changeCurrent(e) {
        if (parseInt(e.currentTarget.value) < max) {
            setCurrent(parseInt(e.currentTarget.value));
        }
    }

    return (
        <div className={`product-details-quantity ${adClass}`}>
            <div className="input-group input-spinner">
                <div className="input-group-prepend">
                    <button
                        style={{ minWidth: '25px' }}
                        className="btn btn-decrement btn-spinner"
                        onClick={decrement}
                        type="button"
                    >
                        <i className="icon-minus"></i>
                    </button>
                </div>
                <input
                    type="number"
                    className="form-control text-center"
                    min="1"
                    max={max}
                    value={current}
                    required
                    onChange={changeCurrent}
                />
                <div className="input-group-append">
                    <button
                        style={{ minWidth: '25px' }}
                        className="btn btn-increment btn-spinner"
                        type="button"
                        onClick={increment}
                    >
                        <i className="icon-plus"></i>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Qty;
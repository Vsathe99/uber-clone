import React from "react";

const ConfirmedRide = (props) => {

  return (
    <div className="overflow-y-scroll">
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="p-3 text-center absolute top-0 w-[90%]"
      >
        <i className="text-2xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-3 justify-between flex-col items-center">
        <img
          className="h-20 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props?.fare && props?.vehicleType && props.fare[props.vehicleType] ? props.fare[props.vehicleType] : 'N/A'} </h3>
              <p className="text-sm -mt-2 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button onClick={()=>{
          props.setConfirmRidePanel(false);
          props.setVehicleFound(true)
          props.createRide()
        }} className="w-full bg-green-200 text-white font-semibold p-2 ronded-lg mt-3">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;

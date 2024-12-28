import React from 'react'


const VehiclePanel = (props) => {
  
  return (
    <div>
        <h5 onClick={()=>{
          props.setVehiclePanel(false)
          
        }} className='p-3 text-center absolute top-0 w-[90%]'>
          <i className="text-2xl text-gray-300 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.setVehiclePanel(false)
            props.selectVehicle('car')
        }}
        className='flex border-2 active:border-black rounded-xl w-full p-3 items-center justify-between mb-2'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span></span></h4>
            <h5 className='font-medium text-sm'>2min away</h5>
            <p className='font-normal text-gray-600 text-xs'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props?.fare?.car}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.setVehiclePanelOpen(false)
            props.selectVehicle('moto')
        }}
        className='flex border-2 active:border-black rounded-xl w-full p-3 items-center justify-between mb-2'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className=' ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span></span></h4>
            <h5 className='font-medium text-sm'>3 min away</h5>
            <p className='font-normal text-gray-600 text-xs'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props?.fare?.moto}</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.setVehiclePanelOpen(false)
            props.selectVehicle('auto')
        }} 
        className='flex border-2 active:border-black rounded-xl w-full p-3 items-center justify-between mb-2'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className=' ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span></span></h4>
            <h5 className='font-medium text-sm'>3 min away</h5>
            <p className='font-normal text-gray-600 text-xs'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹{props?.fare?.auto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel
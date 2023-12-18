import React, { useEffect, useState } from 'react'
import { getWatchHistory } from '../service/allapi'

const Watchhistory = () => {

  const[history,setHistory]=useState([])

  useEffect(() => {
    getHistory()
  },[])



  const getHistory=async() => {
    const {data} = await getWatchHistory()
    
    setHistory(data)
  }
  console.log(history);
  return (
    <>
      <h1>Watch History</h1>
      <table className="table-shadow m-3 border rounded ">
        <thead>
          <tr>
            <th>ID</th>
            <th>CARD NAME</th>
            <th>URL</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((items, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{items?.cardname}</td>
              <td>{items?.url}</td>
              <td>{items?.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Watchhistory
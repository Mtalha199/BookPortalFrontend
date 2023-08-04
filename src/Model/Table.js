import React from 'react';

const TableData = ({data=[] ,handleEdit,handleDelete}) => {

  const formatDateToCustomFormat = (isoDateString) => {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  data.forEach((books) => {
    books.published_at = formatDateToCustomFormat(books.published_at);
  });
    return (<><table class="table">
    <thead>
      <tr>
        <th scope="col">Book Name</th>
        <th scope="col">Author Name</th>
        <th scope="col">No of Pages</th>
        <th scope="col"> Published_at</th>
        <th scope="col"> Edit Operation</th>
        <th scope="col"> Delete Operation</th>
      </tr>
    </thead>
    <tbody>
     {data.map((val,index)=>{
        return (  <tr>
            <td>{val?.tittle}</td>
            <td>{val?.author}</td>
            <td>{val?.no_of_pages}</td>
            <td>{val?.published_at}</td>
            <td><button   data-toggle="modal" data-target="#exampleModal" onClick={()=>handleEdit({val})}  className='btn btn-secondary'>Edit Data</button></td>
            <td><button onClick={()=>handleDelete({val})} className='btn btn-danger'>Delete Data</button></td>
          </tr>)
     })}
     
   
    </tbody>
  </table></>);
}
 
export default TableData;
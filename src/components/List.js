import React from "react";

function List(props) {
  return (
    <ul className="list-group">
        {props.groceries.map(grocery => 
        <div>
            <ul>
                <li>{JSON.stringify(grocery)}</li> 
            </ul>
        </div>
        )}
    </ul>
  );
}

export default List;

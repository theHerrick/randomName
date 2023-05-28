import React, { useState, useEffect } from "react";

const NameList = () => {
  const [list, updateList] = useState([]);
  const [newValue, setValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const base_url = 'https://nameselectorapi.azurewebsites.net/api/NameSelector?code='

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(base_url + process.env.REACT_APP_API_KEY); // Replace "API_URL" with the actual URL of your GET API endpoint
        const data = await response.json();
        const nameData = data.map((item, index) => ({
          id: index,
          value: item.Name
        }));
        updateList(nameData);
      } catch (error) {
        console.log("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, []);

  const ListItem = ({ value, id, onRemoveClick }) => (
    <div class="list-group-item list-group-item-primary clearfix">
      {value}
      <span class="px-5"> </span>
     <button class="btn btn-danger btn-outline-light float-end" onClick={() => onRemoveClick(id)}>X</button>
    </div>
  );

  const addItem = () => {
    if (newValue.trim() !== "") {
      const newItem = { id: list.length, value: newValue.trim() };
      updateList([...list, newItem]);
      setValue("");
    }
  };

  const removeItem = id => {
    updateList(list.filter(item => item.id !== id));
  };

  const submitData = async () => {
    try {
      const postData = { data: list.map(item => ({ Name: item.value })) };
      const response = await fetch(base_url + process.env.REACT_APP_API_KEY, {
        // Replace "API_URL" with the actual URL of your POST API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
      // Handle the response as needed
      console.log("POST API response:", response);
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log("Error sending data to the API:", error);
    }
  };

  return (
    <div>
    <div class="list-group d-inline-block">
      {list.map(item => (
        <ListItem key={item.id} {...item} onRemoveClick={removeItem} />
      ))}
    </div>
    <div>
      <label>
        Name: 
        <input
          type="text"
          value={newValue}
          onChange={e => setValue(e.currentTarget.value)}
        />
      </label>
      <button class="btn btn-primary" onClick={addItem}>Add</button>
      </div>
      <div>
      <button class="btn btn-primary" onClick={submitData} disabled={isSubmitted}>
        {isSubmitted ? "Submitted" : "Submit"}
      </button>
    </div>
    </div>
  );
};

export default NameList;

import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Select from 'react-select';
import UserObject from './UserObject.js';



function UsersBrowser() {
  const [letter, setLetter] = useState("");
  const [users, setUsers] = useState([]);
  const letterSelect = [
    {value: "", label: ""},
    {value: "A", label: "A" },
    {value: "B", label: "B" },
    {value: "C", label: "C" },
    {value: "D", label: "D" },
    {value: "E", label: "E" },
    {value: "F", label: "F" },
    {value: "G", label: "G" },
    {value: "H", label: "H" },
    {value: "I", label: "I" },
    {value: "J", label: "J" },
    {value: "K", label: "K" },
    {value: "L", label: "L" },
    {value: "M", label: "M" },
    {value: "N", label: "N" },
    {value: "O", label: "O" },
    {value: "P", label: "P" },
    {value: "Q", label: "Q" },
    {value: "R", label: "R" },
    {value: "S", label: "S" },
    {value: "T", label: "T" },
    {value: "U", label: "U" },
    {value: "V", label: "V" },
    {value: "W", label: "W" },
    {value: "X", label: "X" },
    {value: "Y", label: "Y" },
    {value: "Z", label: "Z" },
  ];

  // const handleSelect = (selected) => {
  //   console.log(selected);
  //   setLetter(selected);
  // };

  useEffect(() => {
    let mounted = true;
    if (letter.length === 0 & mounted) {
      (async () => {
        const res = await fetch("/api/users/browse");
        if (!res.ok) {
          throw res;
        }

        const data = await res.json();

        if (data) {
          setUsers(data.users);
        }
      })()
    } else {
      if(mounted) {
        (async () => {
          const char = letter.value.toLowerCase();
          const res = await fetch(`/api/users/browse/${char}`);
          if (!res.ok) {
            throw res;
          }

          const data = await res.json();

          if (data) {
            setUsers(data.users);
          }
        })()
      }
    }

    return () => mounted = false;
  }, [letter]);

  const userObjects = users.map((user, i) => {
    return (
      <UserObject key={i} data={user}/>
      // <li key={user.id}>
      //   <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      // </li>
    );
  });

  return (
    <div className="usersbrowser">
      <Select
        className="usersbrowser__select-bar"
        placeholder="Filter Users"
        defaultValue={letter}
        options={letterSelect}
        onChange={setLetter}
      />
      <ul className="usersbrowser__user-list">{userObjects}</ul>
    </div>
  );
}

export default UsersBrowser;

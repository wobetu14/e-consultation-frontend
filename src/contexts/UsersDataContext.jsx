import React, { createContext, useEffect, useState } from 'react'
import axios from '../axios/AxiosGlobal'

export const UsersDataContext=createContext(null);

export const UsersDataProvider = (props) => {
    const [users, setUsers]=useState([]);
    const [filteredUsers, setFilteredUsers]=useState([]);
    const [searchUser, setSearchUser]=useState("");
    const [user, setUser]=useState(null);
    const [requestCompleted, setRequestCompleted]=useState(0)

    const [showUserAddForm, setShowUserAddForm]=useState(false);
    const [showUserEditForm, setShowUserEditForm]=useState(false);

    const [serverErrorMsg, setServerErrorMsg]=useState(null);
    const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

    const [loading, setLoading]=useState(false);

    const [openDialog, setOpenDialog]=useState(false);

    useEffect(()=>{
      fetchUsers()
    }, [users])

    const fetchUsers =async() =>{
        try{
          const res = await  axios.get('users', 
          {headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data"
          }})
            setUsers(res.data.data);
            setFilteredUsers(res.data.data);
            setRequestCompleted(1)
        } catch(error){
            console.log(error);
         }
      }

      const deleteUser=async (userID) => {
        return await axios.delete(`users/${userID}`, 
        {headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data"
        }})
        .then(res => {
          setServerSuccessMsg(res.data.message);
          setServerErrorMsg(null);
          setOpenDialog(false);
          fetchUsers();
        })
        .catch(errors =>{
          setServerErrorMsg(errors.response.data.message);
          setServerSuccessMsg(null) 
        }) 
       }

       const getUserInfo = async(userRow) =>{
        try{
          const res = await axios.get(`users/${userRow}`, 
          {headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data"
          }})
            setUser(res.data.data);
            setOpenDialog(true);
        } catch(error){
            console.log(error);
         }
      }


      useEffect(()=>{
        const filteredResult=users.filter((user)=>{
            return (
                    user.first_name.toLowerCase().match(searchUser.toLowerCase()) || 
                    user.middle_name.toLowerCase().match(searchUser.toLowerCase()) ||
                    user.mobile_number.toLowerCase().match(searchUser.toLowerCase())
                )
        });
        setFilteredUsers(filteredResult);
    },[searchUser, users])

  return (
    <UsersDataContext.Provider value={{ 
        users:users,
        setUsers:setUsers,
        filteredUsers:filteredUsers,
        setFilteredUsers:setFilteredUsers,
        searchUser:searchUser,
        setSearchUser:setSearchUser,
        user:user,
        setUser:setUser,
        fetchUsers:fetchUsers,
        showUserAddForm:showUserAddForm,
        setShowUserAddForm:setShowUserAddForm,
        showUserEditForm:showUserEditForm,
        setShowUserEditForm:setShowUserEditForm,
        serverErrorMsg:serverErrorMsg,
        setServerErrorMsg:setServerErrorMsg,
        serverSuccessMsg:serverSuccessMsg,
        setServerSuccessMsg:setServerSuccessMsg,
        openDialog:openDialog,
        setOpenDialog:setOpenDialog,
        deleteUser:deleteUser,
        getUserInfo:getUserInfo,
        loading:loading,
        setLoading:setLoading,
        requestCompleted:requestCompleted,
        setRequestCompleted:setRequestCompleted,
      }}>
        {props.children}
    </UsersDataContext.Provider>
  )
}
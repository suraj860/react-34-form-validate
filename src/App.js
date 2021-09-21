
import React from "react";
import axios from "axios";


// created useStates to store the changes also to store the errors 
// used React.useEffect() to get data at once whenever page is loaded it calls data only once\
// created async functions to perform METHODS like DELETE, POST ,PUT and caleed it wherever needed
// created handleSubmit function to handle submit form and to check the errors if any present than 
// don't submit form
// created form to accept the data from client
// used onChange function within input utself to track the changes
// created function resetData to reset the textbox values to null when form is submitted
// 
// Finally used map to map over the data and display it in a table

//functional component
function App(){

  // useState to stor and do changes in the UI
  const [data , setData] = React.useState([])
  const [ fullName , setName] = React.useState("")
  const [ email , setEmail] = React.useState("")
  const [ website , setWebsite] = React.useState("")
  const [ phone , setPhone] = React.useState("")
  const [id , setId] = React.useState("")

  // ERRORS- TO PERFORM ERRORS
  const [ fullNameErr , setNameErr] = React.useState("")
  const [ emailErr , setEmailErr] = React.useState("")
  const [ websiteErr , setWebsiteErr] = React.useState("")
  const [ phoneErr , setPhoneErr] = React.useState("")
  


//CALLED ONLY ONCE WHENEVER PAGE IS REFRESHED TO GET INITIAL DATA
  React.useEffect(()=>{
    async function getData(){
      const response1 = await axios.get("https://jsonplaceholder.typicode.com/users")
      setData(response1.data)
    }
    getData()
  },[])

// USED TO PERFORM DELETE METHOD
  async function deleteId(id){ 
      await axios.delete("https://jsonplaceholder.typicode.com/users/" + id)
      let datas = [...data]
      let newData = datas.filter((items)=> items.id !== id)
      setData(newData)
  }

// USED TO PERFORM POST METHOD
  async function createData(){
    const response3 = await axios.post("https://jsonplaceholder.typicode.com/users",{
      name : fullName,
      email : email,
      website : website,
      phone : phone
    })
    let newData = [...data , response3.data]
    setData(newData)
// CALLED SO THAT THE TEXTBOX VALUES ARE SET TO EMPTY AFTER SUBMITION
    resetData()
  }

// USED TO PERFORM PUT METHOD
  async function editData(){
    const response4 = await axios.put("https://jsonplaceholder.typicode.com/users/" + id ,{
      name : fullName,
      email : email,
      website : website,
      phone : phone
    })
    let prevData = [...data]
    let index = prevData.findIndex((item)=>item.id ===response4.data.id)
    prevData[index] = response4.data
    setData(prevData)
    resetData()
  }


// CHECKS FOR THE ERROR CONDITIONS AND THEN ONLY PERFORMS THE SUBMITION FUNCTION
  function handleSubmit(event){
    let a =  emailErr 
    let b = phoneErr
    event.preventDefault();

// checks whether to create new data or edit the present data

    if(id !== ""){

      editData()

    }else{
// checks for error if any

      if(a.length===0 && b.length===0){

        createData()

      }else{

        return

      }
     
    }
  }

  // TO GET THE FORM FILLED WITH THE VALUES SELECTED TO  UPDATE
  function update(details){
    setName(details.name)
    setEmail(details.email)
    setId(details.id)
    setWebsite(details.website)
    setPhone(details.phone)
  }

// TO RESET THE FORM
  function resetData(){
    setName("")
    setEmail("")
    setId("")
    setWebsite("")
    setPhone("")
  }
  
  // ALL THE ELEMENTS TO BE RENDERED
  return(
    <>
    {/* CODE FOR THE BANNER */}
    <div className="banner">
      <p className="title">Add Contacts with validation</p>
    </div>

    {/* FORM ELEMENTS */}
    <div className="formdiv">
      <form onSubmit={handleSubmit}>
       
       {/* INPUT-1 ELEMENT WITH onChange function */}
        <input  type = "text" value = {fullName} name="fullName" placeholder = "Enter your name"
        onChange={
          (event)=>{
            setName(event.target.value)
            if (event.target.value.length<4){
              setNameErr("*Enter valid name")
            }else{
              setNameErr("")
            }
           }}
         required style = {{marginRight:"40px"}}>
        </input>
        <span className="err">{fullNameErr}</span>

         {/* INPUT-2 ELEMENT WITH onChange function */}
        <input type = "email" value ={email} name ="email" placeholder = "Enter your email"
        onChange={
          (event)=>{
            setEmail(event.target.value)
            if (event.target.value.length < 14){
              setEmailErr("*Enter valid Email")
            }else{
              setEmailErr("")
            }
          }} required>
        </input>
        <span className="err">{emailErr}</span><br/>
        <br/>
        
         {/* INPUT-3 ELEMENT WITH onChange function */}
        <input  type = "text" value = {website} name ="website" placeholder = "Enter your website"

         onChange={
           (event)=>{
             setWebsite(event.target.value)
             if (event.target.value.length<5){
              setWebsiteErr("*Enter valid website")
            }else{
              setWebsiteErr("")
            }
            }} required style = {{marginRight:"40px"}}>

         </input>
         <span className="err">{websiteErr}</span>

        {/* INPUT-4 ELEMENT WITH onChange function */}
        <input type = "text" value ={phone} name ="phone" placeholder = "Enter your phone"

        onChange={
          (event)=>{
            setPhone(event.target.value)
            if (event.target.value.length<=10){
              setPhoneErr("*Enter valid phone Number")
            }else{
              setPhoneErr("")
            }
          }} required>
            
          </input>
          <span className="err">{phoneErr}</span><br/>
        <br/>

        <button  className="btn btn-success btns" type="submit">Submit</button>
      </form>
    </div>
    
    {/* contact data table */}
    <table className="table table-hover">
      <tbody>
        {data.map((items)=>{
          return(
            <tr key = {items.id}>
              <td className="details">
                <p><span> Name : </span>{items.name}</p>
                <p><span> Email Id :</span> {items.email}</p>
                <p><span> Website : </span> {items.website}</p>
                <p><span> Phone : </span> {items.phone}</p>
                <button type="button" className="btn btn-primary btns" onClick={()=>{update(items)}}>EDIT</button>
                <button type="button" className="btn btn-danger" onClick={()=>{deleteId(items.id)}}>DELETE</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}

export default App;

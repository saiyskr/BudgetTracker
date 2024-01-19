import './App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import { useRef } from "react";

function App() {
  const [ShowAddBudget, setShowAddBudget] = useState(false);
  const handleCloseBudget = () => setShowAddBudget(false);
  const ShowAddBudgetModal = () => setShowAddBudget(true);

  const [ShowAddExpense, setShowAddExpense] = useState(false);
  const handleCloseExpense = () => setShowAddExpense(false);
  const ShowAddExpenseModal = () => setShowAddExpense(true);
  
  
 
  const [BudgetList, setBudgetList] = useState(()=>{
    const budgetsslocal = localStorage.getItem("budgets")
    if(budgetsslocal == null) return []
    return JSON.parse(budgetsslocal)
  });
   useEffect(()=>{
    localStorage.setItem("budgets",JSON.stringify(BudgetList))
  },[BudgetList]);

  const nameRef = useRef()
  const maxRef = useRef()

  const SaveBudget = ()=>{
    setBudgetList( currlist =>{
      return[
        ...currlist,
        { id: currlist.length+1, title: nameRef.current.value, budgetvalue: maxRef.current.value },
      ]
    }
    )
  }
  console.log(BudgetList)
  const valuenow = 50;
  const styles = {width: "50%"}
  return (
    <>
     {/* <!-- Modal --> */}
     <Modal show={ShowAddBudget} onHide={handleCloseBudget}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={SaveBudget}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Budget name"
                ref={nameRef}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Maximum Spending</Form.Label>
              <Form.Control 
                type="number"
                placeholder="Budget Amount" 
                ref={maxRef}
              />
            </Form.Group>
          
          <Button variant="secondary" className='ml-auto' onClick={handleCloseBudget}>
            Close
          </Button>
          <Button variant="primary" className=' m-1' type="submit">
            Add
          </Button>
          </Form>
          </Modal.Body>
      </Modal>
      <Modal show={ShowAddExpense} onHide={handleCloseExpense}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Expense Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Expense name"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Money Spent</Form.Label>
              <Form.Control 
                type="number"
                placeholder="Expense Amount" 
              />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <Form.Label>Money Spent</Form.Label>
              <option>Choose a category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExpense}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseExpense}>
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>
    
    <div className="container my-4">
      <header className="App-header">
        <h1 className='headertext'>Budgets</h1>
        <button className='m-2 btn btn-primary' onClick={ShowAddBudgetModal}>Add Budget</button>
        <button className='m-2 btn btn-info' onClick={ShowAddExpenseModal}>Add Expense</button>
      </header>
      <div className="row my-4">
        {BudgetList.map(item =>{
          return(
            <div className="col-sm-6 my-2" key={item.title}>
              <div className="card">
                <div className="card-body">
                  <div className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                  <h5 className="card-title me-2">{item.title}</h5>
                  <h5 className="card-title d-flex align-items-baseline">{item.budgetvalue}</h5>
                  </div>
                  {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                  <div className="progress my-4">
                    <div className="progress-bar bg-success" role="progressbar" style={styles} aria-valuenow={valuenow} aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <a href="#InnerExpenseModal" className="btn btn-primary m-2">Add Expense</a>
                  <a href="#InnerViewExpenseModal" className="btn btn-secondary m-2">View Expenses</a>
                </div>
              </div>
            </div>
          )
        })}
        
        
      </div>
      
    </div>
    </>
  );
}

export default App;

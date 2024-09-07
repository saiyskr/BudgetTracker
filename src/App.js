import './App.css';
import { Modal, Button, Stack } from "react-bootstrap"
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useRef } from "react";

function App() {
  const [ShowAddBudget, setShowAddBudget] = useState(false);
  const handleCloseBudget = () => setShowAddBudget(false);
  const ShowAddBudgetModal = () => setShowAddBudget(true);

  const [ShowAddExpense, setShowAddExpense] = useState(false);
  const handleCloseExpense = () => setShowAddExpense(false);
  const ShowAddExpenseModal = () => setShowAddExpense(true);

  const [ShowInnerExpenses, setShowInnerExpenses] = useState(false);
  const handleCloseInnerExpensesModal = () => setShowInnerExpenses(false);

  const [ShowInnerViewExpenses, setShowInnerViewExpenses] = useState(false);
  const handleCloseViewExpensesModal = () => setShowInnerViewExpenses(false);
  // const ShowInnerViewExpensesModal = () => setShowInnerViewExpenses(true);

  const [ExpenseName, setExpenseName] = useState("")
  const ShowInnerViewExpensesModal = (id,name) => {
    setBudgetId(id);
    setShowInnerViewExpenses(true);
    const expensesLocal = localStorage.getItem("expenses");
    const parsedExpenses = expensesLocal ? JSON.parse(expensesLocal) : [];
    const filteredExpenses = parsedExpenses.filter((item) => item.budgetId === id);
    setcurrExpenseList(filteredExpenses);
  };

  const [BudgetList, setBudgetList] = useState(() => {
    const budgetsslocal = localStorage.getItem("budgets")
    if (budgetsslocal == null) return []
    return JSON.parse(budgetsslocal)
  });
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(BudgetList))
  }, [BudgetList]);

  const [ExpenseList, setExpenseList] = useState(() => {
    const expenseslocal = localStorage.getItem("expenses")
    if (expenseslocal == null) return []
    return JSON.parse(expenseslocal)
  });
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(ExpenseList))
  }, [ExpenseList]);

  const nameRef = useRef()
  const maxRef = useRef()
  const amountRef = useRef()
  const descriptionRef = useRef()
  const budgetIdRef = useRef()
  const [BudgetId, setBudgetId] = useState()
  const SaveBudget = () => {
    setBudgetList(currList => {
      const newBudget = {
        id: currList.length + 1,
        title: nameRef.current.value,
        spentvalue: 0,
        budgetvalue: maxRef.current.value,
      };
      return [...currList, newBudget];
    });
    handleCloseBudget();
  }
  const ShowInnerExpensesModal = (id)=> {
    setBudgetId(id);
    setShowInnerExpenses(true);
    const expenseslocal = localStorage.getItem("expenses")
    if (expenseslocal == null) setcurrExpenseList([])
    else setcurrExpenseList(JSON.parse(expenseslocal).filter(item=>item.id === BudgetId))
  }
  const SaveExpense = () => {
    const newExpense = {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: parseInt(budgetIdRef.current.value)
    };
  
    setExpenseList((curr) => [...curr, newExpense]);
    handleCloseExpense();
  };
  const AddExpenseById = () => {
    setExpenseList(curr => {
      return [
        ...curr,
        {
          description: descriptionRef.current.value,
          amount: parseFloat(amountRef.current.value),
          budgetId: BudgetId
        },
      ]
    }
    )
  }
  const deleteBudget = (BudgetId)=>{
    setBudgetList(currlist => currlist.filter(item => item.id !== BudgetId))
  }
  const handleClose = () =>{
    setShowInnerExpenses(false);
  }
  const [currExpenseList, setcurrExpenseList] = useState(() => {
    const expenseslocal = localStorage.getItem("expenses")
    if (expenseslocal == null) return []
    else JSON.parse(expenseslocal).filter(item=>item.id === BudgetId)
  });
  useEffect(() => {
    localStorage.setItem("currexpenses", JSON.stringify(currExpenseList))
  }, [currExpenseList]);
  // console.log(BudgetList)
  // console.log(ExpenseList)
  const handleDeleteExpense = (id) => {
    // Remove the expense from the currExpenseList array
    setcurrExpenseList(currExpenseList.filter((item) => item.budgetId !== id));
    setExpenseList(ExpenseList.filter(item => item.budgetId !== id));
  };
  const valuenow = 50;
  const styles = { width: "50%" }
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
          <Form onSubmit={SaveExpense}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Expense Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Expense Description"
                ref={descriptionRef}
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
                ref={amountRef}
                name='ExpenseAmount'
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Choose a category</Form.Label>
              <Form.Select ref={budgetIdRef}>
                {BudgetList.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  )
                })}
              </Form.Select>
            </Form.Group>
            <Button variant="secondary" className='ml-auto' onClick={handleCloseExpense}>
              Close
            </Button>
            <Button variant="primary" className=' m-1' type="submit">
              Add Expense
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={ShowInnerExpenses} onHide={handleCloseInnerExpensesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AddExpenseById}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Expense Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Expense Description"
                ref={descriptionRef}
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
                ref={amountRef}
                name='ExpenseAmount'
              />
            </Form.Group>

            <Button variant="secondary" className='ml-auto' onClick={handleCloseInnerExpensesModal}>
              Close
            </Button>
            <Button variant="primary" className=' m-1' type="submit">
              Add Expense
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={ShowInnerViewExpenses} onHide={handleCloseViewExpensesModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
              <div>Expenses - {BudgetId}</div>
              {/* {BudgetId !== UNCATEGORIZED_BUDGET_ID && ( */}
                <Button
                  onClick={() => {
                    deleteBudget(BudgetId)
                    handleCloseViewExpensesModal()
                  }}
                  variant="outline-danger"
                >
                  Delete Budget
                </Button>
              {/* // )} */}
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap="3">
              {currExpenseList && currExpenseList.map(expense => (
                <Stack direction="horizontal" gap="2" key={expense.id}>
                  <div className="me-auto fs-4">{expense.description}</div>
                  <div className="fs-5">
                    {expense.amount}
                  </div>
                  <Button
                    onClick={() => handleDeleteExpense(expense.budgetId)}
                    size="sm"
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Stack>
              ))}
            </Stack>
        </Modal.Body>
      </Modal>

      <div className="container my-4">
        <header className="App-header">
          <h1 className='headertext'>Budget Tracker Application</h1>
          <button className='m-2 btn btn-primary' onClick={ShowAddBudgetModal}>Add Budget</button>
          <button className='m-2 btn btn-info' onClick={ShowAddExpenseModal}>Add Expense</button>
        </header>
        <div className="row my-4">
          {BudgetList.map(item => {
            return (
              <div className="col-sm-6 my-2" key={item.title}>
                <div className="card">
                  <div className="card-body">
                    <div className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                      <h5 className="card-title me-2">{item.title}</h5>
                      <p className="card-title d-flex align-items-baseline">{item.spentvalue} / {item.budgetvalue}</p>
                    </div>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <div className="progress my-4">
                      <div className="progress-bar bg-success" role="progressbar" style={styles} aria-valuenow={valuenow} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button onClick={() => ShowInnerExpensesModal(item.id)} className="btn btn-primary m-2">Add Expense</button>
                    <button onClick={() => ShowInnerViewExpensesModal(item.id, item.title)} className="btn btn-secondary m-2">View Expenses</button>
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

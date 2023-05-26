import  { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import classes from './Welcome.module.css'
import {useHistory} from 'react-router-dom'
import AuthContext from '../auth/AuthContext'
import ExpenseForm from '../expenses/ExpenseForm'
import ExpenseList from '../expenses/ExpenseList'

const WelcomePage = () => {
  const history = useHistory()
  const authctx = useContext(AuthContext)
  const [items, setItems] = useState([])

  const routeChange = () => {
    history.push("/Welcomepage/profile");
  }

  const verification = () => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAVljULb5wx1pjS6nACVu-88E3ybtM49vo",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authctx.token,
          }),
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              if (data.error.message) {
                alert(data.error.message);
              }
            });
          }
        })
        .then((data) => {
          console.log('received loda ',data)
        })
        .catch((err) => console.log(err));
  }


    const logoutHandler = () => {
      authctx.logout()
      history.replace('/login')
    }

    const saveExpenseDataHandler = (expense) => {
      setItems( prev => [expense, ...prev])
    }

    const getExpense = useCallback(async() => {
      const response = await fetch(
        "https://expensetracker-b4569-default-rtdb.firebaseio.com/expenses.json"
      )
      const data = await response.json()
      console.log(data)

      const loadedExpenses = []

      for (const key in data) {
        loadedExpenses.push({
          id : key,
          amount : data[key].amount,
          description : data[key].description,
          category : data[key].category
        })
      }

      setItems(loadedExpenses)
      
    },[])


useEffect(() => {
  getExpense()
},[getExpense])
  

    return (
      <Fragment>
        <div className={classes.header}>
          <h4>Welcome to Expense Tracker !!!</h4>
          <button onClick={verification} className={classes.email}>Verify Email</button>
          <button onClick={logoutHandler} className={classes.logout}>Logout</button>
          <span>Your Profile is Incomplete. <button onClick={routeChange}>Complete now</button></span>
        </div>
        <ExpenseForm onSaveData={saveExpenseDataHandler} />
        <ExpenseList items={items} />
      </Fragment>
    );
}

export default WelcomePage
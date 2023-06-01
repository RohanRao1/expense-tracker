import  { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import classes from './Welcome.module.css'
import {useHistory} from 'react-router-dom'
import AuthContext from '../auth/AuthContext'
import ExpenseForm from '../expenses/ExpenseForm'
import ExpenseList from '../expenses/ExpenseList'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/authentication'
import { expenseActions } from '../../store/expenses'
import { saveAs } from "file-saver";

const WelcomePage = () => {
  const history = useHistory()
  
  const [editItem, setEditItem ] = useState(null)
  const receivedData = useSelector(state => state.expense?.data)

  const dispatch = useDispatch()
  const token = useSelector(state => state.authentication.token)
  const premium = useSelector(state => state.expense?.showPremium)
  let [isPremiumClicked, setIsPremiumClicked] = useState(false);

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
            idToken: token,
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
      // authctx.logout()
      dispatch(authActions.logout())
      localStorage.removeItem("darktheme");
      localStorage.removeItem("isPremiumClicked");
      history.replace('/login')
    }


const editHandler = item => {
  console.log('received editing id ',item)
  setEditItem(item)
}
  
const changeToDark = () => {
  dispatch(expenseActions.toggle())
}

const downloadFile = () => {
  const csv =
      "Category,Description,Amount\n" +
      Object.values(receivedData)
        .map(
          ({ category, description, amount }) =>
            `${category},${description},${amount}`
        )
        .join("\n");

    // Create a new blob with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Save the blob as a file with the name "expenses.csv"
    saveAs(blob, "expenses.csv")
}


useEffect(() => {
  const premiumClickedStatus = localStorage.getItem("isPremiumClicked");
  if (premiumClickedStatus) {
    setIsPremiumClicked(JSON.parse(premiumClickedStatus));
  }
}, []);

useEffect(() => {
  localStorage.setItem("isPremiumClicked", JSON.stringify(isPremiumClicked));
}, [isPremiumClicked]);



const activatePremium = () => {
  localStorage.setItem('isPremiumClicked', true)
  window.location.reload()
}



    return (
      <Fragment>
        <div className={classes.header}>
          <h4>Welcome to Expense Tracker !!!</h4>
          <button onClick={verification} className={classes.email}>
            Verify Email
          </button>
          {premium &&  (
            <button className={classes.premium} onClick={activatePremium}>
              Activate premium
            </button>
          )}
          <button onClick={logoutHandler} className={classes.logout}>
            Logout
          </button>
          <span> 
            Your Profile is Incomplete
            <button onClick={routeChange}>Complete now</button>
          </span>
          {console.log("asdf ", premium, isPremiumClicked)}
          {premium && isPremiumClicked && (
            <button className={classes.toggle} onClick={changeToDark}>
              Toggle dark/light Theme
            </button>
          )}
          {premium && isPremiumClicked && (
            <button className={classes.download} onClick={downloadFile}>
              Download Expense
            </button>
          )}
        </div>
        <ExpenseForm editItem={editItem} />
        <ExpenseList onEdit={editHandler} />
      </Fragment>
    );
}

export default WelcomePage
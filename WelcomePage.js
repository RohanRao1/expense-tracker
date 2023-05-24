import react, { Fragment } from 'react'
import classes from './Welcome.module.css'

const WelcomePage = () => {
    return (
      <Fragment>
        <div className={classes.header}>
          <h3>Welcome to Expense Tracker !!!</h3>
        </div>
      </Fragment>
    );
}

export default WelcomePage
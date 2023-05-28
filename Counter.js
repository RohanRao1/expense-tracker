import classes from './Counter.module.css';
import {useSelector, useDispatch } from 'react-redux'
import { counterActions} from '../store/index'

const Counter = () => {
 const counter =  useSelector(state => state.counter.counter)
 const dispatch = useDispatch()
  const show = useSelector(state => state.counter.showCounter)

 const incrementHandler = () => {
  dispatch(counterActions.increment())
 }

 const increaseHandler = () => {
  dispatch(counterActions.increase(2)) // {type : some_id, payload : 2}
 }

 const decrementHandler =() => {
  dispatch(counterActions.decrement())
 }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div> }
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 2</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

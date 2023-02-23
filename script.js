// added extra feature  delete functionality

// new code

const allMatchEl = document.querySelector(".all-matches");
const addElementBtnEl = document.querySelector(".lws-addMatch");
const resetBtnEl = document.querySelector(".lws-reset");

const INCRIMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";
const ADDANOTHER = "add-another";
const DELETE = "delete";

const initialState = [{ id: 0, value: 0 }];

const increment = (value, id) => {
  return {
    type: INCRIMENT,
    payload: {
      value: Number(value),
      id: id,
    },
  };
};
const decrement = (value, id) => {
  return {
    type: DECREMENT,
    payload: {
      value: Number(value),
      id: id,
    },
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

const addAnother = (id) => {
  return {
    type: ADDANOTHER,
    payload: id,
  };
};
// const deleteM = (id) => {
//   return {
//     type: DELETE,
//     payload: id,
//   };
// };

// reducer function

const counterReducer = function (state = initialState, action) {
  switch (action.type) {
    case INCRIMENT:
      let incrementedState = state.map((el) => {
        if (el.id === action.payload.id) {
          return {
            ...el,
            value: el.value + action.payload.value,
          };
        }
        return { ...el };
      });
      return incrementedState;

    case DECREMENT:
      let decrementedState = state.map((el) => {
        if (el.id === action.payload.id) {
          return {
            ...el,
            value:
              el.value - action.payload.value <= 0
                ? 0
                : el.value - action.payload.value,
          };
        }
        return { ...el };
      });
      return decrementedState;
    case RESET:
      let resetedState = state.map((el) => {
        return {
          ...el,
          value: 0,
        };
      });
      return resetedState;
    case ADDANOTHER:
      return [...state, { id: action.payload, value: 0 }];
    // case DELETE:
    //   let deletedState = state.filter((el) => {
    //     return el.id != action.payload;
    //   });
    //   return deletedState;
    default:
      return state;
  }
};

// create store

const incrementValue = (e, id) => {
  e.preventDefault();
  let element = e.target.children;
  let value = element[1].value;
  // console.log(value, id);
  // element[1].value = "";
  store.dispatch(increment(value, id));
};
const decrementValue = (e, id) => {
  e.preventDefault();
  let element = e.target.children;
  let value = element[1].value;
  // console.log(value, id);
  // element[1].value = "";
  store.dispatch(decrement(value, id));
};

// const deleteMatch = (id) => {
//   console.log("click");
//   store.dispatch(deleteM(id));
// };
const store = Redux.createStore(counterReducer);
const render = () => {
  const curr = store.getState();
  // console.log(curr);
  allMatchEl.innerHTML = "";
  curr.map((el) => {
    let matchEl = ` <div class="match">
    <div class="wrapper">
        <button class="lws-delete" >
            <img src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">Match ${el.id + 1}</h3>
    </div>
    <div class="inc-dec">
        <form class="incrementForm" onSubmit="incrementValue(event,${el.id})">
            <h4>Increment</h4>
            <input type="number" name="increment" class="lws-increment" 
            } />
        </form>
        <form class="decrementForm" onSubmit="decrementValue(event,${el.id})">
            <h4>Decrement</h4>
            <input type="number" name="decrement" class="lws-decrement" />
        </form>
    </div>
    <div class="numbers">
        <h2 class="lws-singleResult">${el.value}</h2>
    </div>
</div>
</div>`;
    allMatchEl.innerHTML += matchEl;
  });
};
render();
store.subscribe(render);

// reset function

resetBtnEl.addEventListener("click", () => {
  store.dispatch(reset());
});

// add another match
let newMatchID = 0;
addElementBtnEl.addEventListener("click", () => {
  newMatchID += 1;
  store.dispatch(addAnother(newMatchID));
});

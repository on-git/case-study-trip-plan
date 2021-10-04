import "./App.css";
import { useState } from "react";
import Budget from "./components/Budget/Budget";
import City from "./components/City/City";
import Plans from "./components/Plans/Plans";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [state, setState] = useState("state_budget");
  const [budget, setBudgetState] = useState(0);
  const [cities, setCityState] = useState([]);
  const [plans, setPlanState] = useState([]);
  const setBudget = (enteredBudget) => {
    setBudgetState(enteredBudget);
  };
  const setCities = (enteredCities) => {
    setCityState([]);
    setCityState(enteredCities);
  };
  const setPlans = (enteredPlans) => {
    setPlanState([]);
    setPlanState(enteredPlans);
  };

  return (
    <div className="App">
      {state === "state_budget" && (
        <Budget
          moveToCity={() => {
            setState("state_city");
          }}
          onBudget={setBudget}
        />
      )}
      {state === "state_city" && (
        <City
          moveToBudget={() => {
            setState("state_budget");
          }}
          moveToPlans={() => {
            setState("state_plans");
          }}
          getBudget={budget}
          onCities={setCities}
          onPlans={setPlans}
        />
      )}
      {state === "state_plans" && (
        <Plans
          moveToBudget={() => {
            setState("state_budget");
          }}
          moveToCity={() => {
            setState("state_city");
          }}
          getBudget={budget}
          getCities={cities}
          getPlans={plans}
        />
      )}
    </div>
  );
}

export default App;

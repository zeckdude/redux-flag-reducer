export default function makeFlagReducer(onValue, offValue, onActionTypes = [], offActionTypes = [], defaultState) {
  const common = intersection(onActionTypes, offActionTypes);

  if (common.length > 0) {
    throw new Error(`Invalid FlagReducer: Identical on and off actions found: ${JSON.stringify(common)}`);
  }

  const initialState = defaultState || offValue;

  return (state = initialState, action = {}) => {
    if (!action.type) {
      return state;
    } else if (onActionTypes.includes(action.type)) {
      return onValue;
    } else if (offActionTypes.includes(action.type)) {
      return offValue;
    }
  };
}

function intersection(arr1, arr2) {
  return  arr2.reduce((common, element) => {
    if (arr1.includes(element)) {
      common.push(element);
    }
    return common;
  }, []);
}
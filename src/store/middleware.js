export const logging = store => next => action => {
    console.group(action.type);
    console.log('Dispatching', action);
    console.log('State before', store.getState());
    const result = next(action);
    console.log('State after', store.getState());
    console.groupEnd();
    return result;
}
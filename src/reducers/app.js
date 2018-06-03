const defaultState = {
  appName: 'Token Toilet',
  version: '0.1'
};

export default(state = defaultState, action) => {
  switch(action.type){
    case 'TOKENS_LOADED':
      return{
        ...state,
        tokens: action.payload
      }
   default:
      return state;
   }
}

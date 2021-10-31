import ActionType from '../types/actionType';
import { mapByKey } from '../utils/mapByKey';

let initState = {
  players: {},
  wellness: {},
  rpe: {},
  acr: {},
  playerListLoading: false,
  error: { wellness: null, acr: null, rpe: null, players: null, all: null },
  statusLoading: false,
};

const users = (originalState = initState, action) => {
  switch (action.type) {
    case ActionType.GET_PLAYERS_LIST_REQUEST_SUCCESS:
      return {
        ...originalState,
        players: {
          ...mapByKey(action.payload.users, 'id'),
        },
      };
    case ActionType.SET_PLAYER_LIST_LOADING:
      return {
        ...originalState,
        playerListLoading: action.payload,
      };
    case ActionType.SET_STATUS_LOADING:
      return {
        ...originalState,
        statusLoading: action.payload,
      };
    case ActionType.GET_PLAYERS_LIST_REQUEST_FAILURE:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          players: action.payload,
        },
      };

    case ActionType.GET_PLAYER_ALL_STATUS_REQUEST_SUCCESS:
      return {
        ...originalState,
        wellness: {
          ...originalState.wellness,
          ...mapByKey(action.payload.wellness, 'userId'),
        },
        rpe: {
          ...originalState.rpe,
          ...mapByKey(action.payload.rpe, 'userId'),
        },
        acr: action.payload.acr,
      };
    case ActionType.GET_PLAYER_ALL_STATUS_REQUEST_FAILURE:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          all: action.payload,
        },
      };
    case ActionType.GET_PLAYER_WELLNESS_REQUEST_SUCCESS:
      return {
        ...originalState,
        wellness: {
          ...originalState.wellness,
          [action.payload.userId]: action.payload.wellness,
        },
      };
    case ActionType.GET_PLAYER_WELLNESS_REQUEST_FAILURE:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          wellness: {
            ...originalState.error.wellness,
            [action.payload.id]: action.payload.error,
          },
        },
      };
    case ActionType.GET_PLAYER_RPE_REQUEST_SUCCESS:
      return {
        ...originalState,
        rpe: {
          ...originalState.rpe,
          [action.payload.userId]: action.payload.rpe,
        },
      };
    case ActionType.GET_PLAYER_RPE_REQUEST_FAILURE:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          rpe: {
            ...originalState.error.rpe,
            [action.payload.id]: action.payload.error,
          },
        },
      };
    case ActionType.GET_PLAYER_ACR_REQUEST_SUCCESS:
      return {
        ...originalState,
        acr: {
          ...originalState.acr,
          [action.payload.userId]: action.payload.acr,
        },
      };
    case ActionType.GET_PLAYER_ACR_REQUEST_FAILURE:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          acr: {
            ...originalState.error.acr,
            [action.payload.id]: action.payload.error,
          },
        },
      };
    case ActionType.GET_PLAYER_DETAILS_REQUEST_SUCCESS:
      return {
        ...originalState,
        players: {
          ...originalState.players,
          [action.payload.user.id]: action.payload.user,
        },
      };
    case ActionType.CLEAR_ERROR_WELLNESS:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          wellness: {
            ...originalState.error.wellness,
            [action.payload.userId]: null,
          },
        },
      };
    case ActionType.CLEAR_ERROR_RPE:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          rpe: {
            ...originalState.error.rpe,
            [action.payload.userId]: null,
          },
        },
      };
    case ActionType.CLEAR_ERROR_ACR:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          acr: {
            ...originalState.error.acr,
            [action.payload.userId]: null,
          },
        },
      };
    case ActionType.CLEAR_ERROR_PLAYERS:
      return {
        ...originalState,
        error: {
          ...originalState.error,
          players: null,
        },
      };
    case ActionType.LIST_USERS_REQUEST_SUCCESS:
      return {
        ...originalState,
        players: {
          ...originalState.players,
          ...mapByKey(action.payload.users, 'id'),
        },
      };
    default:
      return { ...originalState };
  }
};

export default users;

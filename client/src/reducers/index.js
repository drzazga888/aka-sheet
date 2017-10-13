import { combineReducers } from 'redux'

import users, * as fromUsers from './users'
import session, * as fromSession from './session'
import messages, * as fromMessages from './messages'
import recipients, * as fromRecipients from './recipients'

export default combineReducers({ users, session, messages, recipients })

export const getUserDidInvalidate = (state) => fromUsers.getDidInvalidate(state.users)
export const getUserError = (state) => fromUsers.getError(state.users)
export const getUsers = (state) => fromUsers.getUsers(state.users)
export const getUser = (id, state) => fromUsers.getUser(id, state.users)

export const getSessionDidInvalidate = (state) => fromSession.getDidInvalidate(state.session)
export const getSessionError = (state) => fromSession.getError(state.session)
export const getSessionToken = (state) => fromSession.getToken(state.session)
export const getSessionUserId = (state) => fromSession.getUserId(state.session)
export const getSessionUser = (state) => getUser(getSessionUserId(state), state)

export const getMessages = (state) => fromMessages.getMessages(state.messages)
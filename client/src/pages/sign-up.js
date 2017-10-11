import React from 'react'
import { connect } from 'react-redux'

import * as userActions from '../actions/user'
import { getUserDidInvalidate, getUserError, getIsUserLoggedIn } from '../reducers'
import PageAlert, * as fromPageAlert from '../components/page-alert'

class SignUpPage extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            password2: '',
            name: '',
            surname: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.didInvalidate && !nextProps.didInvalidate && !nextProps.error) {
            this.props.history.push('/')
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const { email, password, name, surname } = this.state
        this.props.postUser({ email, password, name, surname })
    }

    onChangeValue({ target }) {
        this.setState({ [target.name]: target.value })
        if (target.name === 'password2') {
            if (this.state.password !== target.value) {
                this.refs.password2.setCustomValidity('Hasła muszą być takie same!')
            } else {
                this.refs.password2.setCustomValidity('')
            }
        }
        if (target.name === 'password') {
            if (this.state.password2 !== target.value) {
                this.refs.password2.setCustomValidity('Hasła muszą być takie same!')
            } else {
                this.refs.password2.setCustomValidity('')
            }
        }
    }

    _renderContent() {
        const { email, password, password2, name, surname } = this.state
        const { didInvalidate } = this.props
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <fieldset disabled={didInvalidate}>
                    <label className="form-row">
                        <span className="form-row-label">Imię</span>
                        <input className="form-row-content" type="text" value={name} name="name" onChange={this.onChangeValue} required/>
                    </label>
                    <label className="form-row">
                        <span className="form-row-label">Nazwisko</span>
                        <input className="form-row-content" type="text" value={surname} name="surname" onChange={this.onChangeValue} required/>
                    </label>
                    <label className="form-row">
                        <span className="form-row-label">E-mail</span>
                        <input className="form-row-content" type="email" value={email} name="email" onChange={this.onChangeValue} required/>
                    </label>
                    <label className="form-row">
                        <span className="form-row-label">Hasło</span>
                        <input className="form-row-content" type="password" value={password} name="password" onChange={this.onChangeValue} required />
                    </label>
                    <label className="form-row">
                        <span className="form-row-label">Powtórz hasło</span>
                        <input className="form-row-content" type="password" value={password2} name="password2" onChange={this.onChangeValue} ref="password2" required />
                    </label>
                    <label className="form-confirm">
                        <button type="confirm">{didInvalidate ? 'Czekaj...' : 'Zarejestruj się'}</button>
                    </label>
                </fieldset>
            </form>
        )
    }

    render() {
        const { isUserLoggedIn } = this.props
        return (
            <div>
                <h2 className="page-title">Panel rejestracji</h2>
                { !isUserLoggedIn ? this._renderContent() : <PageAlert>{fromPageAlert.LOG_OUT_REQUIRED}</PageAlert> }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    didInvalidate: getUserDidInvalidate(state),
    error: getUserError(state),
    isUserLoggedIn: getIsUserLoggedIn(state)
})

const mapDispatchToProps = {
    postUser: userActions.postUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
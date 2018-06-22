import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import MessageRow from './Component'


class MessageRowContainer extends Component {

  render() {
    const isCurrentUser = this.props.user_id==this.props.message.user_id;
    return (
      <MessageRow
        message={this.props.message}
        isCurrentUser={isCurrentUser}/>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.session.user,
})

MessageRowContainer.propTypes = {
  message: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(MessageRowContainer)


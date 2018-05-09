import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'

import styles from './Styles'
import translations from '../../../../../i18n'

const MESSAGE_TEXT_MARGIN = 50

const MessageRowComponent = props => {
  const isCurrentUser = props.isCurrentUser
  const alignItems = isCurrentUser ? 'flex-end' : 'flex-start'
  const warnaBack = isCurrentUser ? 'white' : '#1E90FF'
  const warnaColor = isCurrentUser ? 'black' : 'white'
  const margin = isCurrentUser ? {marginLeft: MESSAGE_TEXT_MARGIN} : {marginRight: MESSAGE_TEXT_MARGIN}
  const username = isCurrentUser ? translations.t('you') : props.message.user_id
  const date = relativeDate(new Date(props.message.createdAt))
 
  return (
    <View
      style={styles.container}>
      <View
        style={ [styles.bubbleView, {alignItems: alignItems,backgroundColor:warnaBack}, margin] }>
        <Text
          style={[styles.userText,{color:warnaColor}]} >
          {date + ' - ' + username}
        </Text>
        <Text
          style={styles.messageText,{color:warnaColor}}>
          {props.message.message}
        </Text>
      </View>
    </View>
  )
}

MessageRowComponent.propTypes = {
  isCurrentUser: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  updateAt: PropTypes.number.isRequired,
}

export default MessageRowComponent

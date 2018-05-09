import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 5
  },
  bubbleView: {
    flex: 1,
    borderRadius: 8,
    padding:8
  },
  userText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  messageText: {
    flex: 1,
   
    fontSize: 16
  }
})

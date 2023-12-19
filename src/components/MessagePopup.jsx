import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import styles from './MessagePopup.module.css';

// The MessagePopup component is observed by MobX to react to state changes in the store
const MessagePopup = observer(({ messagePopupStore }) => {
  // Local state to control the visibility of the popup
  const [visible, setVisible] = useState(false);

  // useEffect hook to handle side effects
  useEffect(() => {
    let timer;

    // Check if there is a message to display
    if (messagePopupStore.message.text) {
      // Make the popup visible
      setVisible(true);

      // Set up a timer to automatically hide the popup after 5 seconds
      timer = setTimeout(() => {
        setVisible(false); // Hide the popup
        messagePopupStore.hideMessagePopup(); // Clear the message in the store
      }, 5000);
    }

    // Cleanup function to clear the timer
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [messagePopupStore.message]);
  // If the popup is not visible or there is no message text, do not render anything
  if (!visible || !messagePopupStore.message.text) {
    return null;
  }

  // Destructure text and type from the message object in the store
  const { text, type } = messagePopupStore.message;

  // Construct the class name for the popup using styles from the CSS module
  // and applying a type-specific style
  const popupStyle = `${styles.messagePopup} ${styles[type]}`;

  return (
    <div className={popupStyle} role="alert" aria-live="assertive">
      <div className={styles.messageContent}>
        <span className={styles.messageType}>{type.toUpperCase()}: </span>
        <span className={styles.messageText}>{text}</span>
      </div>
      {/* Close button to manually hide the popup */}
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => messagePopupStore.hideMessagePopup()}
      >
        x
      </button>
    </div>
  );
});

export default MessagePopup;

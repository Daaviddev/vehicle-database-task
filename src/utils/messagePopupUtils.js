import messagePopupStore from '../stores/messagePopupStore';

const showMessagePopup = (text, type) => {
  try {
    if (typeof text !== 'string' || text.trim() === '') {
      throw new Error('Invalid text argument for showMessagePopup');
    }

    if (type && typeof type !== 'string') {
      throw new Error('Invalid type argument for showMessagePopup');
    }

    messagePopupStore.showMessagePopup(text, type);
  } catch (error) {
    console.error('Error in showMessagePopup:', error.message);
  }
};

export default showMessagePopup;

import { makeObservable, observable, action, runInAction } from 'mobx';

class MessagePopupStore {
  queue = []; // Queue to store messages

  message = {
    text: '',
    type: '',
  };

  constructor() {
    makeObservable(this, {
      queue: observable,
      message: observable,
      showMessagePopup: action,
      hideMessagePopup: action,
      nextMessage: action,
    });
  }

  // Add a new message to the queue
  showMessagePopup(text, type = 'error') {
    if (
      typeof text !== 'string' ||
      !['error', 'success', 'info'].includes(type)
    ) {
      console.error('Invalid message or type for popup');
      return;
    }

    runInAction(() => {
      this.queue.push({ text, type });
    });
    // If there's no current message, display the next one
    if (!this.message.text) {
      this.nextMessage();
    }
  }

  // Show the next message in the queue
  nextMessage() {
    if (this.queue.length > 0) {
      runInAction(() => {
        this.message = this.queue.shift(); // Dequeue the next message
      });
    } else {
      runInAction(() => {
        this.message = { text: '', type: '' }; // Reset if queue is empty
      });
    }
  }

  // Hide the current message and show the next one (if any)
  hideMessagePopup() {
    this.nextMessage();
  }
}

const messagePopupStore = new MessagePopupStore();
export default messagePopupStore;

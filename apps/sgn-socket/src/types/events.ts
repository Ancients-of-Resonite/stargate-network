type EventCallback<T> = (payload: T) => void;

export class EventEmitter<TEvents extends Record<string, any>> {
  private listeners: {
    [K in keyof TEvents]?: {
      id: string;
      callback: EventCallback<TEvents[K]>;
    }[];
  } = {};

  on<K extends keyof TEvents>(event: K, id: string, callback: EventCallback<TEvents[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push({
      id: id,
      callback: callback
    })
  }

  off<K extends keyof TEvents>(
    event: K,
    id: string,
  ): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      this.listeners[event] = callbacks.filter((cb) => cb.id !== id)
    }
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    const callbacks = this.listeners[event];

    if (callbacks) {
      callbacks.forEach((cb) => cb.callback(payload))
    }
  }

  once<K extends keyof TEvents>(
    event: K,
    id: string,
    callback: EventCallback<TEvents[K]>
  ): void {
    const wrapper: EventCallback<TEvents[K]> = (payload) => {
      this.off(event, id);
      callback(payload);
    };
    this.on(event, id, wrapper);
  }
}


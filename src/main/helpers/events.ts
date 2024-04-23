import EventEmitter from "events";

class EventManager extends EventEmitter {}

export const eventManager = new EventManager();

export type EventType = 'movie' | 'train' | 'concert';

export interface BaseEvent {
  id: number;
  type: EventType;
  title: string;
  location: string;
  datetime: string; // ISO
  price: number;
  poster: string;
  availableSeats: number;
  rating?: number;
}

export interface MovieEvent extends BaseEvent {
  type: "movie";
  language: string;
  genre: string;
}

export interface TrainEvent extends BaseEvent {
  type: "train";
  trainNumber: string;
  classType: 'sleeper' | 'AC' | 'general';
  departure: string;
  destination: string;
}

export interface ConcertEvent extends BaseEvent {
  type: "concert"
  performer: string;
  duration: string;
  ageLimit?: number;
}

export type EventUnion = MovieEvent | TrainEvent | ConcertEvent;
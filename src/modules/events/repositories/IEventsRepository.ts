export default interface IEventsRepository {
  fetchEvents(): Promise<TEvent[]>;
  fetchEvent(event_id: string): Promise<TEvent>;
}

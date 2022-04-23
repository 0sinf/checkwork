export interface RecordCreateRequest {
  day: Date;
  startTime: Date;
  endTime: Date;
}

export interface RecordRepository {
  save(recordCreateRequest: RecordCreateRequest): Promise<void>;
}

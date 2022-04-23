import { RecordRepository, RecordCreateRequest } from "records";
import recordRepository from "../models/records.model";

class RecordService {
  private readonly recordRepository: RecordRepository;

  constructor() {
    this.recordRepository = recordRepository;
  }

  async createRecord(recordCreateRequest: RecordCreateRequest) {
    await this.recordRepository.save(recordCreateRequest);
  }
}

const recordService = new RecordService();

export default recordService;

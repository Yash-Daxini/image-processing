export default class Request {
  Request_Id;
  Status;
  Created_at;
  Updated_at;

  constructor(requestId, status, createAt, updatedAt) {
    this.Request_Id = requestId;
    this.Status = status;
    this.Created_at = createAt;
    this.Updated_at = updatedAt;
  }
}

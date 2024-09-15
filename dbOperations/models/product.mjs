export default class Product {
  Request_Id;
  Serial_Number;
  Name;
  constructor(requestId, serialNumber, productName) {
    this.Request_Id = requestId;
    this.Serial_Number = serialNumber;
    this.Name = productName;
  }
}

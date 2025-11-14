

export default class Medication {
  
  medId: number = 0;
  brandName: string = 'N/A';
  name: string = 'N/A';
  category: string = 'N/A';
  quantity: number = 0;
  
  construtor(
    medId: number,
    brandName: string,
    name: string,
    category: string,
    quantity: number
  ) {
    this.medId = medId;
    this.brandName = brandName;
    this.name = name;
    this.category = category;
    this.quantity = quantity
  }

  

}

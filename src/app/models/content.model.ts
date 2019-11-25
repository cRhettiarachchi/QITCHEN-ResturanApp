export class ContentModel{
  id: string;
  heading: string;
  description: string;
  category: string;
  price: number;
  imagePath: string;

  constructor(heading: string, desc: string, category: string, price: number, imagePath: string) {
    this.heading = heading;
    this.description = desc;
    this.category = category;
    this.price = price;
    this.imagePath = imagePath;
  }
}

export class ContentModel{
  id: string;
  heading: string;
  description: string;
  category: string;
  imagePath: string;

  constructor(heading: string, desc: string, category: string, imagePath: string) {
    this.heading = heading;
    this.description = desc;
    this.category = category;
    this.imagePath = imagePath;
  }
}

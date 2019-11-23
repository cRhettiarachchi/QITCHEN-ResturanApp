export class ContentModel{
  id: string;
  heading: string;
  description: string;
  category: string;

  constructor(heading: string, desc: string, category: string){
    this.heading = heading;
    this.description = desc;
    this.category = category;
  }
}

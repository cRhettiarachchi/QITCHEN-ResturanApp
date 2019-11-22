export class ContentModel{
  id: string;
  heading: string;
  desc: string;
  category: string;

  constructor(id: string, heading: string, desc: string, category: string){
    this.id =id;
    this.heading = heading;
    this.desc = desc;
    this.category = category;
  }
}

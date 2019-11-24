export class ContentModel{
  id: string;
  heading: string;
  description: string;
  category: string;
  file: File;

  constructor(heading: string, desc: string, category: string, file){
    this.heading = heading;
    this.description = desc;
    this.category = category;
    this.file = file;
  }
}

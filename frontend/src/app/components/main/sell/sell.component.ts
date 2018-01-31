import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { SellService } from '../../../services/sell.service';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  sellForm: FormGroup;
  categories: string[] = [];
  brands: string[] = [];
  titles: string[] = [];
  images: Array<any> = [];;//image array
  sizes: string[] = [];
  colors: string[] = [];
  isOther: boolean = false;

  hasBaseDropZoneOver: boolean = false;
  uploader: FileUploader;
  title: string = '';
  imageurl: string = '';
  uploadResult: any;

  constructor(
    private sellService:SellService, 
    private formBuilder: FormBuilder,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient
  ) {
    this.sellService.getcategorySub().subscribe(category=>{
      this.categories = category;
      // this.categories.unshift("");
    });
    this.sellService.getbrandSub().subscribe(brands=>{
      this.brands = brands;
      // this.brands.unshift("");
    });
    this.sellService.gettitleSub().subscribe(titles=>{
      this.titles = titles;
    })
    this.sellService.getColorSub().subscribe(colors => {
      this.colors = colors;
      this.colors.push("other");
    })
  }

  ngOnInit() {
    this.sellService.getCategories();
    this.sellForm = new FormGroup({
      category: new FormControl(""),
      brand: new FormControl(""),
      title: new FormControl(""),
      quantity: new FormControl("1"),
      size: new FormControl(""),
      color: new FormControl(""),
      currentAskPrice: new FormControl(""),
      condition: new FormControl(""),
      description: new FormControl(""),
      otherColor: new FormControl("")
    })
    //cloudinary uploader
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      let tags = 'dealshub';
      // if(this.title) {
      //   form.append('context', `photo=${this.title}`);
      //   tags = `dealshub,${this.title}`;
      // }
      form.append('folder','dealshub');
      form.append('tags', tags);
      form.append('file', fileItem);

      //for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    //Insert or update file
    const upsertResponse = (fileItem):any => {
      console.log('IMAGE ARR ',this.images);
      //Detect changes
      this.zone.run(() => {
        //Get the id of existing item
        const existingId = this.images.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);

        if (existingId > -1) {
          //Update existing item with new data
          this.images[existingId] = Object.assign(this.images[existingId], fileItem);
        } else {
          //Create new response
          this.images.push(fileItem);
        }
      });
    };

    //Get upload response
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      //Save the image data to images array
      console.log('uploader status ',status);
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response),
          url: `${JSON.parse(response).public_id}.${JSON.parse(response).format}`
        }
      ); 
    }

    //Upload process in progress
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      console.log('Upload in progress ',progress);
    }
  }

  filterBrand(category){
    this.sellService.getBrandsByCategory(category);
  }

  filterTitle(brand){
    this.sellService.getTitlesByBrands(this.sellForm.value.category, brand);
  }

  filterColor(title){
    this.sellService.getColor(title);
  }

  checkColor(color){
    if (color === "other") {
      this.isOther = true;
    } else {
      this.isOther = false;
    }
  }
  createNewSell(){
    this.sellForm.value.photos = this.images;
    console.log('SENDING NEW PRODUCT INFO ', this.sellForm.value);
    this.sellService.registerNewSell(this.sellForm.value);
  }

  deleteImage(image){
    for(let i=0; i<this.images.length; i++){
      if(this.images[i].id === image.id){
        this.images.splice(i, 1);
        break;
      }
    }
    this.deleteFromCloudinary(image);
  }

  deleteFromCloudinary(photo){
    //Delete the image on cloudinary
    this.sellService.deleteImageById(photo.data.public_id).subscribe(result =>{
      console.log(result);
    });
  }

  fileOverBase(e: any): void{
    this.hasBaseDropZoneOver = e;
  }
}

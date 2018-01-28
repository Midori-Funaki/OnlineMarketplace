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
  responses: Array<any> = [];;

  hasBaseDropZoneOver: boolean = false;
  uploader: FileUploader;
  title: string = '';
  imageurl: string = '';
  hasImage: boolean = false;
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
  }

  ngOnInit() {
    this.sellService.getCategories();
    this.sellForm = new FormGroup({
      category: new FormControl(""),
      brand: new FormControl(""),
      size: new FormControl(""),
      color: new FormControl(""),
      askPrice: new FormControl(""),
      condition: new FormControl(""),
      photo: new FormControl("")
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
    const upsertResponse = fileItem => {
      //Detect changes
      this.zone.run(() => {
        //Get the id of existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          //Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          //Create new response
          this.responses.push(fileItem);
          // console.log('1. RESPONSES ',this.responses);
        }
      });
    };

    //Get upload response
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      //file info is item.file
      console.log('whole item info ',item);
      console.log('file info ',item.file);
      console.log('headers ',headers);
      this.uploadResult = JSON.parse(response);
      // console.log('2. RESPONSES ',this.responses);
      console.log('upload result ',response);
      // console.log('file id ',uploadResult.public_id);
      // console.log('format ',uploadResult.format);
      this.imageurl = `${this.uploadResult.public_id}.${this.uploadResult.format}`;
      this.hasImage = true;
      /* SAVE THE NECESSARY INFO FOR DB */
      /* CALL IMG FOR PREVIEW */
    }

    //Upload process in progress
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      console.log('Upload in progress ',progress);
    }
  }

  filterBrand(category){
    this.sellService.getBrandsByCategory(category);
  }

  createNewSell(){}

  deleteImage(){
    this.sellService.deleteImageById(this.uploadResult.public_id);
  }

  fileOverBase(e: any): void{
    this.hasBaseDropZoneOver = e;
  }
}

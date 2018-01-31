import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';
import { SellService } from '../../../services/sell.service';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../../models/Product';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  sellProduct: any;
  productId: any;

  sellForm: FormGroup;
  categories: string[] = [];
  brands: string[] = [];
  titles: string[] = [];
  images: Array<any> = [];//image array
  sizes: string[] = [];
  colors: string[] = [];
  isOther: boolean = false;

  hasBaseDropZoneOver: boolean = false;
  uploader: FileUploader;
  title: string = '';
  imageurl: string = '';
  uploadResult: any;

  constructor(
    private route: ActivatedRoute,
    private sellService:SellService, 
    private formBuilder: FormBuilder,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private productsService:ProductsService
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
      colors.forEach((color) => {
        if(this.colors.indexOf(color) < 0) {
          this.colors.push(color)
        }
      });
      this.colors.push("other");
    })
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.productId = param['id'];
    })

    this.getSellProduct(this.productId)
      .then((data) => {
        this.sellForm = new FormGroup({
          brand: new FormControl(data.brand),
          title: new FormControl(data.title),
          quantity: new FormControl(data.quantity),
          size: new FormControl(data.size),
          color: new FormControl(data.color),
          currentAskPrice: new FormControl(data.currentAskPrice),
          condition: new FormControl(data.condition),
          description: new FormControl(data.description),
          otherColor: new FormControl("")
        })
      this.getBrandById(data.categoryId)
    }).then((data) => {  
      console.log("DATA", data)
      this.sellForm.addControl('category',data)    
    }).catch((err) => {
      console.log(err)
    })
    

    this.sellService.getCategories();
    
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

  getSellProduct(id) {
    return this.productsService.getProduct(id).toPromise()
      .then((result) => {
        let brandName = this.getBrandById(result.categoryId);
        result.categoryId = brandName;
        return result
      });
  }

  getBrandById(id) {
    return this.sellService.getBrandById(id);
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

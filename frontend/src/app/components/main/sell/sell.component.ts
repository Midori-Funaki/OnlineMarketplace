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
import { UserService } from '../../../services/user.service';
import { Product } from './../../../models/Product';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { NotificationService } from './../../../services/notification.service';

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
  sizes: number[] = [20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30];
  colors: string[] = [];
  isOther: boolean = false;
  user: User;
  isConnectedAccount: boolean = false;
  isShoeCategory: boolean = false;

  hasBaseDropZoneOver: boolean = false;
  isEditMode: boolean = true;
  uploader: FileUploader;
  title: string = '';
  imageurl: string = '';
  uploadResult: any;
  transaction: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sellService:SellService, 
    private formBuilder: FormBuilder,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private productsService:ProductsService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.sellService.getcategorySub().subscribe(category=>{
      this.categories = category;
      this.categories.unshift("");
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
    this.route.params.subscribe(param => {
      this.productId = param['id'];
      if(this.productId !== "new") {
        this.isEditMode = true;
      } else {
        this.isEditMode = false;
      }
    })

    this.sellForm = new FormGroup({
      category: new FormControl(''),
      brand: new FormControl(''),
      title: new FormControl(''),
      quantity: new FormControl(''),
      size: new FormControl(''),
      color: new FormControl(''),
      currentAskPrice: new FormControl(''),
      condition: new FormControl(''),
      description: new FormControl(''),
      otherColor: new FormControl('')
    })

    this.route.params.subscribe(param => {
      this.productId = param['id'];
      if(this.productId !== "new") {
        this.isEditMode = true;
        this.getSellInfoForEdit();
      } else {
        this.isEditMode = false;
      }
    })

    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (this.user.stripeId) {
        this.isConnectedAccount = true;
      }
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
          if (current.id === fileItem.id && !current.status) {
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
          // file: item.file,
          // status,
          // data: JSON.parse(response),
          id: JSON.parse(response).public_id,
          url: JSON.parse(response).url
          // url: `http://res.cloudinary.com/dealshubspace/image/upload/v${JSON.parse(response).version}/${JSON.parse(response).public_id}.${JSON.parse(response).format}`
        }
      ); 
      console.log(response);
    }

    //Upload process in progress
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      console.log('Upload in progress ',progress);
    }
  }

  getSellInfoForEdit() {
    this.getSellProduct(this.productId)
    .then((data) => {
      // console.log('PRODUCT DATA',data);
      // console.log('PRODUCT DATA',data.Transaction);
      if(data.Transaction == null) {
        this.transaction = false;
        // console.log('UNDEFINED!!!!')
      } else if (data.Transactions != null) {
        this.transaction = true;
      }
      // console.log('TRANSACTION BOOLEAN',this.transaction);
      this.sellForm = new FormGroup({
        category: new FormControl(data.Category.title),
        brand: new FormControl(data.brand),
        title: new FormControl(data.title),
        quantity: new FormControl(data.quantity),
        size: new FormControl(data.size),
        color: new FormControl(data.color),
        currentAskPrice: new FormControl(data.currentAskPrice),
        condition: new FormControl(data.condition),
        description: new FormControl(data.description),
        otherColor: new FormControl('')
      })
      this.filterBrand(data.Category.title);
      this.filterTitle(data.brand);
      this.colors.push(data.color);
      this.colors.push('other');

      this.sellForm.controls.category.markAsDirty(data.Category.title);
      this.sellForm.controls.brand.markAsDirty(data.brand);
      this.sellForm.controls.title.markAsDirty(data.title);
      this.sellForm.controls.quantity.markAsDirty(data.quantity);
      this.sellForm.controls.size.markAsDirty(data.size);
      this.sellForm.controls.color.markAsDirty(data.color);
      this.sellForm.controls.currentAskPrice.markAsDirty(data.currentAskPrice);
      this.sellForm.controls.condition.markAsDirty(data.condition);
      this.sellForm.controls.description.markAsDirty(data.description);

      for(let i=0; i<data.ProductPhotos.length; i++) {
        let cloudinaryId = data.ProductPhotos[i].url.match(/dealshub\/[a-z0-9]+/g);
        if (cloudinaryId === null){
          cloudinaryId = i;
        }
        this.images.push({
          id: cloudinaryId.toString(),
          url: data.ProductPhotos[i].url
        });
      }
      console.log('IMAGES ',this.images);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  getSellProduct(id) {
    return this.productsService.getProduct(id).toPromise()
  }

  filterBrand(category){
    if(category === "Sneakers") {
      this.isShoeCategory = true;
    } else {
      this.isShoeCategory = false;
    }
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
    if (!this.isShoeCategory){
      this.sellForm.value.size = 0;
    }
    this.sellForm.value.photos = this.images;
    // console.log('SENDING NEW PRODUCT INFO ', this.sellForm.value);
    this.sellService.registerNewSell(this.sellForm.value);
    this.notificationService.sendSuccessMessage('Successfully created an new item','');
    this.router.navigate(['sell-list']);
  }

  deleteImage(delid){
    console.log('DELID ',delid);
    for(let i=0; i<this.images.length; i++){
      if(this.images[i].id === delid){
        this.images.splice(i, 1);
        break;
      }
    }
    // console.log('DEL IMAGE ARR ',this.images);
    if(/dealshub/.test(delid)){
      this.deleteFromCloudinary(delid);
    }
  }

  deleteFromCloudinary(id){
    // console.log('deleting image id ',id);
    //Delete the image on cloudinary
    this.sellService.deleteImageByIdFromCloudinary(id).subscribe(result =>{
      console.log(result);
    });
    // if (this.productId != 'new') {
    //   this.sellService.deleteImageByIdFromDb(url)
    // }
  }

  fileOverBase(e: any): void{
    this.hasBaseDropZoneOver = e;
  }

  editSellItem() {
    this.sellForm.value.id = this.productId;
    this.sellForm.value.photos = this.images;
    // console.log("sending edit info @ sell compo ",this.sellForm.value);
    this.sellService.editSellItem(this.sellForm.value)
  }

  deleteSellItem() {
    console.log('Deleting')
    console.log('Delete item id',this.productId);
    console.log('Transaction boolean',this.transaction);
    if (this.transaction == false) {
      this.productsService.deleteSellItem(this.productId);
      for(let image of this.images){
        if(/dealshub/.test(image.id)){
          this.deleteFromCloudinary(image.id);
        }
      }
      this.notificationService.sendSuccessMessage('Deleted the Item','');
      this.router.navigate(['sell-list']);
    } else if (this.transaction == true) {
      this.notificationService.sendErrorMessage('Cannot Delete', 'The item has processing transaction status.');
    }
  }
}

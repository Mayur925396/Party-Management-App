import { Component, inject } from '@angular/core';
import { APICallsService } from '../apicalls.service';
import { HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']


})
export class ReactiveFormsComponent {
  public isFrmSub: boolean = false;
  public partyData: any;
  public parties: any = [];
  public imgpres: any = 'assets/img.svg';
  public temprory2: any = true;
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  public errorMessage: string | null = null; // Variable to store error message
  public successMessage: string | null = null; // Variable to store error message
  constructor(private ap: APICallsService, private fb: FormBuilder, private auth: AuthService) {
    this.partyData = this.fb.group({
      id: [''],
      login_access: [false],
      name: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      mobile_no: ['', [Validators.required, Validators.pattern(/[0-9]{10}/)]],
      telephone_no: [''],
      whatsapp_no: [''],
      remark: [''],
      date_of_birth: [''],
      anniversary_date: [''],
      gstin: ['', [Validators.required]],
      pan_no: [''],
      apply_tds: [false],
      credit_limit: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      address: this.fb.array([
        this.createAddress()
      ]),
      bank_id: this.fb.array([
        this.createBank()
      ]),
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      image: [null]


    })
  }
  createAddress(): FormGroup {
    return this.fb.group({
      address_line_1: [''],
      address_line_2: [''],
      country: [''],
      state: [''],
      city: [''],
      pincode: [''],
      address_type: ['']
    })
  }
  createBank(): FormGroup {
    return this.fb.group({
      bank_ifsc_code: [''],
      bank_name: [''],
      branch_name: [''],
      account_no: [''],
      account_holder_name: ['']
    });
  }
  ngOnInit() {
    this.getApiDAta();
    this.auth.setToken('Token', 'd343c5e246bff4205e32879ede474d863367553c')
  }

  getApiDAta() {
    this.ap.getData().subscribe({
      next: (res: any) => {
        console.log(res);
        this.parties = res;
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = 'Error occurred while fetching data.';
        setTimeout(() => {
          this.errorMessage = null; // Clear error message after 5 seconds
        }, 3000); 
      },
      complete: () => {
        console.log("Data Recieved Successfully.")
        this.successMessage = "Data Recieved Successfully."
        setTimeout(() => {
          this.successMessage = null; // Clear error message after 5 seconds
        }, 3000); 
      }

    })
  }


  SendApiDAta() {
    const addressDetails = this.partyData.value.address;
    const bankDetails = this.partyData.value.bank_id;

    // Mapping address and bank details to match the backend's expected format
    const formattedAddress = JSON.stringify(addressDetails.map((address: any) => ({
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      country: address.country,
      state: address.state,
      city: address.city,
      pincode: address.pincode
    })));

    const formattedBank = JSON.stringify(bankDetails.map((bank: any) => ({
      bank_ifsc_code: bank.bank_ifsc_code,
      bank_name: bank.bank_name,
      branch_name: bank.branch_name,
      account_no: bank.account_no,
      account_holder_name: bank.account_holder_name
    })));

    // Creating the payload to be sent to the backend
    const payload = {
      name: this.partyData.value.name,
      company_name: this.partyData.value.company_name,
      mobile_no: this.partyData.value.mobile_no,
      telephone_no: this.partyData.value.telephone_no,
      whatsapp_no: this.partyData.value.whatsapp_no,
      email: this.partyData.value.email,
      remark: this.partyData.value.remark,
      login_access: this.partyData.value.login_access,
      date_of_birth: this.partyData.value.date_of_birth,
      anniversary_date: this.partyData.value.anniversary_date,
      gstin: this.partyData.value.gstin,
      pan_no: this.partyData.value.pan_no,
      apply_tds: this.partyData.value.apply_tds,
      credit_limit: this.partyData.value.credit_limit,
      address: formattedAddress,
      bank: formattedBank
    };

    if (this.selectedFile) {
      this.partyData.append('image', this.selectedFile, this.selectedFile.name);
    }

    delete this.partyData.value.id;
    this.ap.postData(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        setTimeout(()=>this.getApiDAta(),5000)
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Error occurred while Sending data.';
        setTimeout(() => {
          this.errorMessage = null; // Clear error message after 5 seconds
        }, 3000); 
      },
      complete: () => {
        console.log("Vender Created Successfully")
        this.successMessage = "Vender Created Successfully."
        setTimeout(() => {
          this.successMessage = null; // Clear error message after 5 seconds
        }, 3000); 
      }
    })
  }

  delete(data: any) {
    this.ap.deleteData(data).subscribe({
      next: (res: any) => {
        console.log(res);
        setTimeout(()=>this.getApiDAta(),5000)
      },
      error: (err: any) => {
        console.log('Error occurred while deleting data')
        this.errorMessage = 'Error occurred while deleting data.';
        setTimeout(() => {
          this.errorMessage = null; // Clear error message after 5 seconds
        }, 3000); 
      },
      complete: () => {
        console.log("Data Deleted successfully");
        this.successMessage = 'Data Deleted successfully'
        setTimeout(() => {
          this.successMessage = null; // Clear error message after 5 seconds
        }, 3000); 
      }
    })
  }

  get address(): FormArray {
    return this.partyData.get('address') as FormArray;
  }

  get bank_id(): FormArray {
    return this.partyData.get('bank_id') as FormArray;
  }

  addAddress(): void {
    this.address.push(this.createAddress());
  }

  removeAddress(index: number): void {
    this.address.removeAt(index);
  }

  addBank(): void {
    this.bank_id.push(this.createBank());
  }

  removeBank(index: number): void {
    this.bank_id.removeAt(index);
  }


  createParty() {
    this.isFrmSub = true;
    if (this.partyData.valid) {
      const dateObject = this.partyData.value.date_of_birth;
      const formattedDate = this.formatDate(dateObject);
      const dateObject2 = this.partyData.value.anniversary_date;
      const formattedDate2 = this.formatDate(dateObject2);
      this.partyData.value.date_of_birth = formattedDate
      this.partyData.value.anniversary_date = formattedDate2
      console.log(formattedDate);
      console.log(this.partyData.value);
      this.isFrmSub = false;
      this.SendApiDAta();
      this.getApiDAta();
      this.partyData.reset();
    }


  }


  update(data: any) {
    this.partyData.patchValue({ ...data })
  }

  updateIt() {
    this.ap.updateApiData(this.partyData.value).subscribe({
      next: (res: any) => {
        console.log(res);
        setTimeout(()=>this.getApiDAta(),5000)
      },
      error: (err: any) => {
        console.log(err);
        this.errorMessage = 'Error occurred while updating data.';
        setTimeout(() => {
          this.errorMessage = null; // Clear error message after 5 seconds
        }, 3000); 
      },
      complete: () => {
        console.log("Data Updated Successfully");
        this.successMessage='Data Updated Successfully.'
        setTimeout(() => {
          this.successMessage = null; // Clear error message after 5 seconds
        }, 3000); 
      }


    })
  }

  formatDate(dateObject: { year: number, month: number, day: number }): string {
    const year = dateObject.year;
    const month = String(dateObject.month).padStart(2, '0');
    const day = String(dateObject.day).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
  fileSelect(event: any) {
    const selectedFile = event.target.files[0];
    this.partyData.patchValue({ image: selectedFile })
    console.log('File selected:', selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      // 
    };
    reader.readAsDataURL(selectedFile);


  }

  get f() {
    return this.partyData.controls;
  }
}

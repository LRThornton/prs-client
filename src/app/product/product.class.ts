import { Vendor } from "../vendor/vendor.class";

export class Product {
    
    id: number = 0;
    partnbr: string = "";
    name: string = "";
    price: number = 0;
    unit: string = "Each";
    photopath: string = "";
    
    vendorId: number = 0;
    vendor!: Vendor;    
}
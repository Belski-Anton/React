export interface IDataPerson {
   forename: string
   date_of_birth: string
   entity_id: string
   nationalities: string[]
   _links: {
     thumbnail?: {
       href: string
     } | null
   }
 }
 
 export interface IResponsePersons {
   total: number
   _embedded: {
     notices: IDataPerson[]
   }
 }
 
 export interface DataDetail extends IDataPerson {
   arrest_warrants: [{ charge: string }]
   weight: number
   height: number
   sex_id: string
   place_of_birth: string
   name: string
   distinguishing_marks: string
 }
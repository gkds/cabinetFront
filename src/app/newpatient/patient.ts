import { DossierMedical } from './DossierMedical';
export interface Patient {

    id: number;
    lname: string;
    fname: string;
    birth: string;
    status: number;
    sexe: string;
    profession: string;
    familySituation: string;

    dossierMedical: DossierMedical;
    personInCharge: string;

    phone: number;


}
